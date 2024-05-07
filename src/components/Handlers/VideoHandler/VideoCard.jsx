import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'


function VideoCard({ _id, title, thumbnail, owner, views, createdAt, updatedAt ,duration}) {

  const [user, setUser] = useState(null)
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
  }, [owner, navigate ])
  function formatDuration() {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration % 3600) / 60);
    let remainingSeconds = Math.floor(duration % 60 );

    // Add leading zeros if necessary
    hours = String(hours).padStart(2,0);
    minutes = String(minutes).padStart(1, '0');
    remainingSeconds = String(remainingSeconds).padStart(2, '0');

    return  hours > 0 ? hours+ ':':"" + minutes + ':' + remainingSeconds;
}

  return user ? (
    <>
   
      <div className="w-[22.8rem] m-1.5 mt-3 rounded-xl object-cover">

        <Link to={`/watch/${_id}`}>
        <div className="relative">
    <img src={thumbnail.url} alt="Video Thumbnail"
     className="w-96 h-56 border bg-gray-100 rounded-xl object-cover"/>
      <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white font-semibold px-1 text-sm rounded-lg">
    {formatDuration(duration)}
    </div>
    </div>
        </Link>
        
        
    <div className='flex flex-row'>

      <Link to={`/user/${user.username}`}>
    <img src={user.avatar.url} alt="avatar" className="rounded-full w-[2.8rem] h-[2.8rem] mt-1.5 object-cover"/>
      </Link>
       
    <div className="p-2 ml-1">

      <Link to={`/watch/${_id}`}>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </Link>

        <Link to={`/user/${user.username}`}>
        <p className="text-md font-medium text-gray-400">{user.username} </p> 
        </Link>

        <p className='text-md font-medium text-gray-400'>  {views} views • {moment(createdAt).fromNow()}</p>
    </div>
    
    </div>
</div>






    </>
  ) : null
}

export default VideoCard