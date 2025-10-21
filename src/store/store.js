import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './slice/authSlice.js'
import  Postslice from "./slice/postSlice.js"


const store = configureStore({
    reducer:{
        auth: AuthSlice,
        post: Postslice
    }
})

export default store