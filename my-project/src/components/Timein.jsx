import React, { useEffect, useContext, useState } from 'react';
import bg from '../assets/bg.jpg';
import img from '../assets/image.jpg';
import arrow from '../assets/Right.png';
import { Link } from "react-router-dom";
import { AppContext } from '../App';
import Axios from 'axios';

const Timein = () => {
  const { student_info_id, setStudent_info_id, transaction, setTransaction, date, setDate } = useContext(AppContext);

  const handleUsn = (event) => {
    setStudent_info_id(event.target.value);
  }

  const handlePurpose = (event) => {
    setTransaction(event.target.value);
  }

  useEffect(() => {
    let time = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(time);
    }
  }, [setDate]);

  const formatDateForBackend = (date) => {
    const isoString = date.toISOString(); // Get ISO format
    const formattedDate = isoString.replace('T', ' ').replace('Z', ''); // Replace 'T' with space and remove 'Z'
    return formattedDate;
  }
  
  
  
  const Submit = () => {
    Axios.post('http://127.0.0.1:5000/create', {
      student_info_id: student_info_id,
      transaction: transaction,
      date: formatDateForBackend(date) // Format date for backend
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    alert('Thank you!');
    setStudent_info_id('');
    setTransaction('');
  }

  return (
    <div style={{ 'backgroundImage': `url(${bg})` }} className='overflow-y-hidden w-full flex flex-col items-center justify-center h-screen bg-no-repeat bg-center bg-cover'>
      <div className='flex mx-48 py-20 justify-center items-center '>
        <img src={img} alt="img" className='h-[600px] items-center rounded-tl-xl rounded-bl-xl' />
        <div className='h-full pt-10 px-10 pb-[173px] justify-between flex items-center w-full relative bg-[#242424] rounded-br-xl rounded-tr-xl '>
          <div className='mt-10 flex flex-col gap-20 text-white'>
            <div className='flex items-center gap-28'>
              <div className='flex gap-4 text-[#D0D0D0] text-[10px] items-center'>
                <button><button className=' bg-[#4A4A4A]  px-3 py-1 rounded-sm'>Time in </button></button>
                <p>|</p>
                <Link to="/attendance" className=' hover:border-b-[1px] border-[#DFD46F] items-center duration-100'>Attendance</Link>
              </div>
              <div className='text-[10px] text-center flex justify-center items-center'>
                <p>{date.toLocaleString()}</p>
              </div>
            </div>
            <div className='flex gap-10'>
              <div className='w-[30%] flex flex-col gap-3'>
                <p className='text-[10px] text-[#D0D0D0]'>Welcome</p>
                <h1 className='font-bold text-3xl'>Library Attendance</h1>
              </div>
              <div className='flex relative flex-col ml-14'>
                <h1 className='text-[30px] font-bold'>Time In</h1>
                <form onSubmit={Submit}>
                  <div className='flex flex-col mt-3'>
                    <input value={student_info_id} required onChange={handleUsn} type="number" placeholder='USN' className='bg-[#4A4A4A] remove-arrow text-[#ffffff] text-[12px] pr-20 pl-2 py-4 rounded-md border-[#929292] border-2' />
                  </div>
                  <div className='flex flex-col mt-4'>
                    <input value={transaction} required onChange={handlePurpose} type="text" placeholder='Purpose' className='bg-[#4A4A4A] text-[#ffffff] text-[12px] pr-20 pl-2 py-4 rounded-md border-[#929292] border-2' />
                  </div>
                  <div className='w-24 flex gap-3 mt-3'>
                    <Link to={`/submit/${student_info_id.length === 0 ? '' : student_info_id}`} className='text-left text-white bg-blue-500 pl-3 py-2 text-[11px] font-medium px-5 rounded-sm'>Check</Link>
                    <button className='text-left bg-[#DFD46F] pl-3 py-2 text-[11px] text-black font-bold pr-7 rounded-sm flex gap-3'>Submit<img src={arrow} alt="arrow" /></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timein;
