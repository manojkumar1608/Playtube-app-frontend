import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isTogglemenu } from "../../store/SidebarSlice"
import LogoutBtn from './LogoutBtn';
import { Link, NavLink, useNavigate,  } from 'react-router-dom';
import Button from '../utilities/Button';
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md"
import { AiOutlineLike } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import TweetFormCard from '../Handlers/TweetHandling.jsx/TweetFormCard';
import { useLocation } from 'react-router-dom';
import SearchVideoList from '../Handlers/SearchHandling/SearchVideoList';
import Search from '../Handlers/SearchHandling/Search';


function Header() {
  const userData = useSelector((state) => state.auth.userData)
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const HandleCreateVideo = () => {
    if (userData) {
      navigate('/uploadvideo')
    } else {
      navigate('login')
    }
  }

  if (error) {
    setTimeout(() => {
      setError(false)
    }, 4000)
  }

  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-200" : "";
  };
  return (
    <>
      <div>
        <nav className="w-full flex fixed top-0 z-40 px-4 py-2 bg-gray-100 shadow-sm justify-between items-center">

          {/* <!-- Logo --> */}
          <div className='flex flex-row'>
            <RxHamburgerMenu
              onClick={() => dispatch(isTogglemenu())}
              className='size-6 mt-2 mx-3 cursor-pointer'
            />

            <a className="flex flex-row" href='/'>
              <img className='h-10 w-12 inline-block'
                src="https://cdn-icons-png.flaticon.com/512/8894/8894556.png" alt="videoTube" />
              <h3 className='text-[1.6rem] font-bold text-gray-950 mt-0.5' >PlayTube</h3>
            </a>
          </div>

          {/* <!-- Search bar --> */}
          <div className="w-[33rem] ml-8 hidden lg:block">
           <Search />
          </div>

          {/* <!-- Login/logout button --> */}
          <div className='flex flex-wrap justify-end text-gray-950 mt-2'>
            <button onClick={HandleCreateVideo}
              className='text-sm font-bold'>
              <img className='size-8  mx-7 '
                src="https://cdn-icons-png.flaticon.com/128/4120/4120760.png"
                alt="" />Create
            </button>
            <TweetFormCard />
            {userData ?
              <LogoutBtn /> :

              <Link to='/login'>
                <Button
                  className=' text-gray-200 border bg-gradient-to-r from-red-700 to-gray-950 rounded-xl font-bold '>
                  Login/Signup
                </Button>
              </Link>
            }
          </div>
        </nav>
        <div className=''>
          <ul className='flex flex-col fixed top-[5rem] shadow-sm w-[5rem] ml-0.5'>

            <NavLink to="/" className='nav-item nav-link'>
              <li className={`flex flex-col items-center py-2 mb-0.5 rounded-lg font-bold hover:bg-gray-100 ${isActive("/")}`}>
                <AiOutlineHome className="text-3xl" />
                <p className='mt-1 mb-1 text-xs font-medium text-gray-500'>Home</p>
              </li>
            </NavLink>

            <NavLink to="/Tweets"  >

              <li className={`flex flex-col items-center py-2 mb-0.5 rounded-lg font-bold hover:bg-gray-200 ${isActive("/Tweets")}`}>
                <RiTwitterXLine className="inline-block text-3xl" />
                <p className='mt-1 mb-1 text-xs font-medium text-gray-500'>Twitter</p>
              </li>
            </NavLink>

            <NavLink to="/Following" className='nav-item nav-link' >
              <li className={`flex flex-col items-center py-2 mb-0.5 rounded-lg font-bold hover:bg-gray-200 ${isActive("/Following")}`}>
                <MdOutlineSubscriptions className="text-3xl" />
                <p className='mt-1 mb-1 text-xs font-medium text-gray-500'>Following</p>
              </li>
            </NavLink>

            <NavLink to="/LikedVideos" className='nav-item nav-link' >
              <li className={`flex flex-col items-center py-2 mb-0.5 rounded-lg font-bold hover:bg-gray-200 ${isActive("/LikedVideos")}`}>
                <AiOutlineLike className="text-3xl" />
                <p className='mt-1 mb-1 text-xs font-medium text-gray-500'>Liked Videos</p>
              </li>
            </NavLink>

            <NavLink to={`/user/${userData?.data?.username}`} className='nav-item nav-link' >
              <li className={`flex flex-col items-center py-2 mb-0.5 rounded-lg font-bold hover:bg-gray-200 ${isActive(`/user/${userData?.data?.username}`)}`}>
                <VscAccount className="text-3xl" />
                <p className='mt-1 mb-1 text-xs font-medium text-gray-500'>You</p>
              </li>
            </NavLink>

          </ul>


        </div>

      </div>
    </>)
}
export default Header
