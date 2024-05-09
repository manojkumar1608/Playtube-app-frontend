import React from 'react'
import { RiImageEditFill } from "react-icons/ri";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Input from '../../utilities/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function UserAccDetails({ channelData , onUpdate}) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: channelData?.username,
            fullName: channelData?.fullName,
            email: channelData?.email
        }
    })
    const navigate = useNavigate()
    const currentuser = useSelector((state) => state.auth.userData)
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const Submit = async (data) => {
        setError("")
        setLoading(true)
       try {
         const response = await axios({
             method: 'PATCH',
             url: 'https://playtube-app-backend.onrender.com/api/v1/users/update-account',
             data: {
                 'username': data.username,
                 'fullName': data.fullName,
                 'email': data.email
             },
             withCredentials: true
           
         })
         if (response) {
             if(response){
                 setShowModal(false)
                 const username = response.data.data.username
                 navigate(`/user/${username}`)
                 onUpdate(response.data.data)
         }
         }
       } catch (error) {
        setError("Something went wrong while updating your details")
       } finally {
        setLoading(false)
       }
    }
    return loading ? ( <div className="w-full h-[32rem] flex justify-center items-center ">
    <div className="w-1/3 h-1/3 rounded-xl text-center bg-gray-200 shadow-lg ">
      <div className="mt-6 animate-spin text-gray-700 text-4xl mb-3 duration-1000">&#9696;</div>

      <p className="text-lg text-gray-700 font-semibold">Updating your details </p>
      <p className="text-gray-500">Please wait while we update your account details</p>
    </div>
  </div>):
     channelData && (
        <div className=''>
             {error && <p className=" text-[#f90909]  bg-gray-200 rounded-xl mt-1 mb-2 text-center text-lg font-mono">{error}</p>}
            <div className='flex flex-row'>
                <p className=" text-3xl font-bold ">{channelData?.username}   </p>
                {
                    channelData?._id === currentuser?.data?._id &&
                    <div className='cursor-pointer hover:bg-gray-100 rounded-xl ' onClick={() => setShowModal(true)}>
                   <img className='size-9 ml-3 mr-2 mt-0.5'
                    src="https://cdn-icons-png.flaticon.com/128/2807/2807960.png" alt={<RiImageEditFill className='size-8'/>} />
                        </div>
                }
            </div>
            <h2 className="text-xl mb-1.5 font-semibold text-gray-400">@{channelData?.fullName} • {channelData?.email}</h2>
            <p className='font-semibold text-gray-400 ml-1'>Followers {channelData?.subscribersCount} • Following {channelData?.channelsSubscribedToCount}</p>

            {showModal && (

<div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <form encType='multipart/form-data' onSubmit={handleSubmit(Submit)}>
            
            <h2 className="text-lg font-semibold mb-3 mt-2 mx-20 text-center border-b border-gray-300 ">Update Your Details</h2>
            <Input
                type="text"
                label = "Username:"
                placeholder="Enter your username..."
                {...register("username", { required: true })}
                className="py-2 px-4 m-1 rounded-lg "
            />
            <Input
                type="text"
                label = "Fullname:"
                placeholder="Enter your fullname..."
                {...register("fullName", { required: true })}
                className="py-2 px-4 m-1 rounded-lg "
            />
            <Input
                type="text"
                label = "Email:"
                placeholder="Enter your email..."
                {...register("email", { required: true })}
                className=" py-2 px-4 m-1 rounded-lg cursor-pointer"
            />
            <div className='flex flex-row justify-between'>
                <button
                    className="mt-4 py-2 px-4 bg-red-700 text-white rounded-lg cursor-pointer"
                    onClick={() => setShowModal(false)} // Close modal when cancel button is clicked
                >
                    Cancel
                </button>
                <button
                    className="mt-4 py-1.5 px-4 bg-green-700 text-white rounded-lg cursor-pointer"
                    type='submit'
                >
                    Update
                </button>
            </div>
        </form>
    </div>
</div>
)}





        </div>
    )
}

export default UserAccDetails