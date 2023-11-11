import { AiOutlineSearch } from "react-icons/ai";
const ServicesSearch: React.FC = () => {
   return (
      <span className="flex items-center bg-white gap-x-2 p-3 w-full rounded-md h-full sm:max-w-[280px]">
         <AiOutlineSearch color="gray" />
         <input
            type="text"
            placeholder="Search"
            className="text-xs focus:outline-none text-gray-600 flex-1"
         />
      </span>
   );
};

export default ServicesSearch;
