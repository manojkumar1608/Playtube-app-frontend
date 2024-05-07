import React from 'react'

function LoadingTweetCard() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-1 mt-2 animate-pulse">
    <div className="flex items-center justify-between mb-1 mt-1">
      <div className="flex flex-row">
        <div className="h-12 w-12 bg-gray-300 rounded-full mr-2"></div>
        <div className="h-4 w-36 bg-gray-300 rounded mt-2.5"></div>
      </div>
    </div>
    <div className="h-4 w-60 bg-gray-300 rounded mb-2 ml-12"></div>
    <div className="h-4 w-40 bg-gray-300 rounded mb-2 ml-12"></div>
    {/* <div className="h-4 w-52 bg-gray-300 rounded"></div> */}
  </div>
);
};

  


export default LoadingTweetCard