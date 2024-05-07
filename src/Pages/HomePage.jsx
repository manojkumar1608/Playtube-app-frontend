import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from '../components/Handlers/VideoHandler/VideoCard'
import Loadingpage from '../components/utilities/Loadingpage'

function HomePage() {
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState()
    const [videos, setVideos] = useState([])
    useEffect(() => {

        async function getVideos() {
            try {
                const response = await axios.get(`/api/v1/videos?page=${currentPage}`);
                const videodata = response.data.data;
                if (videodata) {
                    setVideos((prevVideos) => {
                        // Filter out videos that are already present
                        const filteredVideos = videodata.docs.filter(video => !prevVideos.some(prevVideo => prevVideo._id === video._id));
                        return [...prevVideos, ...filteredVideos];
                    });
                    setTotalPages(videodata.totalPages)
                }
            } catch (error) {
                setError("Something went wrong Try Refreshing")
            }

        }
        getVideos()

        const Timeout = setTimeout(() => {
            setLoading(false)
        }, 2000)
        return () => clearTimeout(Timeout)
    }, [currentPage])

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            if (!loading && currentPage < totalPages) {
                setCurrentPage(currentPage + 1)            }
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, currentPage, totalPages]);
    return (
        <>
            <div className='flex flex-wrap ml-3.5'>
                {error && <p className='text-gray-700 text-center text-3xl font-bold'>{error}</p>}
                {videos.map((video, index) => (
                    loading ? (
                        <div key={`loading-${index}`}>
                            <Loadingpage {...video} />
                        </div>) :
                        (<div key={`video-${video._id}`}>
                            <VideoCard  {...video} />
                        </div>)
                ))}
                 </div>


        </>
    )
}


export default HomePage