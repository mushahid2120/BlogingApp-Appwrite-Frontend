import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './slice/authSlice.js'


const store = configureStore({
    reducer:{
        auth: AuthSlice
    }
})

export default store