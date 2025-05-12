import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

function Students() {
  const [student, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [student_info_id, setStudent_info_id] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState("");
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [editData, setEditData] = useState({
    student_info_id: "",
    name: "",
    year: "",
    course: "",
    department: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 7;

  useEffect(() => {
    fetchStudents();
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

  const fetchStudents = () => {
    Axios.get("http://localhost:3001/student")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  };

  const onSubmit = () => {
    const dept = course === "BSCS" || course === "BSIT" ? "CED" : "BED";

    if (!student_info_id || !name || !course || !year) {
      alert("Please fill in all fields.");
      return;
    }

    Axios.post("http://localhost:3001/add", {
      student_info_id,
      name,
      year,
      course,
      department: dept,
      attendance: 0,
      quizes: 0,
    })
      .then(() => {
        resetForm();
        setShowModal(false);
        fetchStudents();
      })
      .catch((err) => console.error("Error adding student:", err));
  };

  const resetForm = () => {
    setStudent_info_id("");
    setName("");
    setYear("");
    setCourse("");
  };

  const handleEditClick = (student) => {
    setEditData({ ...student });
    setShowEditModal(true);
  };

  const onEditSubmit = () => {
    if (!editData.name || !editData.course || !editData.year) {
      alert("Please fill in all fields.");
      return;
    }

    const dept =
      editData.course === "BSCS" || editData.course === "BSIT" ? "CED" : "BED";

    Axios.put(`http://localhost:3001/edit/${editData.student_info_id}`, {
      ...editData,
      department: dept,
    })
      .then(() => {
        setShowEditModal(false);
        fetchStudents();
      })
      .catch((err) => console.error("Error updating student:", err));
  };

  const handleDelete = (id) => {
    Axios.delete("http://localhost:3001/delete/" + id)
      .then((res) => {
        console.log(res);
        fetchStudents();
      })
      .catch((err) => console.log(err));
  };

  const filteredStudents = student.filter((each) => {
    if (search === "") return true;
    const lowerSearch = search.toLowerCase();
    return (
      each.name.toLowerCase().includes(lowerSearch) ||
      each.course.toLowerCase().includes(lowerSearch) ||
      each.department.toLowerCase().includes(lowerSearch) ||
      each.year.toLowerCase().includes(lowerSearch)
    );
  });
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return auth ? (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1>Student List</h1>
          <p className="text-[12px] text-gray-700">
            Add Students to the system and manage their information.
          </p>
          <div className="mt-10">
            <div className="flex border-b-2 ">
              <input
                type="text"
                placeholder="Search Students..."
                onChange={(e) => setSearch(e.target.value)}
                className="focus:outline-0"
              />
              <IoSearchSharp className="text-gray-700" />
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="text-[11px] bg-[#4B83D7] text-white rounded-md p-2 shadow-md"
        >
          + Add Student
        </button>
      </div>

      {/* Table */}
      <div className="mt-10 flex flex-col gap-3">
        <div className="grid grid-cols-6 font-semibold px-5 py-2 border-b text-sm text-gray-700">
          <span>USN</span>
          <span>Name</span>
          <span>Course</span>
          <span>Year</span>
          <span>Department</span>
          <span className="text-center">Actions</span>
        </div>

        {currentStudents.map((each) => (
          <div
            key={each.student_info_id}
            className={`grid grid-cols-6 items-center px-5 py-4 shadow-md border rounded-md text-sm ${
              each.course === "BSCS"
                ? "border-l-violet-500"
                : each.course === "BSIT"
                ? "border-l-orange-500"
                : each.course === "BSBA-FM" || each.course === "BSBA-MM"
                ? "border-l-yellow-500"
                : "border-l-blue-500"
            } border-l-4`}
          >
            <div className="flex items-center gap-3">
              <img
                src="https://avatar.iran.liara.run/public/13"
                alt="icon"
                className="w-8 h-8 rounded-full"
              />
              <p>{each.student_info_id}</p>
            </div>
            <p>{each.name}</p>
            <p>{each.course}</p>
            <p>{each.year}</p>
            <p>{each.department}</p>
            <div className="flex gap-4 justify-center text-lg">
              <button
                className="text-blue-500"
                onClick={() => handleEditClick(each)}
              >
                <MdEdit />
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(each.student_info_id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-3 py-1 rounded-md text-sm ${
              number === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <Modal
          title="Add Student"
          onClose={() => setShowModal(false)}
          onSubmit={onSubmit}
          values={{ student_info_id, name, year, course }}
          setValues={{
            setStudent_info_id,
            setName,
            setYear,
            setCourse,
          }}
        />
      )}

      {/* Edit Student Modal */}
      {showEditModal && (
        <Modal
          title="Edit Student"
          onClose={() => setShowEditModal(false)}
          onSubmit={onEditSubmit}
          values={editData}
          setValues={{
            setStudent_info_id: (val) =>
              setEditData((prev) => ({ ...prev, student_info_id: val })),
            setName: (val) => setEditData((prev) => ({ ...prev, name: val })),
            setYear: (val) => setEditData((prev) => ({ ...prev, year: val })),
            setCourse: (val) =>
              setEditData((prev) => ({ ...prev, course: val })),
          }}
          disableUSN={true}
        />
      )}
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
}

function Modal({ title, onClose, onSubmit, values, setValues, disableUSN }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[800px] p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold">USN</label>
            <input
              className="border-b-2 border-gray-300 text-gray-500 focus:outline-none focus:border-blue-500"
              value={values.student_info_id}
              onChange={(e) => setValues.setStudent_info_id(e.target.value)}
              type="text"
              placeholder="Enter the USN"
              disabled={disableUSN}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Name</label>
            <input
              className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              value={values.name}
              onChange={(e) => setValues.setName(e.target.value)}
              type="text"
              placeholder="Enter the Name"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Course</label>
            <input
              className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              value={values.course}
              onChange={(e) => setValues.setCourse(e.target.value)}
              type="text"
              placeholder="Ex. BSCS"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Year</label>
            <input
              className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              value={values.year}
              onChange={(e) => setValues.setYear(e.target.value)}
              type="text"
              placeholder="Ex. 2nd"
            />
          </div>
        </form>
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Students;
