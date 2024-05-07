import React from 'react'
import Skeleton from 'react-loading-skeleton'
function LoadingUserChannel() {
  return (
    <div className="h-screen max-w-7xl mx-auto px-4 py-4 bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-40 rounded-lg mb-2 mr-6 bg-gray-300">
        <Skeleton height={'100%'} className="animate-pulse bg-gray-400" />
      </div>

      {/* Avatar and User Details */}
      <div className="flex flex-row items-center mb-6">
        <div className="w-40 h-40 rounded-full bg-gray-300">
          <Skeleton circle={true} height={'100%'} className=" animate-pulse bg-gray-500" />
        </div>
        <div className="w-60 h-40 ">
          <div height={24} width={200} className="h-4 ml-3 mt-6 w-60 animate-pulse bg-gray-300 rounded-xl"> </div>
          <div height={16} width={160} className="h-4 ml-3 mt-6 w-40 animate-pulse bg-gray-300 rounded-xl"></div>
          <div height={12} width={100} className="h-4 ml-3 mt-6 w-28 animate-pulse bg-gray-300 rounded-xl" ></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-1/2 justify-evenly">
        <p className='h-8 mt-6 w-20 animate-pulse bg-gray-300 rounded-xl'> </p>
        <p className='h-8 mt-6 w-20 animate-pulse bg-gray-300 rounded-xl'> </p>
        <p className='h-8 mt-6 w-20 animate-pulse bg-gray-300 rounded-xl'> </p>
        <p className='h-8 mt-6 w-20 animate-pulse bg-gray-300 rounded-xl'> </p>
      </div>
      <p className='h-1 mt-2 w-full animate-pulse bg-gray-300 rounded-xl'> </p>
    </div>
  )
}

export default LoadingUserChannel
{/* <div className="flex items-center mr-8 bg-gray-300">
          <Skeleton height={24} width={80} className="animate-pulse bg-gray-300" />
        </div>
        <div className="flex items-center mr-8">
          <Skeleton height={24} width={80} className="animate-pulse bg-gray-300" />
        </div>
        <div className="flex items-center">
          <Skeleton height={24} width={180} className="animate-pulse bg-gray-300" />
        </div> */}