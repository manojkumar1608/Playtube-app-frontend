import axios from 'axios'
import React, { useEffect, useState } from 'react'
import VideoCard from '../../components/Handlers/VideoHandler/VideoCard'
import { useNavigate } from 'react-router-dom'
import Loadingpage from '../../components/utilities/Loadingpage'

function Videos({channelData}) {
    const [loading , setLoading] = useState(true)
    const [videos , setVideos] = useState([])
    const [error , setError] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        async function getuservideos(){
          
            try {
                const response = await axios({
                    method: 'POST',
                    url:'/api/v1/videos/user',
                    data:{
                        'userId': channelData._id
                    }
                })
                if(response){
            setVideos(response.data.data)
                }
        } catch (error) {
            setError(true)
            
        }
    }
    getuservideos()

    const Timeout = setTimeout(() =>{
        setLoading(false)
        },1500)
        return () => clearTimeout(Timeout) 

    },[channelData])
  return (
    videos?.length > 0 ?(
    <div className='flex flex-wrap '>
            {error && <p className='text-center text-3xl font-bold'>Something went wrong Try Refreshing</p>}
            {videos.map((item) => (
                loading ?(
                <div key={item._id} className=''>
                    <Loadingpage  {...item} />
                </div>):(
                <div key={item._id} className=''>
                    <VideoCard  {...item} />
                </div>)
            ))
}
            </div>):(
                loading ? (
                    <div className='h-screen bg-gray-50 '>
                        <p className='text-black font-bold text-3xl text-center  animate-pulse'> Loading... </p>
                    </div>
                ):(
                  <div className='w-full h-screen bg-gray-100 rounded-xl m-2 mr-2 mx-auto'>
                  <div className="flex flex-col items-center h-screen ">
             <img onClick={() => navigate('/uploadvideo')}
                            src="https://cdn-icons-png.flaticon.com/256/12679/12679422.png" alt="Nothing Found"
                            className="w-48 h-48 cursor-pointer hover:bg-gray-200 rounded-xl" />
                       <div className="text-2xl font-bold text-gray-700">Channel does not have any Videos</div>
            
           </div>
           </div>)
            )
        
  )
}

export default Videos