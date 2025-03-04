// import { LANGUAGE_VERSIONS } from "@/constants/CodeSnippet";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Button } from "../ui/button";

// const languages = Object.entries(LANGUAGE_VERSIONS);

// const LanguageSelector = () => {
//   return (
//     <div>
//       {" "}
//       <div className="flex-1 flex justify-center items-center space-x-2">
//         {/* <Select value={language} onValueChange={setLanguage}> */}
//         <Select>
//           <SelectTrigger className="w-[120px] h-8 bg-[#2A2A2A] border-[#3E3E3E] text-sm">
//             <SelectValue placeholder="javascript" />
//           </SelectTrigger>
//           <SelectContent className="bg-[#2A2A2A] border-[#3E3E3E]">
//             {languages.map(([lang]) => (
//               <SelectItem
//                 key={lang}
//                 value={lang}
//                 className="text-gray-300 hover:bg-[#3E3E3E]"
//               >
//                 {lang.charAt(0).toUpperCase() + lang.slice(1)}
//                 {/* {lang} */}
//                 &nbsp;
//                 {/* {version} */}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Button className="h-8 bg-green-600 hover:bg-green-700 text-white rounded text-sm px-6">
//           Run
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default LanguageSelector;
