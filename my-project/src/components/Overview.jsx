import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { PiRankingFill } from "react-icons/pi";
import { SiQuizlet } from "react-icons/si";
import { CiCirclePlus } from "react-icons/ci";
import { IoArrowForwardSharp } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { Line } from "react-chartjs-2";
import { IoSearch } from "react-icons/io5";
import Axios from "axios";
const Overview = () => {
  const [student, setStudent] = useState([]);
  const [search, setSearch] = useState("");
  const [total_students, setTotal_students] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:3001/student")
      .then((response) => setStudent(response.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3000/total_students")
      .then((response) => setTotal_students(response.data))
      .catch((err) => console.log(err));
  });
  const handleDelete = (id) => {
    Axios.delete("http://localhost:3001/delete/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1>Dashboard</h1>
          <p className="text-[12px] text-gray-600">
            Overview of all of students and attendance
          </p>
        </div>
        <div className="flex gap-5">
          <button className="text-[11px] border border-gray-300 rounded-md p-2 shadow-md">
            <Link to="/quiz">+ Create Quiz</Link>
          </button>
          <button className="text-[11px] bg-[#4B83D7] text-white rounded-md p-2 shadow-md">
            <Link to="/students">+ Add Student</Link>
          </button>
        </div>
      </div>
      <div className="my-10">
        <div className="flex gap-10 justify-between">
          <div className="flex flex-col pt-7 border w-full border-gray-300 rounded-md">
            <div className="flex items-center gap-4 px-4 ">
              <FaUsers className="border border-gray-300 w-10 h-10 p-2 rounded-lg shadow-md bg-gray-100" />
              <div className="flex items-center justify-between w-full">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <h1 className="text-xl font-semibold">{total_students}</h1>
                </div>
                <div className="bg-gray-50 px-2 py-1 border border-gray-100 rounded-md flex items-center gap-2">
                  <CiCirclePlus className="text-[13px] font-bold text-green-500" />
                  <p className="text-[10px] font-bold text-green-500">+ 15%</p>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t px-4 py-2 bg-gray-50">
              <p className="text-[11px] text-[#4B83D7] flex items-center gap-3">
                See details <IoArrowForwardSharp />
              </p>
            </div>
          </div>
          <div className="flex flex-col pt-7 border w-full border-gray-300 rounded-md">
            <div className="flex items-center gap-4 px-4 ">
              <FaUserPen className="border border-gray-300 w-10 h-10 p-2 rounded-lg shadow-md bg-gray-100" />
              <div className="flex items-center justify-between w-full">
                <div>
                  <p className="text-sm text-gray-600">Today Attendance</p>
                  <h1 className="text-xl font-semibold">30</h1>
                </div>
                <div className="bg-gray-50 px-2 py-1 border border-gray-100 rounded-md flex items-center gap-2">
                  <CiCirclePlus className="text-[13px] font-bold text-green-500" />
                  <p className="text-[10px] font-bold text-green-500">+ 25%</p>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t px-4 py-2 bg-gray-50">
              <p className="text-[11px] text-[#4B83D7] flex items-center gap-3">
                See details <IoArrowForwardSharp />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 border w-full border-gray-300 rounded-md py-4 pr-6 pl-3">
            <PiRankingFill className="border border-gray-300 w-10 h-10 p-2 rounded-md shadow-md bg-gray-100" />
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm text-gray-600">
                  #1 in Student Attendance
                </p>
                <h1 className="text-xl font-semibold">Edward Mosquera</h1>
              </div>
              <div>
                <GiTrophyCup className="text-yellow-400 text-4xl" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 border w-full border-gray-300 rounded-md py-4 pr-6 pl-3">
            <SiQuizlet className="border border-gray-300 w-10 h-10 p-2 rounded-md shadow-md bg-gray-100" />
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm text-gray-600">#1 in Quizzes</p>
                <h1 className="text-xl font-semibold">Edward Mosquera</h1>
              </div>
              <div>
                <GiTrophyCup className="text-yellow-400 text-4xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6 w-full">
        <div className=" w-full border p-5 rounded-xl shadow-md">
          <h1>Overview</h1>
        </div>
        <div className="w-full">
          <div className="flex flex-col justify-between gap-3">
            <div className="border border-gray-300 px-5 py-3 rounded-xl w-full shadow-md">
              <h1 className="font-semibold text-lg">Attendance Top 3 list</h1>
              <div className="flex flex-col pt-5 gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GiTrophyCup className="text-2xl text-yellow-400" />
                    <div>
                      <p>Edward Mosquera</p>
                      <p className="text-sm text-gray-500 font-semibold">
                        BSCS
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-semibold">
                      Total Attendance
                    </p>
                    <p className="text-sm">213</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-2xl text-gray-400" />
                    <div>
                      <p>Vincent Mosquera</p>
                      <p className="text-sm text-gray-500 font-semibold">
                        BSCS
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-semibold">
                      Total Attendance
                    </p>
                    <p className="text-sm">201</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-2xl text-amber-800" />
                    <div>
                      <p>Edvin Mosquera</p>
                      <p className="text-sm text-gray-500 font-semibold">
                        BSCS
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-semibold">
                      Total Attendance
                    </p>
                    <p className="text-sm">102</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 px-5 w-full py-3 rounded-xl shadow-md">
              <h1 className="font-semibold text-lg">Quizz Top 3 list</h1>
              <div className="flex flex-col pt-5 gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GiTrophyCup className="text-2xl text-yellow-400" />
                    <div>
                      <p>Edward Mosquera</p>
                      <p className="text-sm text-gray-500 font-semibold">
                        BSCS
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-semibold">Total Score</p>
                    <p className="text-sm">213</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-2xl text-gray-400" />
                    <div>
                      <p>Vincent Mosquera</p>
                      <p className="text-sm text-gray-500 font-semibold">
                        BSCS
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-semibold">Total Score</p>
                    <p className="text-sm">201</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-2xl text-amber-800" />
                    <div>
                      <p>Edvin Mosquera</p>
                      <p className="text-sm text-gray-500 font-semibold">
                        BSCS
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-semibold">Total Score</p>
                    <p className="text-sm">102</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 w-full border border-gray-300 shadow-md rounded-lg">
        <div className="p-5">
          <h1>Student List</h1>
          <div className="flex items-center justify-between mx-auto my-8">
            <div className="flex items-center gap-3">
              <IoSearch />
              <input
                type="text"
                placeholder="Search..."
                className="border-gray-200"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <button className="border text-sm border-gray-300 px-3 py-1 rounded-md bg-slate-50">
                Filter
              </button>
              <button className="border text-sm border-gray-300 px-3 py-1 rounded-md bg-slate-50">
                All Course
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead className="border-b-2 bg-black w-full">
              <tr className="flex justify-between">
                <th className="px-2">Usn</th>
                <th className="px-2">Name</th>
                <th className="px-2">Course</th>
                <th className="px-2">Year</th>
                <th className="px-2">Department</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
