import React, {useState, useEffect} from 'react'
import bg from '../assets/bg.jpg'
import img from '../assets/image.jpg'
import { Link } from "react-router-dom";
import Axios  from 'axios';

const Timeout = () => {
    const [attendance, setAttendance] = useState([])

    useEffect(() => {
      Axios.get('http://localhost:3001/attendance')
      .then(resp => setAttendance(resp.data))
      .catch(err => console.log(err))
    }, [])

  return (
    <div style={{'background-image': `url(${bg})`}} className='overflow-hidden w-full flex flex-col items-center justify-center h-screen bg-no-repeat bg-center bg-cover'>
        <div className='flex mx-48 py-20 justify-center items-center'>
          <img src={img} alt="img" className='h-[600px] items-center rounded-tl-xl rounded-bl-xl' />
          <div className='h-full pt-10 px-10 pb-[417px] justify-between flex items-center overflow-x-hidden overflow-scroll w-[920px] relative bg-[#242424] rounded-br-xl rounded-tr-xl '>
              <div className='mt-10 flex flex-col gap-7 text-white'>
                <div className='flex items-center gap-'>
                  <div className='flex gap-4 text-[#D0D0D0] text-[10px] items-center'>
                    <Link to='/login'>Login</Link>
                    <Link to="/timein"><button className='hover:border-b-[1px] border-[#DFD46F] items-center duration-100'>Time in </button></Link>
                    <p>|</p>
                    <button className='bg-[#4A4A4A] px-3 py-1 rounded-sm'>Attendance</button>
                  </div>
                </div>
                <h1>Attendance list</h1>
                <div className=''>
                  <table className='bg-white rounded-md shadow-lg min-w-[500px] max-h-[500px] h-[400px] absolute'>
                    <thead className='text-black text-[11px] border-b-2 '>
                      <tr className='mt-5'>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Year</th>
                        <th>Purpose</th>
                        <th>Time-in</th>
                      </tr>
                    </thead>
                    <tbody className=''>
                      {attendance.map((student, index) => {
                        return (
                          <tr key={index}>
                            <td className='text-black text-[11px] text-center items-center border-r-2 border-b-2'>{student.name}</td>
                            <td className='text-black text-[11px] text-center items-center border-r-2 border-b-2'>{student.course}</td>
                            <td className='text-black text-[11px] text-center items-center border-r-2 border-b-2'>{student.year}</td>
                            <td className='text-black text-[11px] text-center items-center border-r-2 border-b-2'>{student.transaction}</td>
                            <td className='text-black text-[11px] text-center items-center border-r-2 border-b-2'>{student.date}</td>
                          </tr>
                        )
                      })}
                      
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Timeout