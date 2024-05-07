import React, { useEffect, useState } from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom"
import { RxCross2 } from "react-icons/rx";
import { MdOutlineSubscriptions } from "react-icons/md"
import { AiOutlineLike } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { GoVideo } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import { CgFlag } from "react-icons/cg";
import { MdOutlineHelpOutline } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu, isTogglemenu } from "../../store/SidebarSlice"
import axios from 'axios';


function SideBar() {
  const [following, setFollowing] = useState()
  const [error, setError] = useState()
  const dispatch = useDispatch()

  const menu = useSelector((state) => state.Sidebar.isMenuOpen)
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    if (userData && menu) {
      async function getfollowingChannels() {
        try {
          const response = await axios({
            method: 'POST',
            url: '/api/v1/subscriptions/s/:channelId',
            data: {
              'channelId': userData.data._id
            }
          })
          if (response) {
            setFollowing(response.data.data)
          }
        } catch (error) {
          setError("Something went wrong Try Refreshing")

        }
      }
      getfollowingChannels()
    }
  }, [userData , menu])

  if (menu) {
    return (
      <>
        <div onClick={() => dispatch(closeMenu())} className='h-full w-full none fixed top-0  bg-black bg-opacity-30 z-50'>
          {error && <p className=" text-[#f90909]  bg-gray-200 rounded-xl mt-6 mb-2 text-center text-lg font-mono">{error}</p>}

          <div className="fixed top-0 p-5 shadow-xl w-60 bg-gray-50 h-screen overflow-y-auto rounded-xl ">
            <div className='flex flex-row text-2xl '>

              {/*  sidebar */}
              <RxCross2 className='size-8 p-0.5 hover:bg-gray-300 rounded-lg cursor-pointer'
                onClick={() => dispatch(closeMenu())} />

              {/* logo */}
              <a className="flex flex-row " href='/'>
                <img className='h-[2rem] w-[2re] ml-3  '
                  src="https://cdn-icons-png.flaticon.com/512/8894/8894556.png" alt="videoTube" />
                <h3 className='font-bold' >PlayTube</h3>
              </a>
            </div>

            <ul className=' pt-2 '>
              <Link to="/" className="">
                <li className="py-2 flex pl-2 font-semibold hover:bg-gray-300 rounded-lg ">
                  {""}
                  <AiOutlineHome className="mr-5 mt-1 text-xl" />
                  Home
                </li>

              </Link>
              <Link to="/Tweets" className=" ">
                <li className="py-2 flex pl-2 font-semibold hover:bg-gray-300 rounded-lg">
                  <RiTwitterXLine className="mr-5 mt-1 text-xl" />
                  Twitter
                </li>
              </Link>

              <Link to={'/Following'} className="">
                <li className="py-2 flex pl-2 font-semibold hover:bg-gray-300 rounded-lg ">

                  <MdOutlineSubscriptions className="mr-5 mt-1 text-xl " />
                  Following
                </li>
              </Link>

              <hr className="mt-2 w-full border-gray-400"></hr>

              <div className='flex flex-row mt-2'>
                <h3 className=' font-bold text-lg '> You </h3>
                <MdKeyboardDoubleArrowRight className="size-6 mt-1 ml-1" />
              </div>

              <Link to={`/user/${userData?.data.username}`} className="">
                <li className="py-2 flex  pl-2 font-semibold hover:bg-gray-300 rounded-lg">
                  <VscAccount className="mr-5 mt-1 text-xl" />
                  Your channel
                </li>
              </Link>

              <Link to={'/LikedVideos'} className=" ">
                <li className="py-2 flex pl-2 font-semibold hover:bg-gray-300 rounded-lg">
                  <AiOutlineLike className="mr-5 mt-1 text-xl" />
                  Liked videos
                </li>
              </Link>

              <Link to={`/user/${userData?.data.username}`} className="">
                <li className="py-2 flex pl-2 font-semibold  hover:bg-gray-300 rounded-lg">
                  <GoVideo className="mr-5 mt-1 text-xl" />
                  Your videos
                </li>
              </Link>
            </ul>

            <hr className="mt-2 w-full border-gray-300" />
            <h3 className='mt-2 font-bold text-lg mb-1'> Following </h3>
            {
               following && following.map((follow) => (
                <ul  key={follow._id}  className='font-semibold'>
                  <Link to={`/user/${follow.username}`} className="">
                    <li className="py-2 flex pl-2  hover:bg-gray-300 rounded-lg">
                      <img className='size-6 mr-2 rounded-full'
                        src={follow.avatar.url} alt="avatar" />
                      <p className='text-base'>{follow.username} •</p>
                    </li>
                  </Link>

                </ul>
              ))
            }

            <hr className=' mt-3 w-full border-gray-300' />

            <ul>
              <Link to="/" className="">
                <li className="py-2 flex pl-2 font-semibold hover:bg-gray-300 rounded-lg">
                  {" "}
                  <IoSettingsOutline className="mr-5 mt-1 text-xl" />
                  Settings
                </li>
              </Link>

              <Link to="/" className="">
                <li className="py-2 flex hover:bg-gray-300 rounded-lg pl-2 font-semibold">
                  {" "}
                  <CgFlag className="mr-5 mt-1 text-xl" />
                  Report
                </li>
              </Link>

              <Link to="/" className=" ">
                <li className="py-2 flex pl-2 font-semibold hover:bg-gray-300 rounded-lg">
                  {" "}
                  <MdOutlineHelpOutline className="mr-5 mt-1 text-xl" />
                  Help
                </li>
              </Link>

              <Link to="/" className=" ">
                <li className="py-2 flex pl-2 hover:bg-gray-300 rounded-lg font-semibold">
                  {" "}
                  <VscFeedback className="mr-5 mt-1 text-xl" />
                  Send Feedback
                </li>
              </Link>
            </ul>

          </div>
        </div>
      </>
    )
  }



}
export default SideBar