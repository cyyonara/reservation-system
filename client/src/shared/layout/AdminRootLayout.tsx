import Sidebar from "../../components/admin/Sidebar";
import AdminMainNavbar from "../../components/admin/AdminMainNavbar";
import { useAdminMainNavbarStore } from "../../zustand-store/adminMainNavbarStore";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type Props = { children: React.JSX.Element };

const AdminRootLayout: React.FC<Props> = ({ children }: Props): JSX.Element => {
   const { showMainNavbar, closeMainNavbar } = useAdminMainNavbarStore((state) => state);

   const checkWindowSize = () => {
      if (window.innerWidth >= 1140) {
         closeMainNavbar();
      }
   };

   useEffect(() => {
      window.addEventListener("resize", checkWindowSize);

      return () => {
         window.removeEventListener("resize", checkWindowSize);
      };
   }, []);

   return (
      <div className="min-h-screen flex flex-col relative">
         <AnimatePresence>{showMainNavbar && <AdminMainNavbar />}</AnimatePresence>
         <Sidebar />
         <div className="flex flex-1 xl:ml-[300px]">{children}</div>
      </div>
   );
};

export default AdminRootLayout;
