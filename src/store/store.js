import  { configureStore } from '@reduxjs/toolkit'
import authSlice from "./authSlice"
import SidebarSlice from "./SidebarSlice"
import commentSlice from './commentSlice'
const store = configureStore({
  reducer:{
     auth: authSlice,
     Sidebar: SidebarSlice,
     comment: commentSlice,
     
  }
})

export default store