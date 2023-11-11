import { NavLink } from "react-router-dom";
import { PiSwimmingPoolBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuthStore } from "../../zustand-store/authStore";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import React, { useState } from "react";
import U_MobileNav from "./U_MobileNav";
import SignOutDialog from "../../components/user/SignOutDialog";
import axios from "axios";

const U_Header: React.FC = (): React.JSX.Element => {
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);
  const [showSignoutDialog, setShowSignoutDialog] = useState<boolean>(false);
  const { user, clearCredential } = useAuthStore((state) => state);

  const signout = async (): Promise<void> => {
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
        {showMobileNav && (
          <U_MobileNav
            openSignoutDialog={() => setShowSignoutDialog(true)}
            closeNav={() => setShowMobileNav(false)}
          />
        )}
        {showSignoutDialog && (
          <SignOutDialog closeDialog={() => setShowSignoutDialog(false)} signOut={signout} />
        )}
      </AnimatePresence>
      <header className="user-header flex justify-between items-stretch h-[70px] px-4 md:px-12 lg:px-18 bg-c-blue text-white shadow-md sticky top-0 z-[80]">
        <NavLink to="/" className="flex items-center">
          <div className="flex items-center gap-x-1">
            <PiSwimmingPoolBold className="md:block text-lg md:text-xl" />
            <h5 className="text-base md:text-xl font-acme font-bold uppercase">HACIENDA DAVENA</h5>
          </div>
        </NavLink>
        <nav className="ml-auto">
          <ul className="hidden xl:flex items-stretch h-full gap-2">
            <li className="flex items-stretch">
              <NavLink to="/services" className="flex">
                <button className="m-auto px-2 py-1 rounded-md duration-150 hover:bg-blue-600">
                  Services
                </button>
              </NavLink>
            </li>
            <li className="flex items-stretch">
              <NavLink to="/about-us" className="flex">
                <button className="m-auto px-2 py-1 rounded-md duration-150 hover:bg-blue-600">
                  About Us
                </button>
              </NavLink>
            </li>
            <li className="flex items-stretch">
              <NavLink to="/contact-us" className="flex">
                <button className="m-auto px-2 py-1 rounded-md duration-150 hover:bg-blue-600">
                  Contact
                </button>
              </NavLink>
            </li>
          </ul>
        </nav>
        <span className="h-[30%] w-[2px] bg-white self-center mx-[15px] hidden xl:block"></span>
        <div className="flex items-center gap-x-2">
          {user ? (
            <div className="hidden xl:flex">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-[30px] h-[30px] object-cover object-center rounded-full"
              />
            </div>
          ) : (
            <>
              <NavLink to="/sign-in" className="hidden lg:block">
                <button className="m-auto px-2 py-1 rounded-md duration-150 hover:bg-blue-600">
                  Sign in
                </button>
              </NavLink>
              <NavLink to="/sign-up" className="hidden lg:block">
                <button className="m-auto px-2 py-1 rounded-md duration-150 hover:bg-blue-600">
                  Sign up
                </button>
              </NavLink>
            </>
          )}
          <button
            className="xl:hidden active:bg-blue-400 p-1 rounded-full duration-150"
            onClick={() => setShowMobileNav(true)}
          >
            <GiHamburgerMenu size={20} />
          </button>
        </div>
      </header>
    </>
  );
};

export default U_Header;
