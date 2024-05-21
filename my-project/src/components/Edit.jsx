import React, { useEffect, useState } from 'react'
import bg from '../assets/shelf.jpg'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Edit = () => {
    const {id} = useParams()

    const navigate = useNavigate();

    const [value, setValue] = useState({
        name: '',
        course: '',
        year: '',
        department: ''
    })

    useEffect(() => {
        Axios.get('http://127.0.0.1:5000/submit/'+id)
        .then(res => setValue({...value, usn: res.data[0].student_info_id, name:res.data[0].name, course: res.data[0].course, year: res.data[0].year, department: res.data[0].department}))
        .catch(err => console.log(err))
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.put('http://127.0.0.1:5000/edit/'+id, value)
        .then(res => {
            console.log(res)
            navigate('/home')
        })
        .catch(err => console.log(err));
    }
    

  return (
    <div style={{'background-image': `url(${bg})`}} className=' w-full flex flex-col items-center justify-center h-screen bg-no-repeat bg-center bg-cover'>
        <div className='bg-white p-4 rounded-lg shadow-xl'>
            <h2 className='border-b-2 text-2xl font-bold py-4'>Update Student</h2>
            <form className='grid grid-cols-2 pt-3'>
                <div className='flex flex-col mx-2'>
                    <label className='font-semibold'>Usn</label>
                    <input value={value.usn} disabled type="number" placeholder='Enter the USN' class="text-gray-400 border-2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>
                <div className='flex flex-col mx-2'>
                    <label className='font-semibold'>Name</label>
                    <input value={value.name} onChange={(e) => {setValue({...value, name: e.target.value})}} type="text" placeholder='Enter the Name' />
                </div>
                <div className='flex flex-col mx-2'>
                    <label className='font-semibold'>Course <span className='font-normal'> - abbvreviation</span></label>
                    <input value={value.course} onChange={(e) => {setValue({...value, course: e.target.value})}} type="text" placeholder='Ex.. BSCS' />
                </div>
                <div className='flex flex-col mx-2'>
                    <label className='font-semibold'>Year</label>
                    <input value={value.year} onChange={(e) => {setValue({...value, year: e.target.value})}} type="text" placeholder='Ex.. 2nd' />
                </div>
                <div className='flex flex-col mx-2'>
                    <label className='font-semibold'>Department <span className='font-normal'> - abbvreviation</span></label>
                    <input value={value.department} onChange={(e) => {setValue({...value, department: e.target.value})}} type="text" placeholder='Ex.. CED' />
                </div>
            </form>
            <div className='flex gap-2 mt-3'>
                <Link to="/home" className='bg-red-600 px-3 py-1 rounded-md text-white'>Back</Link>
                <button onClick={handleSubmit} className='bg-green-600 px-3 py-1 rounded-md text-white'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Edit