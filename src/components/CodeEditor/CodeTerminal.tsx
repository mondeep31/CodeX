import { Terminal } from "lucide-react";
export const CodeTerminal = () => {
  return (
    <div className="h-48 border-t border-[#2a2b36]">
      <div className="flex items-center px-4 py-2 border-b border-[#2a2b36] bg-[#1a1b26]">
        <Terminal className="h-4 w-4 mr-2 text-white" />
        <span className="text-white text-sm">Terminal</span>
      </div>
      <div className="p-4 font-mono text-sm text-green-400 overflow-y-auto h-[calc(100%-40px)]">
        <div>$ npm install</div>
        <div className="opacity-80">
          added 1256 packages, and audited 1257 packages in 30s
        </div>
        <div>$ npm start</div>
        <div className="text-green-500">Compiled successfully!</div>
        <div className="opacity-80">
          You can now view your project in the browser.
        </div>
        <div className="opacity-80">Local: http://localhost:3000</div>
      </div>
    </div>
  );
};
