import { Editor } from "@monaco-editor/react";
export const CodeEditor = () => {
  return (
    <div className="flex-1">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// Start coding here
function helloWorld() {
  console.log('Hello, world!');
}

helloWorld();"
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 20 },
        }}
      />
    </div>
  );
};
