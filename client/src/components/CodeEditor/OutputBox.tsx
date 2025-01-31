export default function OutputBox() {
  return (
    <div className="h-64 border-t border-[#2A2A2A]">
      <div className="h-full bg-[#1C1C1C] p-4">
        <div className="flex items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-400">Output</h3>
        </div>
        <div className="font-mono text-sm text-gray-300">
          Run your code to see the output
        </div>
      </div>
    </div>
  );
}
