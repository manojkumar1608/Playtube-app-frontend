import React from 'react'
import { Link } from 'react-router-dom'


function Logo() {
  return (
    <Link 
    className="flex flex-row " to={'/'} >
    <img className='h-[2rem] '
        src="https://cdn-icons-png.flaticon.com/512/8894/8894556.png" alt="videoTube" />
    <h3 className='font-bold mt-0.5 text-lg' >PlayTube</h3>
    </Link> 
  )
}

export default Logo