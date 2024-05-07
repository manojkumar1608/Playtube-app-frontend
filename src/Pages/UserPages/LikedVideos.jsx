import axios from 'axios'
import React, { useEffect, useState } from 'react'
import VideoCard from '../../components/Handlers/VideoHandler/VideoCard';
import { useSelector } from 'react-redux';
import { BiLogIn } from "react-icons/bi";
import { Link } from 'react-router-dom';
import Button from '../../components/utilities/Button';
import Loadingpage from '../../components/utilities/Loadingpage';

function LikedVideos() {
    const userData = useSelector((state)=> state.auth.userData)
    const [videos , setVideos] = useState([])
    const [error , setError] = useState()
    const [loading , setLoading] = useState(true)
    useEffect(() =>{
        async function getLikedVideos() {
            try {
                if(userData){
                    const response = await axios.get('/api/v1/likes/L/videos')
                
                if(response){
                    const videos = response.data.data.videos
                    const result = videos.filter((video)=>{ //filtering video objects which are empty in the response array
                        return video.videos
                    })
                setVideos(result)

                }else{
                    setError("Something went wrong while fetching videos TRY REFRESHING")
                }
            }
            } catch (error) {
                setError("Something went wrong while fetching videos TRY REFRESHING")
            }
            
        }
    
        getLikedVideos()

        const Timeout = setTimeout(() => {
            setLoading(false)
        }, 2000)
        return () => clearTimeout(Timeout)

    },[])
  return userData ? (
    <> 
     { videos?.length > 0 &&
        <header className="bg-gradient-to-t from-gray-200 to-gray-300 text-white py-2 rounded-lg mt-1">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl text-gray-700 font-bold">Your Liked videos</h1>
      </div>
    </header>
}
    {
        videos?.length === 0  ?(
        loading ? (
            <div className='h-screen bg-gray-50 '>
            <p className='text-black font-bold text-3xl text-center  animate-pulse'> Loading... </p>
        </div>
        ):(
        <div className='w-full h-screen bg-gray-100 rounded-xl m-2 mr-2 mx-auto'>
        <div className="flex flex-col items-center justify-center h-screen ">
   <div className="text-4xl font-bold mb-4 text-gray-700">Nothing to show here</div>
   <img src="https://cdn-icons-png.freepik.com/256/4712/4712850.png?ga=GA1.1.136363513.1709819991&semt=ais_hybrid" alt="Nothing Found" className="w-64 h-64 mb-4" />
   <div className="text-2xl font-semibold text-gray-700">Start Liking Videos to get your liked videos</div>
 </div>
 </div>)
  ):(

    <div className='flex flex-wrap'>
            {error && <p className='text-center text-3xl font-bold'>{error}</p>}
            
            {videos.map((item) => (
                loading ?(
                    <div key={item.videos._id} className=''>
                    <Loadingpage {...item.videos} />
                </div>
                ):(
                <div key={item.videos._id} className=''>
                    <VideoCard {...item.videos} />
                </div>)
            ))}
</div>)
}
            </>
            ):(
                <div className='w-full h-screen bg-gradient-to-r from-gray-200 to-gray-500'>
                <div className='flex  justify-center '>
                    <BiLogIn className='text-7xl mt-10 mr-2' />
                    <h1 className='text-3xl font-bold mt-12'>Login to get Liked Videos</h1>
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

export default LikedVideos