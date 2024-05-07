import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../../utilities/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
function Likehandler({ video }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  let [videoLikes, setvideoLikes] = useState()
  let [Like, setLike] = useState(length === 0)
  const [change, setChange] = useState()
  let [disLike, setDisLike] = useState()
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()


  useEffect(() => {
    setError("")
    try {
      if (video) {
        axios({
          method: 'GET',
          url: `/api/v1/likes/likes/${video._id}`
        }).then(response => {
          setvideoLikes(response.data.data)
          if (userData) {
            const likesarr = response.data.data.aggregateLikes
            const Liked = likesarr.filter((likearr) => {
              return userData.data._id === likearr.likedBy
            })
            if (Liked) {
              setLike(Liked)
            }
          }
        })
          .finally(() => setLoading(false))

      } else {
        navigate('/')
      }
    } catch (error) {
      setError(error.response.statusText + ":" + "Something went wrong")
    }

  }, [userData, video, navigate, loading, change])

  const LikeHandler = async () => {
    setError("")
    try {
      if (video._id) {
        await axios.post(`/api/v1/likes/toggle/v/${video._id}`)
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
      await axios.post(`/api/v1/likes/toggle/v/${video._id}`)
        .then(response => {
          setChange(response.data.data)
        })
    }
  }

  return !loading ? (
    <>
      {error && <p className=" text-[#f90909]  bg-gray-200 rounded-xl mt-1 mb-2 text-center text-lg font-mono">{error}</p>}
      <div className='flex flex-row'>
        <div className='flex mt-2 ml-2 bg-gray-800 border-r rounded-full'>
          {
            Like.length > 0 ? (
              <Button onClick={LikeHandler}
                className='flex bg-gray-800 rounded-r-xl hover:bg-gray-500'>
                <BiSolidLike className='text-2xl ' />
                <h2 className='font-medium ml-2 '>{videoLikes.Likeslength}</h2>
              </Button>) : <Button onClick={LikeHandler}
                className=' flex bg-gray-800 rounded-r-xl hover:bg-gray-500'>
              <BiLike className='text-2xl ' />
              <h2 className='font-medium ml-1 '>{videoLikes.Likeslength}</h2>
            </Button>

          }
        </div>
        <div className='flex  mt-2  bg-gray-800  rounded-full '>

          {
            !Like.length > 0 && disLike ? (
              <Button onClick={DislikeHandler}
                className=' flex bg-gray-800 rounded-l-xl hover:bg-gray-500'>
                <BiSolidDislike className='text-2xl' />
              </Button>) : <Button onClick={DislikeHandler}
                className=' flex bg-gray-800 rounded-l-xl hover:bg-gray-500'>
              <BiDislike className='text-2xl' />
            </Button>
          }

        </div>
      </div>



    </>
  ) : null
}

export default Likehandler