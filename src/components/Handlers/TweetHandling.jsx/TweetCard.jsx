import React, { useState, useEffect } from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TweetlikeHandler from './TweetLikeHandler';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import moment from 'moment'

function TweetCard({ tweet, onUpdate, onDelete }) {
  const [user, setUser] = useState()
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      tweetContent: tweet.content
    }
  });
  const { errors, isDirty, isValid } = formState;
  const userData = useSelector((state) => state.auth.userData)
  const owner = tweet.owner;
  let [edit, setedit] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    if (owner) {
      axios({
        method: 'POST',
        url: '/api/v1/users/getuserbyId',
        data: {
          userId: owner
        }
      }).then((response) => {
        if (response) {
          const userData = response.data.data
          setUser(userData)
        } else {
          navigate('/')
        }
      })
    } else {
      navigate('/')
    }
  }, [owner, navigate])


  const onFormSubmit = async (data) => {
    if (tweet) {
      const tweetData = await axios({
        method: 'PATCH',
        url: `/api/v1/tweets/${tweet._id}`,
        data: {
          'newContent': data.tweetContent
        }
      })
      if (tweetData) {
        const updatedTweets = tweetData.data.data
        reset()
        setedit(false)
        onUpdate(updatedTweets)
      }
    }
  }

  const EditHandler = () => {
    setedit(edit = !edit)
  }

  const DeleteHandler = async () => {
    try {
      // Calling onDelete with the tweet to be deleted
      onDelete(tweet);
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  }

  return user && (
    <div className="bg-white shadow-md rounded-lg p-4 m-1 flex">
      <Link to={`/user/${user.username}`}>
        <img
          src={user.avatar.url}
          alt="Avatar"
          className="w-12 h-12 border border-gray-400 rounded-full mr-2.5"
        />
      </Link>
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-1 ">
          <div className='flex flex-row '>
            <Link to={`/user/${user.username}`}>
              <p className="font-semibold text-lg">{user.username}</p>
            </Link>
            {/* <img src="https://img.icons8.com/?size=96&id=2sZ0sdlG9kWP&format=png"
                alt="Bluetick"
                className='h-4 w-4 mt-2 ml-1' /> */}

            <p className='text-gray-600 text-sm mt-1 ml-2'> • {moment(tweet.createdAt).fromNow()}</p>
          </div>
          {
            userData && userData.data._id === tweet.owner ? (
              <div className=''>
                <button onClick={EditHandler}
                  className='w-8 rounded-md text-xs text-gray-600 font-semibold hover:bg-gray-200'>
                  <AiOutlineEdit className='ml-1 rounded-md size-5 ' />
                  Edit
                </button>
                <button onClick={DeleteHandler}
                  className=' ml-3 text-xs text-gray-600 font-semibold hover:bg-gray-200 rounded-md '>
                  <AiOutlineDelete className='ml-1 size-5 rounded-md' />
                  Delete
                </button>
              </div>
            ) : null
          }
        </div>
        <p className="text-gray-800">{tweet.content}</p>
        <div className="flex mt-2">
          <TweetlikeHandler tweet={tweet} />
        </div>

        {
          edit &&
          <div className="flex fixed justify-center items-center h-screen">
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
              <div className="w-[26rem] bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Edit Tweet</h2>
                  <button className="p-1 hover:bg-gray-200 rounded-xl"
                    onClick={EditHandler}>
                    <RxCross2 className="size-6 mx-2" />
                  </button>
                </div>
                <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
                  <form onSubmit={handleSubmit(onFormSubmit)}>
                    <textarea
                      {...register("tweetContent", { required: "Tweet content is required" })}
                      className="w-full resize-none border rounded-md p-2 "
                      placeholder="What's happening?"
                    ></textarea>
                    {errors.tweetContent && (
                      <p className="text-red-500 text-sm">{errors.tweetContent.message}</p>
                    )}
                    <div className="flex justify-end items-center mt-5">
                      <button
                        type="submit"
                        className={`${formState.isDirty && formState.isValid
                          ? "bg-blue-500 hover:bg-blue-700"
                          : "bg-gray-300 cursor-not-allowed"
                          } text-white font-semibold py-2 px-4 rounded`}
                        disabled={!isValid}
                      >
                        Update
                      </button>
                      <button className="text-white font-semibold py-2 px-4 ml-5 rounded bg-red-600 hover:bg-red-700"
                        onClick={EditHandler}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )

}
export default TweetCard