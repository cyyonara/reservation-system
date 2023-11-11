import { PiSwimmingPoolBold } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { MdOutlineHomeRepairService } from "react-icons/md";

const Sidebar: React.FC = () => {
   return (
      <div className="fixed hidden xl:flex flex-col inset-y-0 w-[300px] left-0 bg-white pt-6 shadow-sm">
         <div className="flex text-c-blue gap-x-1 items-center px-5">
            <PiSwimmingPoolBold size={24} />
            <h2 className="text-2xl">
               <span className="font-semibold">HD</span>admin
            </h2>
         </div>
         <nav className="flex-1 mt-5 admin-sidebar">
            <ul className="flex h-full flex-col">
               <li>
                  <NavLink to="/admin/dashboard" className="relative block">
                     <span className="w-[3px] bg-c-blue absolute right-0 transition-all"></span>
                     <div className="flex items-center gap-x-2 py-3 px-7">
                        <LuLayoutDashboard />
                        <span className="text-sm">Dashboard</span>
                     </div>
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/admin/reservations" className="relative block">
                     <span className="w-[3px] bg-c-blue absolute right-0 transition-all"></span>
                     <div className="flex items-center gap-x-2 py-3 px-7">
                        <LiaSwimmingPoolSolid />
                        <span className="text-sm">Reservations</span>
                     </div>
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/admin/services" className="relative block">
                     <span className="w-[3px] bg-c-blue absolute right-0 transition-all"></span>
                     <div className="flex items-center gap-x-2 py-3 px-7">
                        <MdOutlineHomeRepairService />
                        <span className="text-sm">Services</span>
                     </div>
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/admin/messages" className="relative block">
                     <span className="w-[3px] bg-c-blue absolute right-0 transition-all"></span>
                     <div className="flex items-center gap-x-2 py-3 px-7">
                        <BiMessageDetail />
                        <span className="text-sm">Messages</span>
                        <span className="ml-auto text-[8px] text-white py-[2px] px-[6px] rounded-full bg-red-600">
                           2
                        </span>
                     </div>
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/admin/calendar" className="relative block">
                     <span className="w-[3px] bg-c-blue absolute right-0 transition-all"></span>
                     <div className="flex items-center gap-x-2 py-3 px-7">
                        <AiOutlineCalendar />
                        <span className="text-sm">Calendar</span>
                     </div>
                  </NavLink>
               </li>
               <li className="mt-auto px-1">
                  <span className="text-[10px]">&#169; Copyright Hacienda Davena 2023</span>
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default Sidebar;
