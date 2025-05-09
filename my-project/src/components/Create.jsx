import React, { useState } from "react";
import bg from "../assets/shelf.jpg";
import { Link } from "react-router-dom";
import Axios from "axios";

const Create = () => {
  const [student_info_id, setStudent_info_id] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");

  const onSubmit = () => {
    Axios.post("http://localhost:3001/add", {
      student_info_id: student_info_id,
      name: name,
      year: year,
      course: course,
      department: department,
    })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));

    setStudent_info_id("");
    setName("");
    setYear("");
    setCourse("");
    setDepartment("");
  };
  return (
    <div
      style={{ "background-image": `url(${bg})` }}
      className=" w-full flex flex-col items-center justify-center h-screen bg-no-repeat bg-center bg-cover"
    >
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <h2 className="border-b-2 text-2xl font-bold py-4">Add Student</h2>
        <form className="grid grid-cols-2 pt-3">
          <div className="flex flex-col mx-2">
            <label className="font-semibold">Usn</label>
            <input
              value={student_info_id}
              onChange={(e) => {
                setStudent_info_id(e.target.value);
              }}
              type="number"
              placeholder="Enter the USN"
              class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className="flex flex-col mx-2">
            <label className="font-semibold">Name</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Enter the Name"
            />
          </div>
          <div className="flex flex-col mx-2">
            <label className="font-semibold">
              Course <span className="font-normal"> - abbvreviation</span>
            </label>
            <input
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
              }}
              type="text"
              placeholder="Ex.. BSCS"
            />
          </div>
          <div className="flex flex-col mx-2">
            <label className="font-semibold">Year</label>
            <input
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              type="text"
              placeholder="Ex.. 2nd"
            />
          </div>
          <div className="flex flex-col mx-2">
            <label className="font-semibold">
              Department <span className="font-normal"> - abbvreviation</span>
            </label>
            <input
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              type="text"
              placeholder="Ex.. CED"
            />
          </div>
        </form>
        <div className="flex gap-2 mt-3">
          <Link
            to="/home"
            className="bg-red-600 px-3 py-1 rounded-md text-white"
          >
            Back
          </Link>
          <button
            onClick={onSubmit}
            className="bg-green-600 px-3 py-1 rounded-md text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
