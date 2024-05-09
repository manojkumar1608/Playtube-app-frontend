import React, {useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../../store/authSlice'
import Logo from '../Header/Logo'
import Button from '../utilities/Button'
import Input from '../utilities/Input'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { MdErrorOutline } from "react-icons/md";
function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {register, handleSubmit } = useForm()

    const create = async(data) => {
        setError("")
        setLoading(true)
        try {
            const userData = await axios({
                method: 'POST',
                url:'https://playtube-app-backend.onrender.com/api/v1/users/register',
                data:{
                    'username': data.username,
                    'fullName': data.fullName,
                    'email': data.email,
                    'avatar': data.avatar[0],
                    'coverImage': data.coverImage[0],
                    'password': data.password,
                },
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true, 
            })
            if (userData) {
                dispatch(login(userData.data));
                navigate("/login")
            }
        } catch (error) {
            setError("error")
        } finally{
        setLoading(false)
    }
    }
    if(error && error === 409){
        const  err = "user with same username or email already exists"
        setError(err) 
    } 
    if(error && error === 400){
        const err = "Avatar file is required or Something went wrong" 
        setError(err)
    }
    if(error && error === 500){
        const err = "Something went wrong" 
        setError(err)
    }

  return loading ?(
  <div className="w-full h-[32rem] flex justify-center items-center ">
  <div className="w-1/3 h-1/3 rounded-xl text-center bg-gray-200 shadow-lg ">
      <div className="mt-6 animate-spin text-gray-700 text-4xl mb-3 duration-1000">&#9696;</div>

      <p className="text-lg text-gray-700 font-semibold">Creating an account for you.....</p>
      <p className="text-gray-500">Please wait while we create your account</p>
  </div>
</div>):
    <div className="flex items-center justify-center w-full mt-2">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className=" text-[#f90909]  bg-gray-200 rounded-xl mt-6 mb-2 text-center text-lg font-mono">
                    <MdErrorOutline className='inline-block text-3xl'/> {error}</p>}

                <form id='myform' onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Username : "
                        placeholder="Enter your username"
                        {...register("username", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Fullname : "
                        placeholder="Enter your full name"
                        {...register("fullName", {
                            required: true,
                        }
                        )}
                        
                        />
                        <Input
                        label="Email : "
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
                        type='file'
                        className=''
                        label="Avatar : "
                        {...register("avatar", {
                            required: true,
                            
                        })}
                        />
                        <Input
                        type='file'
                        label="CoverImage : "
                        {...register("coverImage", {
                            required:false,
                        })}
                        />

                        <Input
                        label="Password : "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  
}

export default Signup