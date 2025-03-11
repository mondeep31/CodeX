import { useState, useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import socket from "@/socket";

interface CodeEditorProps {
  roomId?: string;
  language: string;
  onLanguageChange: (language: string) => void;
}

const TEMPLATE_CODES: Record<string, string> = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World! (java)");
    }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!(cpp)" << endl;
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!(c)\\n");
    return 0;
}`,
  python: `print("Hello, World!(python)")`,
};

const CodeEditor = ({ roomId, language }: CodeEditorProps) => {
  const editorRef = useRef<any>(null);
  const [editorValue, setEditorValue] = useState(TEMPLATE_CODES[language]);

  // Handle code changes from socket
  useEffect(() => {
    if (!roomId) return;

    const handleCodeChange = (newCode: string) => {
      if (newCode !== editorValue) {
        setEditorValue(newCode);
      }
    };

    socket.on("receive_code", handleCodeChange);

    // Return cleanup function
    return () => {
      socket.off("receive_code", handleCodeChange);
    };
  }, [roomId, editorValue]);

  // Handle language changes
  useEffect(() => {
    if (TEMPLATE_CODES[language] !== editorValue) {
      setEditorValue(TEMPLATE_CODES[language]);

      if (roomId) {
        socket.emit("send_code", { roomId, code: TEMPLATE_CODES[language] });
      }
    }
  }, [language, roomId]);

  const handleEditorDidMount = (editor: any) => {
    window.editor = editor;
    editorRef.current = editor;
  };

  const handleChange = (newValue: string | undefined) => {
    if (newValue !== undefined && roomId && newValue !== editorValue) {
      setEditorValue(newValue);
      socket.emit("send_code", { roomId, code: newValue });
    }
  };

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
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
