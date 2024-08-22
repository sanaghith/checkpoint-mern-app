import { configureStore } from "@reduxjs/toolkit";
import {AuthReducer} from "./slices/auth.slice"



export default configureStore({reducer : 
    {
        AuthReducer
    }
})