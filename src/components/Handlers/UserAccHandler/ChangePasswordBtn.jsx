import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../utilities/Input';
import axios from 'axios';
import { logout } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function ChangePasswordBtn() {
  const { handleSubmit, register } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const Submit = async (data) => {
    setError("")
    setLoading(true)
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://playtube-app-backend.onrender.com/api/v1/users/change-password',
        data: {
          'oldPassword': data.oldPassword,
          'newPassword': data.newPassword,
        },
        withCredentials: true

      })
      if (response) {
        if (response) {
          setShowModal(false)
          dispatch(logout())
          navigate("/login")
        }
      }
    } catch (error) {
      setError("Something went wrong while updating your password")

    } finally {
      setLoading(false)
    }
  }

  if (error) {
    setTimeout(() => {
        setError(false)
    }, 5000) 
  }

  return loading ? (
    <div className="w-full h-[32rem] flex justify-center items-center ">
      <div className="w-1/3 h-1/3 rounded-xl text-center bg-gray-200 shadow-lg ">
        <div className="mt-6 animate-spin text-gray-700 text-4xl mb-3 duration-1000">&#9696;</div>

        <p className="text-lg text-gray-700 font-semibold">Updating your Password </p>
        <p className="text-gray-500">Please wait while we update your account password</p>
      </div>
    </div>) :
    <div>
        {error && <p className=" text-[#f90909]  bg-gray-200 rounded-xl mt-1 mb-2 text-center text-lg font-mono">{error}</p>}
      <div className='m-2'>
        <button onClick={() => setShowModal(true)}
          className='w-40 h-10 text-gray-300 border bg-gray-800 rounded-xl font-bold'>
          Change-Password
        </button>
      </div>


      {showModal && (

        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <form onSubmit={handleSubmit(Submit)}>
              <h2 className="text-lg font-semibold mb-3 mt-2 text-center">Change Your Password</h2>
              <Input
                type="text"
                label="Oldpassword:"
                placeholder="Enter your oldPassword..."
                {...register("oldPassword", { required: true })}
                className="py-2 px-4 m-1 rounded-lg "
              />
              <Input
                type="text"
                label="NewPassword:"
                placeholder="Enter your newPassword..."
                {...register("newPassword", { required: true })}
                className="py-2 px-4 m-1 rounded-lg "
              />
              <div className='flex flex-row justify-between'>
                <button
                  className="mt-4 py-2 px-4 bg-red-700 text-white rounded-lg cursor-pointer"
                  onClick={() => setShowModal(false)} // Close modal when cancel button is clicked
                >
                  Cancel
                </button>
                <button
                  className="mt-4 py-1.5 px-4 bg-green-700 text-white rounded-lg cursor-pointer"
                  type='submit'
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

}

export default ChangePasswordBtn