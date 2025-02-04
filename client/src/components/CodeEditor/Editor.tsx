import Editor from "@monaco-editor/react";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "@/socket";

export default function CodeEditor() {
  const { roomId } = useParams();
  const location = useLocation();
  const { userName } = location.state || {};
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(`public class main{
    public static void main(String args[]){
      //Start Coding ..
    }
  }`);

  useEffect(() => {
    if (!roomId || !userName) return;

    // Emit join_room only once
    socket.emit("join_room", { roomId, userName });

    // Listen for code updates
    socket.on("receive_code", (newCode) => {
      setCode(newCode);
    });

    // Listen for language changes
    socket.on("language_changed", (newLanguage) => {
      setLanguage(newLanguage);
    });

    // Cleanup
    return () => {
      socket.off("receive_code");
      socket.off("language_changed");
    };
  }, [roomId, userName]);

  const handleChange = (newValue: string | undefined) => {
    if (!newValue) return;
    setCode(newValue);
    socket.emit("send_code", { roomId, code: newValue });
  };

  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={handleChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          lineHeight: 21,
          minimap: { enabled: false },
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
            useShadows: false,
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          padding: { top: 16 },
          lineNumbers: "on",
          glyphMargin: false,
          folding: false,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
        }}
      />
    </div>
  );
}
