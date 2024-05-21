import React, { useState } from 'react'
import bg from '../assets/shelf.jpg'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
const Login = () => {
    const [value, setValue] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://127.0.0.1:5000/login', value)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/home')
            }else{
                alert(res.data.Message)
            }
        })
        .catch(err => console.log(err))
    }

    return (
    <div style={{'background-image': `url(${bg})`}} className=' w-full flex flex-col items-center justify-center h-screen bg-no-repeat bg-center bg-cover'>
        <div className='bg-white p-4 rounded-lg shadow-xl'>
            <h2 className='border-b-2 text-2xl font-bold py-4'>Login</h2>
            <form onSubmit={handleSubmit} className='grid pt-3 w-96'>
                <div className='flex flex-col'>
                    <label className='font-semibold'>Email</label>
                    <input value={value.email} required onChange={(e) => setValue({...value, email: e.target.value})} type="text" placeholder='Enter the email' className="text-gray-700 border-b-2 " />
                </div>
                <div className='flex flex-col mt-2'>
                    <label className='font-semibold'>Password</label>
                    <input value={value.password} required onChange={(e) => {setValue({...value, password: e.target.value})}} type="password" placeholder='Enter the password' className="text-gray-700 border-b-2 "/>
                </div>
                <div className='w-10 mt-4'>
                    <button className='bg-green-600 px-3 py-1 rounded-md text-white'>Login</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Login