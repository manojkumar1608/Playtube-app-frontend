import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import VideoCard from '../../components/Handlers/VideoHandler/VideoCard'
import { BiLogIn } from "react-icons/bi";
import { Link } from 'react-router-dom';
import Button from '../../components/utilities/Button';
import Loadingpage from '../../components/utilities/Loadingpage';
function FollowingVideosPage() {
  const [videos, setVideos] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)
  const userData = useSelector((state) => state.auth.userData)
  useEffect(() => {
    async function getfollowingChannels() {
      try {
        const response = await axios({
          method: 'POST',
          url: '/api/v1/subscriptions/s/:channelId',
          data: {
            'channelId': userData.data._id
          }
        })
        if (response) {
          const Following = response.data.data
          const map = Following.map((follow) => (
            axios({
              method: 'POST',
              url: '/api/v1/videos/user',
              data: {
                'userId': follow._id
              }
            }).then(response => {
              setVideos(response.data.data)
            }

            ).catch((error) => {
              setError('Something went wrong Try Refreshing')

            })
          ))
        }
      } catch (error) {
        setError('Something went wrong Try Refreshing')
      }
    }
    getfollowingChannels()

    const Timeout = setTimeout(() => {
      setLoading(false)
  }, 2000)
  return () => clearTimeout(Timeout)

  }, [])
  return userData ?(
    <div className='flex flex-wrap'>
      {error && <p className='text-center text-3xl font-bold'>{error}</p>}
      {
        videos.length > 0 ?(
      videos.map((item) => (
        loading ? (
          <div key={item._id} className=''>
          <Loadingpage {...item} />
        </div>
        ):
        <div key={item._id} className=''>
          <VideoCard {...item} />
        </div>
      ))):
          loading ? (
            <div className='h-screen bg-gray-50 mx-auto mt-4'>
                    <p className='text-black font-bold text-3xl text-center animate-pulse'> Loading... </p>
                </div>
          ):
        <div className='w-full h-screen bg-gray-100 rounded-xl m-2 mr-2 mx-auto'>
           <div className="flex flex-col items-center justify-center h-screen ">
      <div className="text-4xl font-bold mb-4 text-gray-700">Nothing to show here</div>
      <img src="https://cdn-icons-png.flaticon.com/128/3893/3893258.png" alt="Nothing Found" className="w-64 h-64 mb-4" />
      <div className="text-2xl font-semibold text-gray-700">Start following channels to get your Recommendations</div>
    </div>
    </div>
        
        
      }

    </div>
  ):(
    <div className='w-full h-screen bg-gradient-to-r from-gray-200 to-gray-500'>
    <div className='flex  justify-center '>
        <BiLogIn className='text-7xl mt-10 mr-2' />
        <h1 className='text-3xl font-bold mt-12'>Login to get Following Videos</h1>
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
  )
}

export default FollowingVideosPage