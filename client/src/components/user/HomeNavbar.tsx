import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { FiSettings } from "react-icons/fi";
import { useAuthStore } from "../../zustand-store/authStore";
import { NavLink } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import React from "react";
import SignOutDialog from "./SignOutDialog";
import axios from "axios";

const HomeNavbar: React.FC = () => {
  const { user, clearCredential } = useAuthStore();
  const [showSignoutDialog, setShowSignoutDialog] = useState<boolean>(false);

  const signOut = async (): Promise<void> => {
    toast.promise(
      axios.post<{ sucess: true }>("/api/auth/sign-out", null, {
        withCredentials: true,
      }),
      {
        loading: "Signing out...",
        success: () => {
          clearCredential();
          return "Signed out successfully!";
        },
        error: "Something went wrong",
        position: "top-right",
        duration: 2000,
      }
    );
  };

  return (
    <>
      <AnimatePresence>
        {showSignoutDialog && (
          <SignOutDialog
            closeDialog={() => setShowSignoutDialog(false)}
            signOut={() => signOut()}
          />
        )}
      </AnimatePresence>
      <div className="hidden xl:flex fixed top-[70px] flex-col bottom-0 w-[320px] py-4 bg-c-blue shadow-[2px_0_8px_rgba(0,0,0,0.1)]">
        <div className="flex p-4 gap-x-2 text-white border-b border-white">
          <img
            src={user!.avatar}
            alt={user!.name}
            className="min-w-[50px] max-w-[50px] object-center object-cover h-[50px] rounded-full overflow-hidden"
          />
          <span>
            <h6 className="font-bold w-[225px] truncate">{user!.name}</h6>
            <p className="text-xs w-[225px] truncate">{user!.email}</p>
          </span>
        </div>
        <nav className="flex-1 flex my-4 overflow-auto u-home-nav">
          <ul className="flex flex-col text-white flex-1 pr-8">
            <li>
              <NavLink
                to="/h"
                className="flex items-center gap-x-1 px-4 py-2 rounded-tr-full rounded-br-full"
              >
                <AiOutlineHome />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className="flex items-center gap-x-1 px-4 py-2 bg-blue text-white rounded-tr-full rounded-br-full"
              >
                <AiOutlineShoppingCart />
                <span>Cart</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reservations"
                className="flex items-center gap-x-1 px-4 py-2 bg-blue text-white rounded-tr-full rounded-br-full"
              >
                <LiaSwimmingPoolSolid />
                <span>My Reservations</span>
              </NavLink>
            </li>
            <li className="mt-auto">
              <NavLink
                to="/settings"
                className="flex items-center gap-x-1 px-4 py-2 bg-blue text-white rounded-tr-full rounded-br-full mt-auto"
              >
                <FiSettings />
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <button
                className="flex items-center gap-x-1 px-4 py-2 bg-blue text-white rounded-tr-full rounded-br-full w-full duration-150 active:bg-white active:text-c-blue"
                onClick={() => setShowSignoutDialog(true)}
              >
                <TbLogout />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HomeNavbar;
