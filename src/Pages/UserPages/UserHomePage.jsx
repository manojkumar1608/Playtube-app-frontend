import axios from 'axios'
import React, { useEffect, useState } from 'react'
import VideoCard from '../../components/Handlers/VideoHandler/VideoCard'
import Loadingpage from '../../components/utilities/Loadingpage'
import { useNavigate } from 'react-router-dom'
import TweetCard from '../../components/Handlers/TweetHandling.jsx/TweetCard'
import LoadingTweetCard from '../../components/utilities/LoadingTweetCard'
function UserHomePage({ channelData }) {
    const [loading, setLoading] = useState(true)
    const [videos, setVideos] = useState([])
    const [tweets, setTweets] = useState([])
    const [error, setError] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        async function getuservideos() {
            try {
                const response = await axios({
                    method: 'POST',
                    url: '/api/v1/videos/user',
                    data: {
                        'userId': channelData?._id
                    }
                })
                if (response) {
                    setVideos(response.data.data)
                }
            } catch (error) {
                setError("Something went wrong")

            }
        }
        getuservideos()
        async function getUserTweets() {
            try {
                const response = await axios.get(`/api/v1/tweets/user/${channelData._id}`)
                const tweetsData = response.data.data

                if (tweetsData) {
                    setTweets(tweetsData)
                }
            } catch (error) {
                setError(error)
            }
        }
        getUserTweets()

        const Timeout = setTimeout(() => {
            setLoading(false)
        }, 1500)
        return () => clearTimeout(Timeout)

    }, [channelData])

    return (
        videos?.length > 0 || tweets.length > 0 ? (
            <div className='flex flex-col'>
                <div className='flex flex-wrap '>
                    {error && <p className='text-center text-3xl font-bold'>{error}</p>}
                    {videos.map((item) => (
                        loading ? (
                            <div key={item._id} className=''>
                                <Loadingpage  {...item} />
                            </div>) : (
                            <div key={item._id} className=''>
                                <VideoCard  {...item} />
                            </div>
                        )
                    ))
                    }
                </div>
                <hr className='bg-gray-600 mb-2' />
                {tweets?.length > 0 &&
                    <p className='ml-10  font-bold text-xl'>Tweets</p>
                }
                <div className='flex flex-wrap justify-start ml-12'>

                    {tweets.map((item) => (
                        loading ? (
                            <div key={item._id} className='w-[30rem] m-3'>
                                <LoadingTweetCard tweet={item} />
                            </div>) : (
                            <div
                                key={item._id} className='w-[30rem] m-3 border rounded-xl'>
                                <TweetCard tweet={item} />
                            </div>)
                    ))
                    }
                </div>
            </div>
        ) : (
            loading ? (
                <div className='h-screen bg-gray-50'>
                    <p className='text-black font-bold text-3xl text-center animate-pulse'> Loading... </p>
                </div>
            ) : (
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

export default UserHomePage