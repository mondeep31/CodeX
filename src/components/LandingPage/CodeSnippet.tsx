const CodeSnippet = () => {
  return (
    <div>
      {" "}
      <div className="max-w-3xl mx-auto mb-16 ">
        <div className="bg-[#1E1E1E] rounded-lg p-6 relative">
          <div className="flex gap-2 absolute top-4 left-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <pre className="font-mono text-sm md:text-base pt-8">
            <code>
              <span className="text-purple-400">function</span>{" "}
              <span className="text-blue-400">collaborate</span>() {"{"}
              {"\n"}
              {"  "}
              <span className="text-orange-400">const</span> editor ={" "}
              <span className="text-green-400">'CodeX'</span>;{"\n"}
              {"  "}
              <span className="text-orange-400">const</span> features = [
              <span className="text-green-400">'realtime'</span>,{" "}
              <span className="text-green-400">'chat'</span>,{" "}
              <span className="text-green-400">'video'</span>];
              {"\n"}
              {"  "}
              <span className="text-purple-400">return</span>{" "}
              <span className="text-blue-400">magic</span>();
              {"\n"}
              {"}"}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet;
