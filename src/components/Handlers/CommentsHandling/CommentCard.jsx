import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import CommentLikeHandler from './CommentLikeHandler';
import { useForm } from 'react-hook-form';
import Button from '../../utilities/Button'
import { load } from '../../../store/commentSlice';
import moment from 'moment';
function CommentCard({ comment }) {
  let owner = comment.owner
  const userData = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()
  const [user, setUser] = useState()
  let [edit, setedit] = useState()
  const [update, setUpdate] = useState()
  const navigate = useNavigate()
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      content: comment?.content
    }
  })
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

  }, [owner, navigate, update])

  const Edit = async (data) => {
    if (comment) {
      const commentData = await axios({
        method: 'PATCH',
        url: `/api/v1/comments/c/${comment._id}`,
        data: {
          'newContent': data.content
        }
      })
      if (commentData) {
        // setUpdate(commentData.data)
        reset()
        setedit(false)
        dispatch(load(commentData.data))
      }
    }
  }
  const deleteHandler = async () => {
    const deletedata = await axios.delete(`/api/v1/comments/c/${comment._id}`)
    dispatch(load(deletedata.data))
  }

  const clicked = () => {
    setedit(edit = !edit)
  }


  return user ? (
    <>

      {edit &&
        <form onSubmit={handleSubmit(Edit)}>
          <input
            type='text'
            className="w-full p-2 mb-1 border-b-2 border-black text-ellipsis"
            placeholder="Write a comment..."
            {...register("content", { required: true })}
          />
          <Button
            type="submit"
            className='float-right mr-2 text-gray-200 border bg-gradient-to-t from-red-800 to-red-950 border-gray-900 rounded-xl font-bold '>
            Update
          </Button>
        </form>
      }
      <div className="relative flex flex-wrap  p-3 mb-4">
        {/* Avatar */}
        <div className="mr-3 ">
          <img
            className='size-12 rounded-full'
            src={user.avatar} />
        </div>



        {/* Comment content */}

        <div>
          <p className="inline-block text-xl text-gray-800 font-semibold mr-2">{user.username}</p>
          <span className=' text-gray-400'>{moment(comment.createdAt).fromNow()} </span>
          <p className="text-lg text-black mb-1">{comment.content}</p>



          {comment &&
            <div className="mt-3 space-x-6">
              <CommentLikeHandler comment={comment} />
            </div>
          }
        </div>
        {
          userData && userData.data._id === comment.owner ? (
            <div className='absolute bottom-2 right-2'>
              <button onClick={clicked}
                className='w-8 rounded-md text-xs text-gray-700 font-semibold hover:bg-gray-300'>
                <AiOutlineEdit className='ml-1 rounded-md size-5 ' />
                Edit
              </button>
              <button onClick={deleteHandler}
                className=' ml-3 text-xs text-gray-600 font-semibold hover:bg-gray-300 rounded-md '>
                <AiOutlineDelete className='ml-1 size-5 rounded-md' />
                Delete
              </button>
            </div>
          ) : null
        }
      </div>
    </>
  ) : null;
}

export default CommentCard