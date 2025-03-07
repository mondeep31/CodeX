import { useEffect, useState } from 'react';
import socket from '../../socket';

const OutputBox = () => {
  const [output, setOutput] = useState('Output will appear here...');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    socket.on('execution_result', ({ result, error }) => {
      setOutput(result);
      setHasError(!!error);
    });

    return () => {
      socket.off('execution_result');
    };
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#1C1C1C] border-t border-gray-700">
      <div className="p-2 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-300">Output</span>
      </div>
      <div className="flex-1 p-2 overflow-auto font-mono text-sm">
        <pre className={`whitespace-pre-wrap ${hasError ? 'text-red-400' : 'text-green-400'}`}>
          {output}
        </pre>
      </div>
    </div>
  );
};

export default OutputBox;
