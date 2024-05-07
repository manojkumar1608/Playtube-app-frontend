import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import WatchPage from "./Pages/WatchPage.jsx";
import Signup from "./components/Authentication/SignUp.jsx";
import Login from "./components/Authentication/Login.jsx";
import AuthLayout from "./components/Authentication/AuthLayout.jsx";
import UploadVideo from './components/Handlers/VideoHandler/UploadVideo.jsx.jsx'
import EditVideo from './Pages/EditVideo.jsx';
import HomePage from './Pages/HomePage.jsx';
import YourAccount from './components/Handlers/UserAccHandler/YourAccount.jsx'
import LikedVideos from './Pages/UserPages/LikedVideos.jsx';
import FollowingVideosPage from './Pages/UserPages/FollowingVideosPage.jsx';
import TweetsPage from './Pages/TweetsPage.jsx'
import SearchResults from './components/Handlers/SearchHandling/SearchVideoList.jsx';
const router = createBrowserRouter([
  {
    path:"/", 
    element:<App/>,
        children:[
          {
            path:"/",
            element:<HomePage/>
          },
         
        {
          path:"/watch/:videoId",
          element:<WatchPage/>

        },
        {
          path:"/Following",
          element:<FollowingVideosPage/>

        },
        {
          path:"/user/:username",
          element:<YourAccount/>

        },
          {
        path:"/Tweets",
        element:<TweetsPage/>
      },
          {
        path:"/LikedVideos",
        element:<LikedVideos/>
      },
          {
        path:"/search-results",
        element:<SearchResults/>
      },
       
      {
        path:"/signup",
        element:(
          <AuthLayout authentication = {false}>
            <Signup/>
          </AuthLayout>
        )
        

      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication = {false}>
            <Login/>
          </AuthLayout>
        )

      },
      {
        path:"/uploadvideo",
        element:(
          <AuthLayout authentication = {false}>
            <UploadVideo/>
          </AuthLayout>
        )

      },

      {
        path:"/edit-video/:videoId",
        element:(
          <AuthLayout authentication = {false}>
            <EditVideo/>
          </AuthLayout>
        )

      },
    ]
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
 <Provider store = {store}>

    <RouterProvider router= {router}/>
 </Provider>
   
  // </React.StrictMode>,
   
)
