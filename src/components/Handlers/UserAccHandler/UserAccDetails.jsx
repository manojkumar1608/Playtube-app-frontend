import React from 'react'
import { RiImageEditFill } from "react-icons/ri";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Input from '../../utilities/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function UserAccDetails({ channelData }) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: channelData?.username,
            fullName: channelData?.fullName,
            email: channelData?.email
        }
    })
    const navigate = useNavigate()
    const cuurentuser = useSelector((state) => state.auth.userData)
    const [showModal, setShowModal] = useState(false);

    const Submit = async (data) => {
        const response = await axios({
            method: 'PATCH',
            url: '/api/v1/users/update-account',
            data: {
                'username': data.username,
                'fullName': data.fullName,
                'email': data.email
            },
          
        })
        if (response) {
            if(response){
                setShowModal(false)
                const username = response.data.data.username
                navigate(`/user/${username}`)
                window.location.reload()
        }
        }
    }
    return channelData && (
        <div className=''>
            <div className='flex flex-row'>
                <p className=" text-3xl font-bold ">{channelData?.username}   </p>
                {
                    channelData?._id === cuurentuser?.data?._id &&
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