import { memo } from "react";

const MessagesHeader: React.FC = () => {
   return (
      <div className="bg-white px-9 py-[19px] flex justify-between items-center border-b">
         <h3 className="text-2xl text-c-blue">Messages</h3>
      </div>
   );
};

export default memo(MessagesHeader);
