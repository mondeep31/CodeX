"use client";

import Editor from "@monaco-editor/react";

const defaultCode = `public class main{
    public static void main(String args[]){
        
    }
}`;

export default function CodeEditor() {
  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="java"
        defaultValue={defaultCode}
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
          lineDecorationsWidth: 15,
          lineNumbersMinChars: 3,
        }}
      />
    </div>
  );
}
