import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TweetCard from '../components/Handlers/TweetHandling.jsx/TweetCard'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BiLogIn } from "react-icons/bi";
import Button from '../components/utilities/Button'
import LoadingTweetCard from '../components/utilities/LoadingTweetCard'

function TweetsPage() {
    const userData = useSelector((state) => state.auth.userData)
    const { register, handleSubmit, reset, watch, formState } = useForm();
    const { errors, isDirty, isValid } = formState;


    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [update, setUpdate] = useState()
    const [tweets, settweets] = useState([])
    const [error, setError] = useState()

    useEffect(() => {
        async function gettweets() {
            try {
                const response = await axios.get(`/api/v1/tweets?page=${currentPage}`)
                const tweetsData = response.data.data
                if (tweetsData) {
                    settweets((prevTweets) => {
                        const tweetIdMap = new Map(tweetsData.docs.map(tweet => [tweet._id, tweet]));

                        // Filter out tweets from prevTweets that are already present in tweetsData.docs
                        const existingTweets = prevTweets.filter(tweet => !tweetIdMap.has(tweet._id));

                        // Concatenate tweets from tweetsData.docs with the remaining tweets from prevTweets
                        const updatedTweets = [...tweetsData.docs, ...existingTweets];

                        return updatedTweets;
                    });
                    setTotalPages(tweetsData.totalPages)

                }
            } catch (error) {
                setError(error)
            }
        }
        gettweets()
        const Timeout = setTimeout(() => {
            setLoading(false)
        }, 1500)
        return () => clearTimeout(Timeout);

    }, [currentPage, update])

    const handleDelete = async (deletedTweet) => {
        try {
            // Delete the tweet from the backend
            const deletedData = await axios.delete(`/api/v1/tweets/${deletedTweet._id}`);
            // Update the state with the deleted tweet removed
            if (deletedData) {
                settweets(prevTweets => prevTweets.filter(tweet => tweet._id !== deletedTweet._id));
            }

        } catch (error) {
            setError("Error deleting tweet:", error);
        }
    };

    const handleScroll = () => {
        const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100; // Adjust the offset as needed
        if (scrolledToBottom) {
            if (!loading && currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, currentPage, totalPages]);

    const handleTweetUpdate = (updatedTweets) => {
        setUpdate(updatedTweets);
    }
    const onFormSubmit = (data) => {
        if (userData) {
            axios({
                method: 'POST',
                url: '/api/v1/tweets/',
                data: {
                    'content': data.tweetContent
                }
            }).then(response => {
                if (response) {
                    setUpdate(response.data.data)
                    reset();
                }
            }).catch(error => {
                setError("Failed to update tweet", error)
            })
        } else {
            setError("Login to Tweet your Thoughts")
        }
    }
    if (error) {
        setTimeout(() => {
            setError(false)
        }, 4000)
    }
    return (
        <>
            <div className="w-[30rem] mx-auto bg-gray-200  min-h-screen mt-3">
                {/* Navbar */}
                <nav className="bg-gray-200 fixed w-[30rem] top-[4rem] shadow-lg p-4 flex justify-between rounded-lg items-center">
                    <a href="/Tweets" className="text-blue-400 text-2xl font-bold">Twitter</a>
                    <Link to={`/user/${userData?.data.username}`} >
                        <div className='flex flex-row mt-1 -mr-4'>
                            <img src={userData ?
                                (userData.data.avatar.url) : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"}
                                alt="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                                className="w-10 h-10 rounded-full border border-gray-300" />
                            <h2 className='mt-1 mx-2 mr-3 text-lg font-semibold'>
                                {userData ? (
                                    userData.data.username) :
                                    "Username"}</h2>
                        </div>
                    </Link>

                    {/* Twitter Logo */}
                    {/* Search Bar */}
                    {/* <div className="flex items-center bg-gray-200 rounded-lg px-2 py-1">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m4-6a8 8 0 11-16 0 8 8 0 0116 0z"></path>
                        </svg>
                        <input type="text" placeholder="Search Twitter" className="outline-none bg-transparent placeholder-gray-500" />
                    </div> */}
                    {/* Profile Avatar */}

                </nav>

                {/* Main Content */}
                <div className="container mx-auto p-4 mt-14">
                    {/* Tweet Composer */}
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className=" bg-white shadow-md rounded-lg p-4 mb-4">
                            <textarea
                                {...register("tweetContent", { required: "Tweet content is required" })}
                                className="w-full border-none outline-none resize-none" rows="3" placeholder="What's happening?">

                            </textarea>

                            {errors.tweetContent && (
                                <p className="text-red-500 text-sm">{errors.tweetContent.message}</p>
                            )}

                            <div className="flex justify-end items-end mt-2">
                                <button
                                    className={`${formState.isDirty && formState.isValid
                                        ? "bg-blue-500 hover:bg-blue-700"
                                        : "bg-gray-300 cursor-not-allowed"
                                        } text-white font-semibold py-2 px-4 rounded`}
                                    disabled={!isValid}>
                                    Tweet</button>
                            </div>
                        </div>
                    </form>
                    {
                        !userData &&
                        <div>
                            <div className='flex justify-center '>
                                <BiLogIn className='text-4xl mt-1 mr-2' />
                                <Link to={'/login'}>
                                    <Button
                                        type='button'
                                        className='bg-red-700 rounded-lg'>
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    }

                    {/* Tweets */}

                    <div className='flex flex-col mt-2'>
                        {error && <p className='text-center text-[#f90909] bg-gray-300 rounded-xl mt-6 mb-2  text-xl font-mono'>{error}</p>}
                        {
                            tweets?.map((item) => (
                                loading ? (
                                    <div key={item._id}>
                                        <LoadingTweetCard />
                                    </div>
                                ) : (
                                    <div key={item._id} className=''>
                                        <TweetCard tweet={item} onUpdate={handleTweetUpdate} onDelete={handleDelete} />
                                    </div>
                                )
                            ))
                        }
                    </div>

                </div>
            </div>

        </>)

}

export default TweetsPage