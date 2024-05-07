import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Input from '../../utilities/Input'
import Button from '../../utilities/Button'
import { BiLogIn } from "react-icons/bi";
import { RiVideoUploadFill } from "react-icons/ri";

function UploadVideo({ video }) {
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const userData = useSelector((state) => state.auth.userData);
    const authStatus = useSelector((state) => state.auth.status);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            userId: userData._id,
            title: video?.video.title || "",
            description: video?.video.description || "",
            thumbnail: video?.video.thumbnail.url || ""
        }
    })

    const submit = async (data) => {
        setError("")
        setLoading(true)
        try {
            if (video) {
                const file = data.thumbnail[0] ? await axios({
                    method: "PATCH",
                    url: `/api/v1/videos/${video.video._id}`,
                    data: {
                        'title': data.title,
                        'description': data.description,
                        'thumbnail': data.thumbnail[0]
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }) : null;
                if (file) {
                    const videoId = file.data.data.updatedvideoDetails._id
                    setLoading(false)
                    navigate(`/watch/${videoId}`);
                }
            } else {
                const videoData = await axios({
                    method: 'POST',
                    url: '/api/v1/videos/',
                    data: {
                        'title': data.title,
                        'description': data.description,
                        'thumbnail': data.thumbnail[0],
                        'videoFile': data.videoFile[0],
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                const videoId = videoData.data.data.videoPublish._id
                if (videoId) {
                    setLoading(false)
                    navigate(`/watch/${videoId}`)

                }

            }
        } catch (error) {
            setError(error.response.statusText + ' ' + 'Something went wrong')
        }
    }

    return loading ? (
        <div className="w-full h-[32rem] flex justify-center items-center ">
            <div className="w-1/3 h-1/3 rounded-xl text-center bg-gray-200 shadow-lg ">
                <div className="mt-6 animate-spin text-gray-700 text-4xl mb-3 duration-1000">&#9696;</div>

                <p className="text-lg text-gray-700 font-semibold">{video ? "Updating Video..." : "Uploading Video..."}</p>
                <p className="text-gray-500">{video ? "Please wait while we update your video" : "Please wait while we upload your video."}</p>
            </div>
        </div>
    ) : (
        authStatus ? (

            <div className='flex justify-center items-center w-full flex-col mt-3 '>
                {error && <p className=" text-[#f90909]  bg-gray-200 rounded-xl mt-1 mb-2 text-center text-lg font-mono">{error}</p>}
                <form encType='multipart/form-data' onSubmit={handleSubmit(submit)}
                    className="flex flex-col font-medium bg-gray-100 border border-black/10 rounded-xl p-4 ">
                        <RiVideoUploadFill className='mx-auto text-red-700 size-10 max-w-[100px] ' />
                        {!video ?
                            (<h1 className='font-bold rounded-xl text-center text-2xl mb-4 '>
                                Upload Video</h1>) : (
                                    <h1 className='font-bold rounded-xl text-center text-2xl mb-4'>
                                    Edit Video</h1>
                            )
                        }
                    <div className="w-80 px-2">
                        <textarea rows={3} cols={40}
                            placeholder="Title..."
                            className="mb-4 border border-gray-600 p-2 rounded-lg"
                            {...register("title", { required: true })}
                        />
                        <textarea rows={4} cols={50}
                            placeholder="Description..."
                            className="mb-4 border border-black p-2 rounded-lg"
                            {...register("description", { required: true })}

                        />
                    </div>
                    <div className=" px-2 flex flex-col w-full">
                        <Input
                            label="Thumbnail:"
                            type="file"
                            className="mb-4 "
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("thumbnail", { required: !video })}
                        />

                        {video && (
                            <div className="w-full mb-4">
                                <img
                                    src={video.video.thumbnail.url}
                                    alt={video.video.thumbnail}
                                    className="w-96 h-48 border border-black rounded-xl"
                                />
                            </div>
                        )}
                        {
                            !video &&
                            <Input
                                label="Videofile:"
                                type="file"
                                className="mb-4"
                                {...register("videoFile", { required: !video })}
                            />
                        }

                        <Button type="submit" className="w-fit m-auto bg-red-700 ">
                            {video ? "Update" : "Upload"}
                        </Button>
                    </div>
                </form>
            </div>
        ) : (
            <>
                <div className='w-full h-screen bg-gradient-to-r from-gray-200 to-gray-500'>
                    <div className='flex  justify-center '>
                        <BiLogIn className='text-7xl mt-10 mr-2' />
                        <h1 className='text-3xl font-bold mt-12'>Login to Upload Video</h1>
                    </div>
                    <div className='flex justify-center '>
                        <Link to={'/login'}>
                            <Button
                                type='button'
                                className='bg-red-700 rounded-lg'>
                                Login
                            </Button>
                        </Link>

                    </div>
                </div>

            </>
        )
    )
}




export default UploadVideo