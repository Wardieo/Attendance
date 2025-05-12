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
import Axios from "axios";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const Overview = () => {
  const [total_students, setTotal_students] = useState(0);
  const [total_attendance, setTotal_attendance] = useState(0);
  const [topAttendance, setTopAttendance] = useState("");
  const [top3Attendance, setTop3Attendance] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAttendance = attendance.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(attendance.length / itemsPerPage);

  useEffect(() => {
    Axios.get("http://localhost:3001/attendance")
      .then((resp) => setAttendance(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((res) => {
      if (res.data.Status === "Success") {
        setAuth(true);
      } else {
        setAuth(false);
        setMessage(res.data.Message);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/total_students")
      .then((response) => setTotal_students(response.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/total_attendance")
      .then((response) => setTotal_attendance(response.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/top_attendance")
      .then((response) => setTopAttendance(response.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/top3_attendance")
      .then((response) => setTop3Attendance(response.data))
      .catch((err) => console.log(err));
  }, []);

  return auth ? (
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
            <Link to="/admin/quiz">+ Create Quiz</Link>
          </button>
          <button className="text-[11px] bg-[#4B83D7] text-white rounded-md p-2 shadow-md">
            <Link to="/admin/students">+ Add Student</Link>
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
                  <h1 className="text-xl font-semibold">
                    {total_students?.[0]?.["COUNT(student_info_id)"] ??
                      "Loading..."}
                  </h1>
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
                  <p className="text-sm text-gray-600">Total Attendance</p>
                  <h1 className="text-xl font-semibold">
                    {total_attendance?.[0]?.["COUNT(timein_id)"] ??
                      "Loading..."}
                  </h1>
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
                <h1 className="text-xl font-semibold">
                  {topAttendance?.[0]?.["name"] ?? "Loading..."}
                </h1>
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
          <h1 className="font-bold">Attendance List</h1>
          <div className="">
            <table className="w-full mt-5">
              <thead className="text-gray-700 border-b-2 ">
                <tr className="mt-5">
                  <th>Name</th>
                  <th>Course</th>
                  <th>Year</th>
                  <th>Purpose</th>
                  <th>Time-in</th>
                </tr>
              </thead>
              <tbody>
                {currentAttendance.map((student, index) => (
                  <tr key={index} className="bg-gray-100 border-b-2">
                    <td className="text-sm py-5 text-center ">
                      {student.name}
                    </td>
                    <td className="text-sm py-5 text-center">
                      {student.course}
                    </td>
                    <td className="text-sm py-5 text-center">{student.year}</td>
                    <td className="text-sm py-5 text-center">
                      {student.transaction}
                    </td>
                    <td className="text-sm py-5 text-center">{student.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 gap-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                <GrFormPrevious />
              </button>
              <span className="px-3 py-1 text-sm">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                <GrFormNext />
              </button>
            </div>
          </div>
        </div>
        <div className="w-[60%]">
          <div className="flex flex-col justify-between gap-3">
            <div className="border border-gray-300 px-5 py-3 rounded-xl w-full shadow-md">
              <h1 className="font-semibold text-lg">Attendance Top 3 list</h1>
              <div className="flex flex-col pt-5 gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GiTrophyCup className="text-2xl text-yellow-400" />
                    <div>
                      <p>{top3Attendance?.[0]?.["name"] ?? "Loading..."}</p>
                      <p className="text-sm text-gray-500 font-semibold">
                        {top3Attendance?.[0]?.["course"] ?? "Loading..."}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-semibold">
                      Total Attendance
                    </p>
                    <p className="text-sm">
                      {top3Attendance?.[0]?.["attendance"] ?? "Loading..."}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-2xl text-gray-400" />
                    <div>
                      <p>{top3Attendance?.[1]?.["name"] ?? "Loading..."}</p>
                      <p className="text-sm text-gray-500 font-semibold">
                        {top3Attendance?.[1]?.["course"] ?? "Loading..."}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-semibold">
                      Total Attendance
                    </p>
                    <p className="text-sm">
                      {top3Attendance?.[1]?.["attendance"] ?? "Loading..."}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-2xl text-amber-800" />
                    <div>
                      <p>{top3Attendance?.[2]?.["name"] ?? "Loading..."}</p>
                      <p className="text-sm text-gray-500 font-semibold">
                        {top3Attendance?.[2]?.["course"] ?? "Loading..."}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-semibold">
                      Total Attendance
                    </p>
                    <p className="text-sm">
                      {top3Attendance?.[2]?.["attendance"] ?? "Loading..."}
                    </p>
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
    </div>
  ) : (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="border-b-2 text-2xl font-bold py-4">
        You are not yet logged in
      </h2>
      <div className="w-10 mt-4">
        <Link
          to="/login"
          className="bg-[#4B83D7] px-3 py-1 rounded-md text-white"
        >
          Login
        </Link>
      </div>
      <p className="text-red-500 text-sm mt-2">{message}</p>
    </div>
  );
};

export default Overview;
