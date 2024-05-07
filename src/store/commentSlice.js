import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    commentData: null
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        load: (state, action) => {
            state.status = true;
            state.commentData = action.payload;
        },
      
   
      
     }
})

export const { load } = commentSlice.actions;

export default commentSlice.reducer;