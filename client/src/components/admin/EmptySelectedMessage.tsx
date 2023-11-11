import React from "react";
import MessagesHeader from "./MessagesHeader";

const EmptySelectedMessage: React.FC = (): React.JSX.Element => {
   return (
      <main className="flex-1 bg-white-smoke flex flex-col">
         <MessagesHeader />
         <div className="flex-1 flex-col items-center justify-center flex">
            <svg
               className="w-[200px]"
               fill="#3b82f6"
               viewBox="0 0 256.00098 256.00098"
               id="Flat"
               xmlns="http://www.w3.org/2000/svg"
               stroke="#3b82f6"
               strokeWidth="0.0025600098000000005"
            >
               <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
               <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
               <g id="SVGRepo_iconCarrier">
                  <path d="M236,96.00049a20.0226,20.0226,0,0,0-20-20H188.001v-28a20.0226,20.0226,0,0,0-20-20h-128a20.0226,20.0226,0,0,0-20,20v128a11.99989,11.99989,0,0,0,19.54394,9.332l28.45557-23.00458.00049,21.67255a20.0226,20.0226,0,0,0,20,20h92.17285l36.2832,29.332a11.99969,11.99969,0,0,0,19.54395-9.332ZM44.001,150.86816V52.00049h120V87.98114l-.001.01935.001.01935v43.98065H71.583a11.999,11.999,0,0,0-7.54395,2.668Zm147.96093,31.8003a11.99893,11.99893,0,0,0-7.54394-2.668H92.001l-.00049-24H168.001a20.0226,20.0226,0,0,0,20-20v-36H212l.001,98.86767Z"></path>
               </g>
            </svg>
            <h4 className="font-semibold text-2xl text-gray-800">No chats selected</h4>
         </div>
      </main>
   );
};

export default EmptySelectedMessage;
