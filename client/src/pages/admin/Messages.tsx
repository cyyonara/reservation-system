import Sidebar from "../../components/admin/Sidebar";
import UserSearchModal from "../../components/admin/UserSearchModal";
import { Outlet, useParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect } from "react";
import { useGetAdminMessages } from "../../hooks/useGetAdminMessages";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { T_Chat } from "../../hooks/useGetAdminMessages";
import { useNavigate, NavigateFunction } from "react-router-dom";

type Params = { chatId: string };

const Messages: React.FC = () => {
   const [inbox, setInBox] = useState<T_Chat[]>([]);
   const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
   const { chatId } = useParams<Params>();
   const { data, isLoading, isSuccess, isError } = useGetAdminMessages();
   const navigate: NavigateFunction = useNavigate();

   const closeModal = (): void => setShowSearchModal(false);

   useEffect(() => {
      document.title = "Messages";
      if (isSuccess) {
         setInBox(data);
      }
   }, [data]);

   return (
      <>
         <AnimatePresence>
            {showSearchModal && <UserSearchModal closeModal={closeModal} />}
         </AnimatePresence>
         <div className="h-screen max-h-screen bg-white-smoke flex">
            <Sidebar />
            <div className="flex-1 h-full bg-gray-200 xl:ml-[300px] flex">
               <Outlet />
               <div className="h-full w-[330px] bg-white p-4 shadow-md hidden lg:flex flex-col">
                  <nav className="flex border-b pb-3 gap-x-2">
                     <span className="bg-c-blue flex items-center text-white rounded-full px-3 py-1">
                        Inbox
                     </span>
                     <button
                        className="bg-white-smoke text-gray-400 px-2 py-2 flex-1 ml-auto gap-x-2 flex duration-150 items-center rounded-md hover:bg-gray-200"
                        onClick={() => setShowSearchModal(true)}
                     >
                        <AiOutlineSearch size={18} color="gray" />
                        <span>Search user</span>
                     </button>
                  </nav>
                  {isSuccess && (
                     <>
                        <span className="p-3 text-sm border-b mb-2">Chats({inbox.length})</span>
                        <div className="flex-1 flex flex-col overflow-y-auto gap-y-[2px]">
                           {inbox.map((chat) => (
                              <div
                                 key={chat._id}
                                 className={`flex p-2 h-[66px] rounded-md duration-150 cursor-pointer ${
                                    chatId === chat._id
                                       ? "bg-gray-200"
                                       : "bg-white hover:bg-white-smoke"
                                 }`}
                                 onClick={() => navigate(`/admin/messages/${chat._id}`)}
                              >
                                 <img
                                    src={chat.users[0].avatar}
                                    alt={chat.users[0].name}
                                    className="text-xs object-cover object-center w-[50px] h-[50px] rounded-full"
                                 />
                                 <span className="flex flex-col self-center ml-2">
                                    <span className="line-clamp-1 text-sm font-[500]">
                                       {chat.users[0].name}
                                    </span>
                                    {"lastMessage" in chat && (
                                       <p className="line-clamp-1 text-xs">
                                          {chat.lastMessage.content}
                                       </p>
                                    )}
                                 </span>
                              </div>
                           ))}
                        </div>
                     </>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default Messages;
