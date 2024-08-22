import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    user : null,
    token : localStorage.getItem('token') ,
    isAuth : Boolean(localStorage.getItem("isAuth")) ,
    errors : null ,
    isLoading : false
}


//thunk

export const login = createAsyncThunk ('auth/login' , async(info , {rejectWithValue}) => {
    try {
        const res = await axios.post("http://localhost:5000/user/login",info)
        console.log('res', res)
        return res.data
    } catch (error) {
        console.log('error', error)
        return rejectWithValue(error.response.data)
    }
})




const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

    },
    extraReducers : (builder) => {
        builder
            .addCase(login.pending,(state , {payload})=>{
                state.isLoading = true
            })
            .addCase(login.fulfilled,(state , {payload})=>{
                localStorage.setItem("token",payload.token)
                localStorage.setItem("isAuth",true)
                state.isLoading = false
                state.token = payload.token
                state.isAuth = true
                state.errors =  null
            })
            .addCase(login.rejected,(state,{payload})=>{
                state.isLoading = false
                state.token = null
                state.isAuth = false
                state.errors = payload            
            })
          
    }
})


export  const AuthReducer =  authSlice.reducer 