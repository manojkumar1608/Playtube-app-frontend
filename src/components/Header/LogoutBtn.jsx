import React from 'react'
import {logout as authlogout} from '../../store/authSlice'
import axios from 'axios'
import  { useDispatch }  from 'react-redux'
import { useNavigate }  from 'react-router-dom'
import Button from '../utilities/Button'
function  LogoutBtn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const logoutHandler = async()=>{
      const res = await axios.post('/api/v1/users/logout')
      if(res)
        dispatch(authlogout())
      navigate('/')
    }

  return (
    <div className=''>
               
      <Button onClick={logoutHandler}
         className='w-24 text-gray-200 border bg-gradient-to-t from-red-800 to-gray-950 rounded-xl font-bold'>Logout

        </Button>

  </div>
  )
}

export default LogoutBtn