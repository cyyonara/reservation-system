import { useNavigate, NavigateFunction } from "react-router-dom";
import { GoPaperAirplane } from "react-icons/go";
import { useAccessChat } from "../../hooks/useAccessChat";
import { Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
   _id: string;
   avatar: string;
   username: string;
   name: string;
   email: string;
   closeModal: () => void;
};

const UserSearchResult: React.FC<Props> = ({
   _id,
   avatar,
   username,
   name,
   email,
   closeModal,
}: Props) => {
   const [selectedUser, setSelectedUser] = useState<string>();
   const { mutate, isLoading } = useAccessChat();
   const navigate: NavigateFunction = useNavigate();
   const queryClient = useQueryClient();

   const onAccessChat = (): void => {
      mutate(
         { _id },
         {
            onSuccess: (data) => {
               navigate(`/admin/messages/${data!._id}`);
               queryClient.invalidateQueries(["admin-messages"]);
               closeModal();
            },
            onError: (err) => toast.error(err.response!.data.message),
         }
      );
      setSelectedUser(_id);
   };

   return (
      <div className="flex flex-1 rounded-md overflow-hidden border p-2">
         <img
            src={avatar}
            alt={username}
            className="h-[65px] min-w-[65px] max-w-[65px] rounded-md overflow-hidden text-xs object-cover object-center"
         />
         <div className="flex flex-col justify-center ml-3 text-gray-800">
            <span className="text-lg line-clamp-1">{name}</span>
            <span className="text-xs line-clamp-1">{email}</span>
         </div>
         <button
            className="ml-auto bg-c-blue h-min self-center text-white text-sm p-2 rounded-md duration-150 hover:bg-blue-400 disabled:bg-blue-300"
            onClick={onAccessChat}
            disabled={isLoading}
         >
            {isLoading && selectedUser === _id ? (
               <Spinner color="blue" className="h-[15px] w-[15px]" />
            ) : (
               <GoPaperAirplane />
            )}
         </button>
      </div>
   );
};

export default UserSearchResult;
