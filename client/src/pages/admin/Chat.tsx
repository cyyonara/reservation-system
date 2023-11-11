import MessagesHeader from "../../components/admin/MessagesHeader";
import UserChatInfo from "../../components/admin/UserChatInfo";
import { useParams } from "react-router-dom";
import { AiOutlineSend, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiInfoCircle } from "react-icons/bi";
import { useGetChat } from "../../hooks/useGetChat";
import { useEffect, useState, useRef } from "react";
import { T_Message } from "../../hooks/useGetChat";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

type Params = { chatId: string };

const Chat: React.FC = (): React.JSX.Element => {
   const chatBoxRef = useRef<HTMLDivElement | null>(null);
   const queryClient = useQueryClient();
   const { chatId } = useParams<Params>();
   const { isLoading, isSuccess, data } = useGetChat(chatId as string);
   const [messages, setMessages] = useState<T_Message[]>([]);
   const [newMessage, setNewMessage] = useState<string>("");
   const { mutate, isLoading: isSending } = useSendMessage();
   const [showUserChatInfo, setShowUserChatInfo] = useState<boolean>(false);

   const sendMessage = (e: React.FormEvent): void => {
      e.preventDefault();
      if (!newMessage) return;
      setNewMessage("");
      mutate(
         {
            chatId: chatId as string,
            receiver: data!.chatInfo.users[0]._id,
            content: newMessage,
         },
         {
            onSuccess: (data) => {
               setMessages((prev) => [...prev, data]);
               queryClient.invalidateQueries(["single-chat", chatId]);
               queryClient.invalidateQueries(["admin-messages"]);
            },
         }
      );
   };

   useEffect(() => {
      if (isSuccess) setMessages(data.messages);
   }, [isSuccess, chatId]);

   useEffect(() => {
      chatBoxRef.current!.scrollTop = chatBoxRef.current!.scrollHeight;
   }, [messages]);

   return (
      <div className="h-full flex-1 flex flex-col">
         <MessagesHeader />
         <main className="flex-1 flex flex-col overflow-auto">
            <div className="py-5 flex justify-between items-center px-9 bg-white">
               {isSuccess && (
                  <span className="flex items-center gap-x-3">
                     <img
                        src={data.chatInfo.users[0].avatar}
                        alt={data.chatInfo.users[0].name}
                        className="h-[48px] w-[48px] object-cover object-center rounded-full"
                     />
                     <div className="flex flex-col">
                        <span className="line-clamp-1">{data.chatInfo.users[0].name}</span>
                        <span className="text-xs line-clamp-1">{data.chatInfo.users[0].email}</span>
                     </div>
                  </span>
               )}
               {isLoading && (
                  <div className="flex items-center gap-x-3 animate-pulse">
                     <span className="h-[48px] w-[48px] rounded-full bg-gray-400"></span>
                     <div className="flex flex-col gap-y-2">
                        <span className="bg-gray-400 rounded-md h-[16px] w-[150px]"></span>
                        <span className="bg-gray-400 rounded-md h-[12px] w-[150px]"></span>
                     </div>
                  </div>
               )}
               <span className="cursor-pointer">
                  {isLoading ? (
                     <span className="rounded-full block bg-gray-400 h-[35px] w-[35px] animate-pulse"></span>
                  ) : (
                     <BiInfoCircle
                        size={30}
                        className="text-gray-700"
                        onClick={() => setShowUserChatInfo(true)}
                     />
                  )}
               </span>
            </div>
            <AnimatePresence>
               {showUserChatInfo && (
                  <UserChatInfo
                     name={data!.chatInfo.users[0].name}
                     username={data!.chatInfo.users[0].username}
                     email={data!.chatInfo.users[0].email}
                     avatar={data!.chatInfo.users[0].avatar}
                     close={() => setShowUserChatInfo(false)}
                  />
               )}
            </AnimatePresence>
            <div className="h-full flex flex-col py-7 px-9 overflow-auto" ref={chatBoxRef}>
               {isSuccess &&
                  messages.map((message) => {
                     return (
                        <div
                           key={message._id}
                           className="bg-c-blue mb-2 p-2 px-3 text-white rounded-md w-max max-w-[350px]"
                           style={{ marginLeft: message.sender.isAdmin ? "auto" : 0 }}
                        >
                           {message.content}
                        </div>
                     );
                  })}
            </div>
            <form className="py-4 px-9 sticky bottom-0 bg-white-smoke" onSubmit={sendMessage}>
               <span className="flex justify-between items-center py-3 bg-white-smoke rounded-full px-5 border border-c-blue">
                  <input
                     type="text"
                     className="focus:outline-none w-0 flex-1 gap-x-3 bg-white-smoke text-gray-700 text-sm"
                     placeholder="Enter a message..."
                     value={newMessage}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewMessage(e.target.value)
                     }
                  />
                  <button className="ml-auto text-c-blue" type="submit" disabled={isSending}>
                     {isSending ? (
                        <AiOutlineLoading3Quarters size={20} className="animate-spin" />
                     ) : (
                        <AiOutlineSend size={20} />
                     )}
                  </button>
               </span>
            </form>
         </main>
      </div>
   );
};

export default Chat;
