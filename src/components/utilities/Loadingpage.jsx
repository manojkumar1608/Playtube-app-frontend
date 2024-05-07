// Loading.js

import React from 'react';

const Loadingpage = () => { //videoCard Loading component
    return (
      <div className="w-[22.8rem] m-1.5 mt-3 rounded-xl object-cover ">
      <div className="relative ">
          <div className="w-[22.5rem] h-56 border bg-gray-300 rounded-xl object-cover animate-pulse"></div>
      </div>
      <div className='flex flex-row mt-3'>
          <div className="rounded-full w-[2.8rem] h-[2.8rem] bg-gray-300 animate-pulse"></div>
          <div className="p-2 ml-1 flex flex-col">
              <div className="h-4 w-64 bg-gray-300 rounded-full mb-2 animate-pulse"></div>
              <div className="h-3 w-44 bg-gray-300 rounded-full mb-2 animate-pulse"></div>
              <div className="h-3 w-28 bg-gray-300 rounded-full  animate-pulse"></div>
          </div>
      </div>
  </div>

    );
};

export default Loadingpage;
