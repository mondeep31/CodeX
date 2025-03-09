import { useState, useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import socket from "@/socket";
import { debounce } from "lodash";

interface CodeEditorProps {
  roomId?: string;
  language: string;
  onLanguageChange: (language: string) => void;
}

const TEMPLATE_CODES: Record<string, string> = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  python: `print("Hello, World!")`,
};

const CodeEditor = ({ roomId, language }: CodeEditorProps) => {
  const editorRef = useRef<any>(null);
  const [editorValue, setEditorValue] = useState(TEMPLATE_CODES[language]);
  const isUpdating = useRef(false);

  // Handle code changes from socket
  useEffect(() => {
    if (!roomId) return;

    const handleCodeChange = (newCode: string) => {
      if (!isUpdating.current) {
        isUpdating.current = true;
        setEditorValue(newCode);
        setTimeout(() => {
          isUpdating.current = false;
        }, 100);
      }
    };

    socket.on("receive_code", handleCodeChange);

    // Return cleanup function
    return () => {
      socket.off("receive_code", handleCodeChange);
    };
  }, [roomId]);

  // Handle language changes
  useEffect(() => {
    if (!isUpdating.current) {
      isUpdating.current = true;
      const newCode = TEMPLATE_CODES[language];
      setEditorValue(newCode);

      if (roomId) {
        socket.emit("send_code", { roomId, code: newCode });
      }

      setTimeout(() => {
        isUpdating.current = false;
      }, 100);
    }
  }, [language, roomId]);

  const handleEditorDidMount = (editor: any) => {
    window.editor = editor;
    editorRef.current = editor;
  };

  const handleChange = debounce((newValue: string | undefined) => {
    if (newValue !== undefined && roomId && !isUpdating.current) {
      isUpdating.current = true;
      setEditorValue(newValue);
      socket.emit("send_code", { roomId, code: newValue });
      setTimeout(() => {
        isUpdating.current = false;
      }, 100);
    }
  }, 300);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          defaultLanguage="java"
          language={language}
          value={editorValue}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            automaticLayout: true,
            readOnly: isUpdating.current,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
