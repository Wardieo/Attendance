import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import bg from '../assets/shelf.jpg'
import { Link } from 'react-router-dom'


const Home = () => {
    const [auth, setAuth] = useState(false)
    const [student, setStudent] = useState([])
    const [name, setName] = useState('')
    const [message , setMessage] = useState('')
    const [search, setSearch] = useState('')

    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get('http://localhost:3001/student',)
        .then((response) => setStudent(response.data))
        .catch((err) => console.log(err));
    }, [])

    const handleDelete = (id) => {
        Axios.delete('http://localhost:3001/delete/'+id)
        .then(res => {
            console.log(res)
            window.location.reload();
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/')
        .then(res => {
            if(res.data.Status === "Success") {
                setAuth(true);
                setName(res.data.name);
            }else {
                setAuth(false);
                setMessage(res.data.Message)    
            }
        })
    })

    const handleLogout = () => {
        Axios.get('http://localhost:3001/logout')
        .then(res => {
            if(res.data.Status === "Success"){
                window.location.reload(true);
            }else{
                alert("error")
            }
        }).catch(err => console.log(err))
    }
  return (
    <div style={{'background-image': `url(${bg})`}} className='w-full flex flex-col items-center justify-center h-screen bg-no-repeat bg-center bg-cover'>
        {
            auth ? 
            <div className='bg-white max-h-[500px] overflow-x-hidden overflow-scroll rounded-lg px-3 pb-4'>
                <div className='flex justify-between gap-4 py-4 px-2 items-center'>
                    <h1 className='text-2xl font-bold'>Student Information</h1>
                    <input type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)} className='border-b-2 focus:outline-0'/>
                    <div className='flex gap-4'>
                        <button onClick={handleLogout} className='bg-red-700 px-3 py-1 rounded-md text-white'>Logout</button>
                        <Link to="/create" className='bg-green-700 px-3 py-1 rounded-md text-white'>Add +</Link>
                    </div>
                </div>
                <table className=''>
                    <thead className='border-b-2'>
                        <tr>
                            <th className='px-2'>Usn</th>
                            <th className='px-2'>Name</th>
                            <th className='px-2'>Course</th>
                            <th className='px-2'>Year</th>
                            <th className='px-2'>Department</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {student.filter((each) => {
                            if(search === ''){
                                return each;
                            } else if(each.name.toLowerCase().includes(search.toLowerCase())) {
                                return each;
                            } else if(each.department.toLowerCase().includes(search.toLowerCase())) {
                                return each;
                            } else if(each.year.toLowerCase().includes(search.toLowerCase())) {
                                return each
                            }
                        }).map((each, index) => {
                            return (
                                <tr key={index}>
                                    <td className='px-3'>{each.student_info_id}</td>
                                    <td className='px-3'>{each.name}</td>
                                    <td className='px-3'>{each.course}</td>
                                    <td className='px-3'>{each.year}</td>
                                    <td className='px-3'>{each.department}</td>
                                    <td className='flex gap-4 my-1'>
                                        <Link to={`/edit/${each.student_info_id}`} className='bg-green-600 px-3 py-1 rounded-md text-white'>Edit</Link>
                                        <button onClick={() => handleDelete(each.student_info_id)} className='bg-red-500 px-3 py-1 rounded-md text-white'>Delete</button>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>
            :
            <div className='bg-white p-4 rounded-lg shadow-xl'>
            <h2 className='border-b-2 text-2xl font-bold py-4'>You are not yet logged in</h2>
                <div className='w-10 mt-4'>
                    <Link to='/login' className='bg-green-600 px-3 py-1 rounded-md text-white'>Login</Link >
                </div>
            </div>
        }
    </div>
  )
}

export default Home