import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import HomePage from './HomePage';
import { RiDropdownList } from "react-icons/ri";
import Likehandler from '../components/Handlers/VideoHandler/Likehandler'
import CommentsHandler from '../components/Handlers/CommentsHandling/CommentsHandler'
import FollowHandler from '../components/Handlers/VideoHandler/FollowHandler'
import { useSelector } from 'react-redux';
import LoadingWatchPage from '../components/utilities/LoadingWatchPage';


function WatchPage() {
  const { videoId } = useParams()
  const navigate = useNavigate()
  let [loading, setLoading] = useState(true)
  let [video, setVideo] = useState(null)
  let [open, setOpen] = useState(false)
  let [error, setError] = useState()

  const userData = useSelector((state) => state.auth.userData)
  useEffect(() => {

    if (videoId) {
      axios({
        method: 'GET',
        url: `/api/v1/videos/${videoId}`,
      }).then((response) => {
        if (response) {
          const videoData = response.data.data.video
          setVideo(videoData)
        } else {
          navigate('/')
        }
      }).catch((error) => {
        setError("Something went wrong", error)
      })
    } else {
      navigate('/')
    }
    //updating video views// 
    if (userData && videoId) {
      axios.post(`/api/v1/videos/toggle/views/${videoId}`)
        .then((response) => {
        }).catch((error) => {
          setError("Failed to toggle", error)
        });
    }
    const Timeout = setTimeout(() =>{
      setLoading(false)
      },2000)

      return () => clearTimeout(Timeout);
    
  }, [videoId])

  const handledescription = () => {
    setOpen(open = !open)
  }
  return video && (
    <>
{
  loading ? (<LoadingWatchPage/>):(

      <div className='flex flex-col md:flex-row'>
        {/* Video Player Section */}
        <div className='flex flex-col md:w-47rem'>
          <video className='rounded-2xl mt-2 w-[47.7rem] h-auto md:h-[27rem]'
            key={video._id}
            controls preload="auto" >
            <source src={video.videoFile.url}
              type="video/mp4" />
          </video>
          <div className='text-sm'>
            <HomePage />
          </div>
        </div>

        {/* Video Information Section */}
        <div className='w-[24.8rem] mr-2  md:w-25rem p-2 border-2 border-gray-300 shadow-md mt-3 rounded-2xl'>
          <p className='p-2 overflow-hidden text-ellipsis font-bold text-xl bg-gray-100 rounded-xl'>
            {video.title}
          </p>

          <p className='mx-2 my-1 font-semibold text-gray-700'>{video.views} views • 2 days ago</p>

          <div onClick={handledescription}
            className='flex flex-row w-full my-3 bg-gray-200 rounded-xl text-lg font-bold shadow-md shadow-gray-300 hover:cursor-pointer'>
            <p className='w-80 ml-2 my-1'>Description</p>
            <RiDropdownList className='mt-2 ml-9 text-2xl' />
          </div>

          {open && (
            <div className='min-h-48 bg-gray-200 rounded-xl'>
              <p className='ml-2 p-2 mt-2 font-semibold'>{video.description}</p>
            </div>
          )}

          <div className='mt-3'>
            <FollowHandler video={video} />
            <div className='mt-1'>
              <Likehandler video={video} />
            </div>
          </div>

          <div className='m-2 mt-4'>
            <CommentsHandler video={video} />
          </div>
        </div>
      </div>)
}


    </>

  )


}

export default WatchPage