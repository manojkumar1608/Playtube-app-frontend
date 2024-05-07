
import "./App.css";
import Header from "./components/Header/Header.jsx"; 
import { useDispatch, useSelector } from "react-redux";
import { useState , useEffect } from "react";
import {login , logout} from './store/authSlice.js'
import axios from 'axios'
import { Outlet } from "react-router-dom";
import SideBar from './components/Header/SideBar.jsx'

function App() {

  const userStatus = useSelector((state)=> state.auth.status)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setError('')
    axios.get('/api/v1/users/current-user')
    .then((userData) => {
      if (userData) {
        dispatch(login(userData.data))
      } else {
        dispatch(logout())
      }
    }).catch(error => {
      setError("Session Timedout Please Login",error)

    })
    .finally(() => setLoading(false))
  }, [])

  
  const RefreshAccessToken = async () => {
    try {
        const response = await axios.post('/api/v1/users/refresh-token', {
          refreshToken: localStorage.getItem('refreshToken')
        });

        const { accessToken, refreshToken } = response.data.data;
        
        // Update tokens in localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        // Optionally update state or trigger any other actions
    } catch (error) {
        console.error('Error refreshing access token:', error);
        // Handle error (e.g., token expired, unauthorized)
    }
  };
  
  // Function to check if access token is expired or close to expiry
  const isAccessTokenExpired = () => {
    const accessTokenExpirationTime = localStorage.getItem('accessTokenExpirationTime');
  if (!accessTokenExpirationTime) return true; // Token expired if expiration time is not set
  
  const currentTime = new Date().getTime();
  const expirationTime = new Date(accessTokenExpirationTime).getTime();
  
  // Check if token is expired or close to expiry 
  return expirationTime < currentTime + 5 * 60 * 1000;
};

const checkAndRefreshToken = async () => {
  if (isAccessTokenExpired()) {
      await RefreshAccessToken();
  }
};
useEffect(()=>{
  
  if(userStatus){
  // timer to check and refresh token periodically 
const intervalId = setInterval(checkAndRefreshToken, 30 * 60 * 1000); // Run every 30 minutes

// Cleanup function to clear the interval when the component unmounts
return () => clearInterval(intervalId); 
}
},[])
  
  return !loading ? (
    
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <div className="flex flex-row mt-[4.5rem]">
        <SideBar/>
        <main className="w-full mx-auto ml-[5.2rem]">
         <Outlet />
         </main>
        </div>
      </div>
    </div>
  ) : null
}


export default App;
