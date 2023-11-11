import { AiOutlineSearch } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useUserSearch } from "../../hooks/useUserSearch";
import { Spinner } from "@material-tailwind/react";
import { motion } from "framer-motion";
import UserSearchResult from "./UserSearchResult";

type Props = { closeModal: () => void };

const UserSearchModal: React.FC<Props> = ({ closeModal }: Props): React.JSX.Element => {
   const [searchKeyword, setSearchKeyword] = useState<string>("");
   const debounceValue = useDebounce<string>(searchKeyword);
   const { isLoading, data: users, refetch, isSuccess } = useUserSearch(debounceValue);

   const inputRef = useRef<HTMLInputElement | null>(null);

   useEffect(() => {
      inputRef.current!.focus();
   }, []);

   useEffect(() => {
      refetch();
   }, [debounceValue]);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="fixed inset-0 flex bg-black/40 backdrop-blur-sm z-40 px-4"
         onClick={closeModal}
      >
         <motion.div
            initial={{ translateY: "40vh" }}
            animate={{ translateY: "0vh" }}
            exit={{ translateY: "40vh" }}
            className="bg-white m-auto flex flex-col p-6 rounded-md shadow-xl flex-1 max-w-[500px]"
            onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
         >
            <span className="flex items-center gap-x-2 mb-5 bg-white-smoke rounded-md p-2">
               <AiOutlineSearch size={20} className="text-gray-700" />
               <input
                  type="text"
                  placeholder="Search user"
                  className="focus:outline-none w-0 flex-1 bg-inherit"
                  ref={inputRef}
                  value={searchKeyword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                     setSearchKeyword(e.target.value)
                  }
               />
            </span>
            {isLoading && (
               <span className="flex items-center justify-center gap-x-4">
                  <Spinner className="h-8 w-8" />
                  <p>Searching ...</p>
               </span>
            )}
            {isSuccess && (
               <div className="flex flex-col gap-y-2">
                  {users.map((user) => (
                     <UserSearchResult
                        key={user._id}
                        _id={user._id}
                        name={user.name}
                        email={user.email}
                        username={user.username}
                        avatar={user.avatar}
                        closeModal={closeModal}
                     />
                  ))}
               </div>
            )}
         </motion.div>
      </motion.div>
   );
};

export default UserSearchModal;
