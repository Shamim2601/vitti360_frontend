import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    allPosts:[],
    userPosts:{
        userId:null,
        posts:[]
    }
}

export const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        setAllPosts: (state, action)=>{
            state.allPosts = action.payload;
        },
        setUserPosts: (state, action)=>{
            state.allPosts = action.payload;

            state.userPosts.userId = action.payload.userID;
            state.userPosts.posts = action.payload;

            
        }
    }
});

export const {setAllPosts, setUserPosts} = postSlice.actions;

export default postSlice.reducer;

