import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import setToken from "../../helpers/token";


const initialState = {
    user : JSON.parse(localStorage.getItem("user")),
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

export const getMe = createAsyncThunk('auth/getMe',async(_,{rejectWithValue}) =>{
    try {
        setToken()
        const res = await axios.get("http://localhost:5000/user/me")
        return res.data
    } catch (error) {
        console.log('error', error)
        return rejectWithValue(error.response.data)
    }
})

export const register = createAsyncThunk('auth/register', async(info , {rejectWithValue} ) => {
    try {
        const res = await axios.post("http://localhost:5000/user/register",info)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})



const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout : (state) => {
            localStorage.clear()
            state.isLoading = false
            state.token = null
            state.isAuth = null
            state.errors =  null
            state.user = null
        }
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
            .addCase(getMe.pending,(state , {payload}) => {
                state.isLoading = true
            })
            .addCase(getMe.fulfilled,(state , {payload}) => {
                localStorage.setItem("user",JSON.stringify(payload))
                state.isLoading = false
                state.user = payload
            })
            .addCase(getMe.rejected,(state , {payload}) => {
                state.errors = payload
            })
            .addCase(register.pending,(state , {payload}) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled,(state , {payload})=>{
                localStorage.setItem("token",payload.token)
                localStorage.setItem("isAuth",true)
                state.isLoading = false
                state.token = payload.token
                state.isAuth = true
                state.errors =  null
            })
            .addCase(register.rejected,(state , {payload}) => {
                state.isLoading = false
                state.errors = payload
            })
          
    }
})

export const {logout}= authSlice.actions
export  const AuthReducer =  authSlice.reducer 