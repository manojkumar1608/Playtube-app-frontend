import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Input from '../../utilities/Input';
import axios from 'axios';
function ChangePasswordBtn() {
    const {handleSubmit, register} = useForm();
    const [showModal, setShowModal] = useState(false);

    const Submit = async (data) => {
        const response = await axios({
            method: 'POST',
            url: '/api/v1/users/change-password',
            data: {
                'oldPassword': data.oldPassword,
                'newPassword': data.newPassword,
            },

        })
        if (response) {
            if (response) {
                setShowModal(false)
            }
        }
    }

 

    return (
        <div>
        <div className='m-2'>
            <button onClick={()=> setShowModal(true)}
             className='w-40 h-10 text-gray-300 border bg-gray-800 rounded-xl font-bold'>
                Change-Password
            </button>
        </div>

        
      {showModal && (

<div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg p-8 max-w-md w-full">
    <form  onSubmit={handleSubmit(Submit)}>
      <h2 className="text-lg font-semibold mb-3 mt-2 text-center">Change Your Password</h2>
      <Input
                type="text"
                label = "Oldpassword:"
                placeholder="Enter your oldPassword..."
                {...register("oldPassword", { required: true })}
                className="py-2 px-4 m-1 rounded-lg "
            />
      <Input
                type="text"
                label = "NewPassword:"
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
    )
}

export default ChangePasswordBtn