import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserHomePage from '../../../Pages/UserPages/UserHomePage.jsx'
import Videos from '../../../Pages/UserPages/UserVideosPage.jsx'
import Tweets from '../../../Pages/UserPages/UserTweetsPage.jsx'
import Tabs from './Tabs.jsx';
import axios from 'axios'
import { BiLogIn } from "react-icons/bi";
import Button from '../../utilities/Button.jsx'
import { useSelector } from 'react-redux'
import UserAvatar from './UserAvatar.jsx'
import UserCoverImage from './UserCoverImage.jsx'
import UserAccDetails from './UserAccDetails.jsx'
import ChangePasswordBtn from './ChangePasswordBtn.jsx'
import LoadingUserChannel from '../../utilities/LoadingUserChannel.jsx'

function YourAccount() {
  const cuurentuser = useSelector((state) => state.auth.userData)
  const [loading, setLoading] = useState(true)
  const [channelData, setChannelData] = useState()
  const [update, setUpdate] = useState()
  const [error, setError] = useState()
  const { username } = useParams()
  const tabs = [
    { title: 'Home', content: <UserHomePage channelData={channelData} /> },
    { title: 'Videos', content: <Videos channelData={channelData} /> },
    { title: 'Tweets', content: <Tweets channelData={channelData} /> },
  ];

  useEffect(() => {
    async function getchannel() {
      try {
        const channelData = await axios({
          method: 'POST',
          url: '/api/v1/users/c/username',
          data: {
            'userId': cuurentuser?.data._id,// to check cureent user is following the channel or not
            'username': username
          }
        })
        if (channelData) {
          setChannelData(channelData.data.data)
        }

      } catch (error) {
        setError('Something went wrong Ty Refreshing')

      }
    }
    getchannel()

    const Timeout = setTimeout(() => {
      setLoading(false)
  }, 1000)
  return () => clearTimeout(Timeout)

  }, [update , username])

  const ToggleFollowBtn = async () => {
    const response = await axios.post(`/api/v1/subscriptions/c/${channelData?._id}`)
    setUpdate(response.data.data)
  }

  return loading ?(
    <LoadingUserChannel/>
  ):(
    <div>
    { channelData ?(
      <div>
        {error && <p className='text-center text-3xl font-bold'>{error}</p>}
      
      <UserCoverImage channelData={channelData} />
      
      <div className='flex flex-row w-1/2 mx-11 p-1 justify-start '>

        <UserAvatar channelData={channelData} />

        <div className='mt-6 '>
          <UserAccDetails channelData={channelData} />
          {
            channelData?._id === cuurentuser?.data._id ? (
              <div className='mx-1.5'>
                <ChangePasswordBtn />
              </div>) : (
                
                channelData?.isSubscribed ? (
                  <Button onClick={ToggleFollowBtn}
                  className=' w-[7rem]  mt-2 p-2 pl-4 border border-black bg-gray-500 font-bold rounded-2xl transition ease-in hover:-translate-y-1 hover:scale-110 hover:bg-red-700 delay-300 duration-150'>
                  Following
                </Button>) : (
                <Button onClick={ToggleFollowBtn}
                  className=' w-[6.5rem] mt-2  bg-gray-700 border border-black font-bold rounded-2xl transition ease-in delay-300 duration-150 hover:-translate-y-1 hover:scale-110 hover:bg-green-700'>
                  Follow
                </Button>)

            )
          }
        </div>

      </div>

      <div className=" mt-3">
        <Tabs tabs={tabs} />
      </div> 
      </div> ):
    <div className='w-full h-screen bg-gradient-to-r from-gray-200 to-gray-500'>
      <div className='flex  justify-center '>
        <BiLogIn className='text-7xl mt-10 mr-2' />
        <h1 className='text-3xl font-bold mt-12'>Login to get Your Channel</h1>
      </div>
      <div className='flex justify-center '>
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


</div>
        
  )
}

export default YourAccount