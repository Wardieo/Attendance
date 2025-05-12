import React, { useState } from "react";
import bg from "../assets/shelf.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", value)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/admin");
        } else {
          alert(res.data.Message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{ "background-image": `url(${bg})` }}
      className=" w-full flex flex-col items-center justify-center h-screen bg-no-repeat bg-center bg-cover"
    >
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <div className="flex justify-between items-center border-b-2 py-4">
          <h2 className="text-2xl font-bold">Login</h2>
          <Link
            to={"/"}
            className="text-[8px] font-thin bg-[#4B83D7] text-white px-2 py-1 rounded-sm shadow-lg hover:scale-95 duration-200"
          >
            Attendance
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="grid pt-3 w-96">
          <div className="flex flex-col">
            <label className="font-semibold">Email</label>
            <input
              value={value.email}
              required
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              type="text"
              placeholder="Enter the email"
              className="text-gray-700 border-b-2 "
              name="email"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-semibold">Password</label>
            <input
              value={value.password}
              required
              onChange={(e) => {
                setValue({ ...value, password: e.target.value });
              }}
              type="password"
              placeholder="Enter the password"
              className="text-gray-700 border-b-2 "
              name="password"
            />
          </div>
          <div className="w-10 mt-4">
            <button className="bg-[#4B83D7] px-3 py-1 rounded-md text-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
