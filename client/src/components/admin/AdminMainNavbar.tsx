import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAdminAuthStore } from "../../zustand-store/adminAuthStore";
import { useAdminMainNavbarStore } from "../../zustand-store/adminMainNavbarStore";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

const AdminMainNavbar: React.FC = () => {
   const { c_admin } = useAdminAuthStore((state) => state);
   const { closeMainNavbar } = useAdminMainNavbarStore((state) => state);

   return (
      <motion.div
         initial={{ width: 0 }}
         animate={{ width: "100vw" }}
         exit={{ width: 0 }}
         transition={{ delay: 0.3 }}
         className="fixed flex flex-col inset-y-0 left-0 z-[80] bg-c-blue text-white overflow-hidden"
      >
         <span className="absolute top-4 right-4 cursor-pointer" onClick={closeMainNavbar}>
            <MdOutlineClose size={24} color="white" />
         </span>
         <div className="flex flex-col items-center p-8">
            <img
               src={c_admin!.avatar}
               alt={c_admin!.username}
               className="w-[80px] h-[80px]  object-cover object-center"
            />
            <div className="mt-2">
               <span>{c_admin!.username}</span>
            </div>
            <div className="flex items-center mt-3 gap-x-3">
               <span className="bg-white rounded-full p-1 text-c-blue">
                  <IoIosNotificationsOutline size={20} />
               </span>
               <span className="bg-white rounded-full p-1 text-c-blue">
                  <FiSettings size={20} />
               </span>
               <span className="bg-white rounded-full p-1 text-c-blue">
                  <AiOutlineLogout size={20} />
               </span>
            </div>
         </div>
         <nav className="flex-1 mt-4 main-admin-nav">
            <ul className="flex flex-col px-2">
               <li>
                  <NavLink
                     to="/admin/dashboard"
                     className="flex justify-center py-2 rounded-md items-center gap-x-1"
                  >
                     <LuLayoutDashboard />
                     <span>Dashboard</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/admin/reservations"
                     className="flex justify-center py-2 rounded-md items-center gap-x-1"
                  >
                     <LiaSwimmingPoolSolid />
                     <span>Reservations</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/admin/services"
                     className="flex justify-center py-2 rounded-md items-center gap-x-1"
                  >
                     <MdOutlineHomeRepairService className="text-white" />
                     <span>Services</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/admin/messages"
                     className="flex justify-center py-2 rounded-md items-center gap-x-1"
                  >
                     <BiMessageDetail />
                     <span>Messages</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/admin/calendar"
                     className="flex justify-center py-2 rounded-md items-center gap-x-1"
                  >
                     <AiOutlineCalendar />
                     <span>Calendar</span>
                  </NavLink>
               </li>
            </ul>
         </nav>
      </motion.div>
   );
};

export default AdminMainNavbar;
