import { motion } from "framer-motion";
import { useEffect } from "react";

type Props = { signOut: () => void; closeDialog: () => void };

const SignOutDialog: React.FC<Props> = ({ signOut, closeDialog }: Props) => {
   const body = document.body as HTMLBodyElement;

   useEffect(() => {
      body.style.overflow = "hidden";

      return () => {
         body.style.overflow = "auto";
      };
   }, []);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.15 }}
         className="fixed inset-0 flex bg-black/40 z-[100]"
         onClick={closeDialog}
      >
         <motion.div
            initial={{ y: "20vh" }}
            animate={{ y: 0 }}
            exit={{ y: "50vh" }}
            className="m-auto bg-white p-6 shadow-lg rounded-md text-black"
            onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
         >
            <p className="text-lg mb-4">Are you sure you want to sign out?</p>
            <span className="flex justify-end gap-x-2">
               <button
                  className="bg-c-blue py-[6px] px-3 text-white rounded-md duration-150 hover:opacity-80"
                  onClick={signOut}
               >
                  Sign out
               </button>
               <button
                  className="bg-white py-[6px] px-3 rounded-md duration-150 hover:bg-gray-100"
                  onClick={closeDialog}
               >
                  Cancel
               </button>
            </span>
         </motion.div>
      </motion.div>
   );
};

export default SignOutDialog;
