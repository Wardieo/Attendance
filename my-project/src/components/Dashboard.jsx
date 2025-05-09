import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { RiUserStarFill } from "react-icons/ri";
import { MdLocalLibrary } from "react-icons/md";
import { MdQuiz } from "react-icons/md";

const Dashboard = () => {
  const location = useLocation();
  console.log(location.pathname);
  const navBar = [
    {
      id: 1,
      icon: <MdLocalLibrary />,
      name: "Overview",
      path: "/",
    },
    {
      id: 2,
      icon: <RiUserStarFill />,
      name: "Students",
      path: "/students",
    },
    {
      id: 3,
      icon: <MdQuiz />,
      name: "Quiz",
      path: "/quiz",
    },
  ];

  return (
    <div>
      <div className="flex h-screen">
        <div className="w-24 bg-[#F9F9F9] flex flex-col justify-between">
          <div className="mx-3 mt-6 flex flex-col gap-4">
            {navBar.map((each) => {
              return (
                <Link to={each.path}>
                  <div
                    key={each.id}
                    className={
                      each.path === location.pathname
                        ? "text-2xl items-center px-2 flex flex-col py-2 rounded-lg text-white bg-[#4B83D7] hover:cursor-pointer"
                        : "text-2xl items-center px-2 flex flex-col py-2 rounded-lg text-[#807A7A] hover:cursor-pointer"
                    }
                  >
                    {each.icon}
                    <h1 className="text-[12px] font-semibold">{each.name}</h1>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="m-10 w-screen h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
