import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../zustand-store/authStore";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { FiSettings, FiPhoneCall } from "react-icons/fi";
import { PiHandshakeDuotone } from "react-icons/pi";
import { BiSolidMessageAltError } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { motion } from "framer-motion";
import { useEffect } from "react";

type Props = { closeNav: () => void; openSignoutDialog: () => void };

const U_MobileNav: React.FC<Props> = ({ closeNav, openSignoutDialog }: Props) => {
  const { user } = useAuthStore((state) => state);

  useEffect(() => {
    const body = document.body as HTMLBodyElement;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] xl:hidden"
      onClick={closeNav}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-c-blue h-full ml-auto flex flex-col p-4 overflow-hidden min-w-[0px] max-w-[300px] text-white shadow-[0_0_10px_rgba(0,0,0,0.2)]"
        onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
        initial={{ translateX: 300 }}
        animate={{ translateX: 0 }}
        exit={{ translateX: 300 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex w-full gap-2 border-b border-white py-4">
          {user ? (
            <div className="flex flex-1 gap-x-3">
              <div className="h-[50px] w-[50px] rounded-full overflow-hidden text-xs text-center">
                <img src={user.avatar} alt={user.name} className="w-full h-full" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-semibold">{user.username}</span>
                <p className="text-xs truncate max-w-[200px]">{user.email}</p>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="whitespace-nowrap bg-white text-c-blue px-3 py-1 rounded-sm ml-auto"
              >
                Sign in
              </Link>
              <Link
                to="/sign-in"
                className="whitespace-nowrap bg-c-blue border px-3 py-1 border-white rounded-sm"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
        <nav className="mt-3 flex flex-col u-mobile-nav flex-1">
          <ul className="flex flex-1 flex-col">
            {user && (
              <>
                <li>
                  <NavLink to="/h" className="flex items-center gap-x-2 p-2 rounded-md">
                    <AiOutlineHome className="leading-none" />
                    <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cart" className="flex items-center gap-x-2 p-2 rounded-md">
                    <AiOutlineShoppingCart className="leading-none" />
                    <span>Cart</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/reservations" className="flex items-center gap-x-2 p-2 rounded-md">
                    <LiaSwimmingPoolSolid className="leading-none" />
                    <span>Reservations</span>
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/services" end className="flex items-center gap-x-2 p-2 rounded-md">
                <PiHandshakeDuotone className="leading-none" />
                <span>Services</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className="flex items-center gap-x-2 p-2 rounded-md">
                <BiSolidMessageAltError className="leading-none" />
                <span>About Us</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" className="flex items-center gap-x-2 p-2 rounded-md">
                <FiPhoneCall className="leading-none" />
                <span>Contact Us</span>
              </NavLink>
            </li>
            {user && (
              <>
                <li className="mt-auto">
                  <NavLink to="/settings" className="flex items-center gap-x-2 p-2 rounded-md">
                    <FiSettings classame="leading-none" />
                    <span>Settings</span>
                  </NavLink>
                </li>
                <li>
                  <button
                    className="flex items-center gap-x-2 p-2 rounded-md w-full"
                    onClick={() => {
                      closeNav();
                      openSignoutDialog();
                    }}
                  >
                    <TbLogout className="leading-none" />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </motion.div>
    </motion.div>
  );
};

export default U_MobileNav;
