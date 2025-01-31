"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = ["java", "python", "javascript", "cpp", "csharp"];

export default function TopNav() {
  const [language, setLanguage] = useState("java");

  return (
    <div className="h-12 border-b border-[#2A2A2A] flex items-center px-4">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-semibold">CodeX</div>
        <div className="text-xs px-2 py-1 bg-[#423F33] text-[#A99E63] rounded">
          Beta
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center space-x-2">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[120px] h-8 bg-[#2A2A2A] border-[#3E3E3E] text-sm">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="bg-[#2A2A2A] border-[#3E3E3E]">
            {languages.map((lang) => (
              <SelectItem
                key={lang}
                value={lang}
                className="text-gray-300 hover:bg-[#3E3E3E]"
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="h-8 bg-green-600 hover:bg-green-700 text-white rounded text-sm px-6">
          Run
        </Button>
      </div>
      <div className="w-[120px]"></div>
    </div>
  );
}
