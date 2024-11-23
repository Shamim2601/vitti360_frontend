import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [], // Stores all posts (blogs and circulars)
    currentPost: null, // Stores details of the selected post
    status: "idle", // Status can be "idle", "loading", "succeeded", "failed"
    error: null // For tracking any errors
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        fetchPostsSuccess: (state, action) => {
            state.status = "succeeded";
            state.posts = action.payload;
            state.error = null;
        },
        fetchPostsFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        fetchPostDetailsSuccess: (state, action) => {
            state.currentPost = action.payload;
            state.error = null;
        },
        fetchPostDetailsFailure: (state, action) => {
            state.error = action.payload;
        },
        createPostSuccess: (state, action) => {
            state.posts.push(action.payload);
            state.error = null;
        },
        createPostFailure: (state, action) => {
            state.error = action.payload;
        },
        updatePostSuccess: (state, action) => {
            const index = state.posts.findIndex((post) => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
            state.error = null;
        },
        updatePostFailure: (state, action) => {
            state.error = action.payload;
        },
        deletePostSuccess: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
            state.error = null;
        },
        deletePostFailure: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state) => {
            state.status = "loading";
        },
        resetState: (state) => {
            state.posts = [];
            state.currentPost = null;
            state.status = "idle";
            state.error = null;
        }
    }
});

export const {
    fetchPostsSuccess,
    fetchPostsFailure,
    fetchPostDetailsSuccess,
    fetchPostDetailsFailure,
    createPostSuccess,
    createPostFailure,
    updatePostSuccess,
    updatePostFailure,
    deletePostSuccess,
    deletePostFailure,
    setLoading,
    resetState
} = postSlice.actions;

export default postSlice.reducer;
