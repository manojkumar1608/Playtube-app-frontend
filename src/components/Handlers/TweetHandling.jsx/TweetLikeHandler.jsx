import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi"
import axios from 'axios'

function TweetlikeHandler({ tweet }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    let [tweetLikes, setTweetLikes] = useState()
    let [Like, setLike] = useState(length === 0)
    const [change, setChange] = useState()
    let [disLike, setDisLike] = useState()
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()

    useEffect(() => {
        setError("")
        try {
            if (tweet) {
                axios({
                    method: 'GET',
                    url: `/api/v1/likes/tweetlikes/${tweet._id}`
                }).then(response => {
                    setTweetLikes(response.data.data)
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
            setError( "Something went wrong",error)
        }

    }, [userData, tweet, navigate, loading, change])

    const LikeHandler = async () => {
        setError("")
        try {
            if (tweet._id) {
                await axios.post(`/api/v1/likes/toggle/t/${tweet._id}`)
                    .then(response => {
                        const res = response.data.data
                        setChange(res)
                    })
                    if (res.deleteLike) {
                        setDisLike(false)
                    }
            }
        } catch (error) {
            setError( " Login to Like/DisLike")
        }

    }
    if (error) {
        setTimeout(() => {
            setError(false)
        }, 5000)
    }

    const DislikeHandler = async () => {
        if (!userData) {
            setError(" Login to Like/DisLike")
        } else {
            setDisLike(disLike = !disLike)
        }
        if (Like.length > 0) {
            await axios.post(`/api/v1/likes/toggle/t/${tweet._id}`)
                .then(response => {
                    setChange(response.data.data)
                })
        }
    }

    return !loading ? (
        <>
            <div className='flex flex-wrap'>
                <div className='flex mr-4'>
                    {
                        Like.length > 0 ? (
                            <button onClick={LikeHandler}
                            className="text-gray-500">
                                <BiSolidLike className='inline-block size-6' /> <span>{tweetLikes.Likeslength}</span>
                            </button>) : <button onClick={LikeHandler}
                                className="text-gray-500 ">
                            <BiLike className='inline-block size-6' /> <span>{tweetLikes.Likeslength}</span>
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
            
            
            {error && <p className ="mx-auto text-[#f90909] text-base bg-gray-200 rounded-md px-2 text-center font-mono">{error}</p>}
            
        </>
    ) : null
}

export default TweetlikeHandler