import { useState } from "react";
import { Folder, File, ChevronDown, ChevronRight } from "lucide-react";

export const Sidebar = () => {
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, boolean>
  >({ Project: false });

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  return (
    <div className="w-64 bg-[#1a1b26] border-r border-[#2a2b36]">
      <div className="p-4">
        <h2 className=" text-white text-xs font-medium mb-3">File Directory</h2>
        <div className="space-y-0.5">
          <div
            className="flex items-center cursor-pointer hover:bg-[#2a2b36] rounded px-2 py-1.5 text-white hover:text-white transition-colors duration-150"
            onClick={() => toggleFolder("Project")}
          >
            {expandedFolders["Project"] ? (
              <ChevronDown className="h-4 w-4 mr-1.5" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-1.5" />
            )}
            <Folder className="h-4 w-4 mr-1.5" />
            <span className="text-sm">Project</span>
          </div>
          {expandedFolders["Project"] && (
            <div className="ml-4 space-y-0.5">
              <div className="flex items-center hover:bg-[#2a2b36] rounded px-2 py-1.5 text-white hover:text-white transition-colors duration-150">
                <File className="h-4 w-4 mr-1.5" />
                <span className="text-sm">index.js</span>
              </div>
              <div className="flex items-center hover:bg-[#2a2b36] rounded px-2 py-1.5 text-white hover:text-white transition-colors duration-150">
                <File className="h-4 w-4 mr-1.5" />
                <span className="text-sm">styles.css</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
