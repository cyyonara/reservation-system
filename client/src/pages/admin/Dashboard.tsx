import AdminRootLayout from "../../shared/layout/AdminRootLayout";
import React, { useEffect } from "react";
import { useDashboardData } from "../../hooks/useDashboardData";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useAdminAuthStore } from "../../zustand-store/adminAuthStore";
import { useAdminMainNavbarStore } from "../../zustand-store/adminMainNavbarStore";
import { BiMenuAltRight } from "react-icons/bi";
import DashboardSkeleton from "../../components/admin/DashboardSkeleton";

const Dashboard: React.FC = () => {
  const c_admin = useAdminAuthStore((state) => state.c_admin);
  const { openMainNavBar, closeMainNavbar } = useAdminMainNavbarStore((state) => state);
  const { data, isLoading, isSuccess } = useDashboardData();

  useEffect(() => {
    closeMainNavbar();
    document.title = "Dashboard";
  }, []);

  return (
    <AdminRootLayout>
      <div className="flex-1 bg-gray-200 p-3 xl:p-5">
        <nav className="bg-white px-4 py-3 gap-x-3 flex items-center rounded-md mb-4 shadow-sm">
          <div className="flex items-center gap-x-2 flex-1">
            <AiOutlineSearch color="gray" size={22} />
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none w-0 flex-1 text-sm text-gray-500"
            />
          </div>
          <div className="flex gap-x-4 items-center justify-end">
            <span className="hidden sm:flex relative cursor-pointer p-1">
              <IoIosNotificationsOutline size={25} />
              <span className="bg-red-600 absolute px-[6px] py-[2px] top-0 right-[2px] text-[8px] text-white rounded-full">
                2
              </span>
            </span>
            <span className="hidden sm:flex relative cursor-pointer rounded-full">
              <img
                src={c_admin!.avatar}
                alt="admin-avatar"
                className="h-[33px] w-[33px] object-center object-cover rounded-full"
              />
              <span className="z-10 p-[2px] rounded-full bg-white absolute bottom-0 right-0">
                <span className="w-2 h-2 bg-green-600 block rounded-full"></span>
              </span>
            </span>
            <span className="group rounded-full xl:hidden cursor-pointer" onClick={openMainNavBar}>
              <BiMenuAltRight size={21} className="group-active:scale-90 duration-150 " />
            </span>
          </div>
        </nav>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-2 md:gap-3 xl:gap-4">
          {isLoading && <DashboardSkeleton count={2} />}
          {isSuccess && (
            <React.Fragment>
              <div className="bg-white rounded-md flex items-stretch p-4 lg:p6 gap-x-4 shadow-sm">
                <div className="flex items-center">
                  <span className="bg-c-blue/10 p-3 rounded-full">
                    <MdOutlinePendingActions className="text-c-blue text-lg md:text-3xl" />
                  </span>
                </div>
                <div className="flex flex-col justify-center overflow-hidden">
                  <span className="font-semibold text-xl md:text-2xl truncate">
                    {data.pendingReservations}
                  </span>
                  <span className="text-[10px] md:text-xs text-gray-600 truncate whitespace-normal">
                    Pending Reservations
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-md flex items-stretch p-4 lg:p6 gap-x-4 shadow-sm">
                <div className="flex items-center">
                  <span className="bg-green-600/20 p-3 rounded-full">
                    <HiOutlineUserGroup color="green" className="text-lg md:text-3xl" />
                  </span>
                </div>
                <div className="flex flex-col justify-center overflow-hidden">
                  <span className="font-semibold text-xl md:text-2xl truncate">
                    {data.activeUser}
                  </span>
                  <span className="text-[10px] md:text-xs text-gray-600 truncate whitespace-normal">
                    Active User
                  </span>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </AdminRootLayout>
  );
};

export default Dashboard;
