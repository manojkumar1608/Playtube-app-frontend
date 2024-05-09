import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RiImageEditFill } from "react-icons/ri";
import { useForm } from 'react-hook-form';
import axios from 'axios';

function UserCoverImage({ channelData, onUpdate }) {
    const currentuser = useSelector((state) => state.auth.userData)
    const coverImage = channelData?.coverImage.url;
    const { register, handleSubmit } = useForm()
    const [profilePic, setProfilePic] = useState(coverImage);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const Submit = async (data) => {
        try {
            const response = await axios({
                method: 'PATCH',
                url: 'https://playtube-app-backend.onrender.com/api/v1/users/cover-Image',
                data: {
                    'coverImagefile': data.coverImage[0]
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (response) {
                setShowModal(false)
                onUpdate(response.data.data)
            }

        } catch (error) {
            setError("Something went wrong while updating coverImage")

        } finally {
            setLoading(false)
        }
    }
    if (error) {
        setTimeout(() => {
            setError(false)
        }, 5000)
    }

    return loading ? (
        <div className='fixed top-0 mx-auto left-0 w-full h-full z-50 bg-opacity-70 bg-gray-600 '>
            <div className="w-full h-[32rem] flex justify-center items-center ">
                <div className="w-1/3 h-1/3 rounded-xl text-center bg-gray-200 shadow-lg ">
                    <div className="mt-6 animate-spin text-gray-700 text-4xl mb-3 duration-1000">&#9696;</div>

                    <p className="text-lg text-gray-700 font-semibold">Updating your coverImage </p>
                    <p className="text-gray-500">Please wait while we update your coverImage</p>
                </div>
            </div>
        </div>) :
        <div>
            {error && <p className=" text-[#f90909]  bg-gray-200 rounded-xl mt-1 mb-2 text-center text-lg font-mono">{error}</p>}

            {channelData?.coverImage &&
                <div className='relative'>
                    <div className='w-[67rem] h-40 mx-11 mt-2 mb-1 rounded-xl border border-gray-200'>
                        <img className="object-cover w-full h-full rounded-xl z-10"
                            src={channelData?.coverImage.url} alt="Cover" />
                        {
                            channelData?._id === currentuser?.data?._id &&
                            <div onClick={() => setShowModal(true)}
                                className='absolute right-16 -bottom-1 rounded-xl cursor-pointer bg-gray-100 hover:bg-gray-200 z-20'>
                                <img className='size-12 '
                                    src="https://cdn-icons-png.flaticon.com/128/8350/8350435.png" alt={<RiImageEditFill className='size-9' />} />
                            </div>
                        }
                    </div>
                </div>
            }

            {showModal && (

                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <form encType='multipart/form-data' onSubmit={handleSubmit(Submit)}>
                            <img
                                className='size-16 mx-auto rounded-lg'
                                src={profilePic} />
                            <h2 className="text-lg font-semibold mb-3 mt-2">Change Cover-Image</h2>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("coverImage", { required: true })}
                                onChange={handleFileChange}
                                className="py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer"
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


}
export default UserCoverImage