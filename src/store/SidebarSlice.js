import { createSlice } from "@reduxjs/toolkit";

const SidebarSlice = createSlice({
    name : 'Sidebar',
    initialState:{
        isMenuOpen:false,
    },
    reducers:{
        isTogglemenu:(state)=>{
            state.isMenuOpen = !state.isMenuOpen
        },
        closeMenu:(state)=>{
            state.isMenuOpen = false
        }
    }
})
export const {isTogglemenu , closeMenu} = SidebarSlice.actions;
export default SidebarSlice.reducer