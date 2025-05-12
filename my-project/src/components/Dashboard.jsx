import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { RiUserStarFill } from "react-icons/ri";
import { MdLocalLibrary } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { BiLogoFlickr } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import Axios from "axios";

const Dashboard = () => {
  const location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();
  const navBar = [
    {
      id: 1,
      icon: <MdLocalLibrary />,
      name: "Overview",
      path: "/admin",
    },
    {
      id: 2,
      icon: <RiUserStarFill />,
      name: "Students",
      path: "/admin/students",
    },
    {
      id: 3,
      icon: <MdQuiz />,
      name: "Quiz",
      path: "/admin/quiz",
    },
  ];

  const handleLogout = () => {
    Axios.get("http://localhost:3001/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        } else {
          alert("error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="flex h-screen">
        <div className="w-24 bg-[#F9F9F9] flex flex-col justify-between">
          <div className="mx-3 mt-6 flex flex-col gap-4">
            <div className="flex flex-col items-center mx-auto">
              <div className="text-3xl text-[#4B83D7] font-bold ">
                <BiLogoFlickr />
              </div>
              <h1 className="text-sm text-blue-600">OneSpot</h1>
            </div>
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
          <div className="text-2xl items-center px-2 flex flex-col py-2 text-[#807A7A] hover:cursor-pointer">
            <button onClick={handleLogout}>
              <CiLogout />
              <h1 className="text-[12px] font-semibold">Logout</h1>
            </button>
          </div>
        </div>
        <div className="p-10 w-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
