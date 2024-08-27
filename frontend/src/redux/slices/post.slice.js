import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import setToken from "../../helpers/token";


const initialState = {
    posts : [] ,
    errors : null ,
    isLoading : false
}


export const addPost = createAsyncThunk('post/addPost', async(newPost , {rejectWithValue}) => {
    try {
        setToken()
        const res = await axios.post('http://localhost:5000/post/add-post',newPost)
        return res.data
    } catch (error) {
        console.log('error', error)
        return rejectWithValue(error.response.data)
    }
})


const postSlice = createSlice({
    name : "post",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(addPost.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addPost.fulfilled , (state , {payload}) => {
            state.isLoading = false
            state.errors = null
        })
        .addCase(addPost.rejected , (state, {payload}) => {
            state.isLoading = false
            state.errors = payload
        })

    }
})

export const PostReducer = postSlice.reducer