import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi"

function CommentLikeHandler({ comment }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    let [commentLikes, setCommentLikes] = useState()
    let [Like, setLike] = useState(length === 0)
    const [change, setChange] = useState()
    let [disLike, setDisLike] = useState()
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()

    useEffect(() => {
        setError("")
        try {
            if (comment) {
                axios({
                    method: 'GET',
                    url: `/api/v1/likes/commentlikes/${comment._id}`
                }).then(response => {
                    setCommentLikes(response.data.data)
                    if (userData) {
                        const likesarr = response.data.data.aggregateLikes
                        const commentLiked = likesarr.filter((likearr) => {
                            return userData.data._id === likearr.likedBy
                        })
                        if (commentLiked) {
                            setLike(commentLiked)
                        }
                    }
                })
                    .finally(() => setLoading(false))

            } else {
                navigate('/')
            }
        } catch (error) {
            setError("Something went wrong Try Refreshing...", error)
        }

    }, [userData, comment, navigate, loading, change])

    const LikeHandler = async () => {
        setError("")
        try {
            if (comment._id) {
                await axios.post(`/api/v1/likes/toggle/c/${comment._id}`)
                    .then(response => {
                        setChange(response.data.data)
                    })
            }
            if (change.deleteLike) {
                setDisLike(false)
            }
        } catch (error) {
            setError(error.response.statusText + ' ' + ':' + ' ' + "Login to Like/DisLike")
        }

    }
    if (error) {
        setTimeout(() => {
            setError(false)
        }, 5000)
    }

    const DislikeHandler = async () => {
        if (!userData) {
            setError("Unauthorized : Login to Like/DisLike")
        } else {
            setDisLike(disLike = !disLike)
        }
        if (Like.length > 0) {
            await axios.post(`/api/v1/likes/toggle/c/${comment._id}`)
                .then(response => {
                    setChange(response.data.data)
                })
        }
    }

    return !loading ? (
        <>
            {error && <p className=" text-[#f90909]  bg-gray-200 rounded-xl mt-1 mb-2 text-center text-lg font-mono">{error}</p>}
            <div className='flex flex-row'>
                <div className='flex mr-4'>
                    {
                        Like.length > 0 ? (
                            <button onClick={LikeHandler}
                                className="text-gray-500">
                                <BiSolidLike className='inline-block size-6' /> <span>{commentLikes.Likeslength}</span>
                            </button>) : <button onClick={LikeHandler}
                                className="text-gray-500 ">
                            <BiLike className='inline-block size-6' /> <span>{commentLikes.Likeslength}</span>
                        </button>

                    }
                </div>
                <div className='flex '>

                    {
                        !Like.length > 0 && disLike ? (
                            <button onClick={DislikeHandler}
                                className="text-gray-500">
                                <BiSolidDislike className='inline-block size-6' /> <span>{ }</span>
                            </button>) : <button onClick={DislikeHandler}
                                className="text-gray-500">
                            <BiDislike className='inline-block size-6' /> <span>{ }</span>
                        </button>
                    }

                </div>
            </div>



        </>
    ) : null
}

export default CommentLikeHandler