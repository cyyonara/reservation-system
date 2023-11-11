import HomeNavbar from "../../components/user/HomeNavbar";
import UserRootLayout from "../../shared/layout/UserRootLayout";
import React from "react";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { NavLink, Outlet } from "react-router-dom";

const Reservations: React.FC = () => {
  return (
    <UserRootLayout>
      <React.Fragment>
        <HomeNavbar />
        <div className="flex-1 flex items-center flex-col xl:ml-[320px] bg-white-smoke p-8">
          <div className="w-full">
            <span className="text-c-blue flex items-center gap-x-1">
              <LiaSwimmingPoolSolid size={23} />
              <h3 className="text-xl">My Reservations</h3>
            </span>
          </div>
          <div className="w-full max-w-[1300px] mt-8 bg-white">
            <ul className="flex">
              <li className="flex-1 flex justify-center">
                <NavLink to="">On going</NavLink>
              </li>
              <li className="flex-1 flex justify-center">
                <NavLink to="pending">Pending</NavLink>
              </li>
              <li className="flex-1 flex justify-center">
                <NavLink to="completed">Completed</NavLink>
              </li>
              <li className="flex-1 flex justify-center">
                <NavLink to="cancelled">Cancelled</NavLink>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      </React.Fragment>
    </UserRootLayout>
  );
};

export default Reservations;
