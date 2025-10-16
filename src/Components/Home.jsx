import React from 'react'
import { useSelector } from 'react-redux'
import { isLogin } from '../store/slice/authSlice'


function Home() {
  const islogin=useSelector(isLogin)

  return (
    <div className='text-2xl font-semibold'>
        {islogin===true ?(<h1>Showing all Data</h1>):(<h1>Login to see data!!!</h1>)}
    </div>
  )
}

export default Home