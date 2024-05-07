import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UploadVideo from '../components/Handlers/VideoHandler/UploadVideo.jsx';
function EditVideo() {
  const { videoId } = useParams()
  const [video, setVideo] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    if (videoId) {
      axios({
        method: 'GET',
        url: `/api/v1/videos/${videoId}`,

      }).then((response) => {
        const videoData = response.data.data
        setVideo(videoData)
      })
     } else {
      navigate('/')
    }
  }, [videoId, navigate])
  return video ? (
    <div className='m-auto'>
      <UploadVideo video={video} />
    </div>
  ) : null

}

export default EditVideo