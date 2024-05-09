import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../../store/authSlice'
import Button from '../utilities/Button'
import Input from '../utilities/Input' 
import Logo  from '../Header/Logo'
import {useDispatch, useSelector} from "react-redux"
import {useForm} from "react-hook-form"
import axios from "axios"

function Login() {
    const authstatus = useSelector(state =>state.auth.status)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    
 

    const login = async(data) => {
        setError("")
       setLoading(true)
        try {
            const session = await axios({
                method: 'POST',
                url:'https://playtube-app-backend.onrender.com/api/v1/users/login',
                data: {
                    'email': data.email,
                    'password': data.password
                },
                withCredentials:true
            })      
            if (session) {
                localStorage.setItem('accessToken', session.data.data.accessToken);
                localStorage.setItem('refreshToken', session.data.data.refreshToken);
                const userData  = await axios({
                    method: 'GET',
                    url:'https://playtube-app-backend.onrender.com/api/v1/users/current-user',
                    withCredentials:true
            })
                if(userData){
                    dispatch(authLogin(userData.data))
                }
                navigate("/") 
            }
        } catch (error) {
            setError(error.response.status)
        } finally {
        setLoading(false)
        }
    }
    if(error && error === 400){
        const  err = "username or email is required"
        setError(err) 
    }
   
    if(error && error === 404){
        const  err = "User does not exist"
        setError(err) 
    }
     if(error && error === 401){
        const  err = "Invalid user credentials"
        setError(err) 
    }
     if(error && error === 500){
        const  err = "Something went wrong please try again later"
        setError(err) 
    }

  return loading ? (
  <div className="w-full h-[32rem] flex justify-center items-center ">
  <div className="w-1/3 h-1/3 rounded-xl text-center bg-gray-200 shadow-lg ">
      <div className="mt-6 animate-spin text-gray-700 text-4xl mb-3 duration-1000">&#9696;</div>

      <p className="text-lg text-gray-700 font-semibold">Fetching your details...</p>
      <p className="text-gray-500">Please wait while we fetch your details</p>
  </div>
</div>):
    <div
    className='flex items-center justify-center w-full mt-2'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  
}

export default Login