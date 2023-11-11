import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";

type Props = { avatar: string; name: string; username: string; email: string; close: () => void };

const UserChatInfo: React.FC<Props> = ({ avatar, name, username, email, close }: Props) => {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.15 }}
         className="fixed bg-black/40 inset-0 z-[100] flex px-3"
         onClick={close}
      >
         <motion.div
            className="m-auto bg-white p-6 items-center flex flex-col rounded-md shadow-xl flex-1 max-w-[350px]"
            onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
         >
            <img
               src={avatar}
               alt={username}
               className="w-[150px] h-[150px] object-cover object-center rounded-full"
            />
            <p className="flex mt-3 text-xl">
               <span className="font-[500] mr-[2px]">{name}</span>({username})
            </p>
            <div className="flex mt-1 gap-x-1 items-center">
               <HiOutlineMail size={14} className="text-c-blue" />
               <span className="text-xs">{email}</span>
            </div>
            <button
               className="mt-4 bg-c-blue px-3 rounded-md py-1 text-white duration-150 hover:bg-blue-400"
               onClick={close}
            >
               Close
            </button>
         </motion.div>
      </motion.div>
   );
};

export default UserChatInfo;
