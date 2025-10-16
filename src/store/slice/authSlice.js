import {  createSlice } from "@reduxjs/toolkit";



const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    error: {loginError: '',signupError: ''},
  },
  reducers:{
    setIsLogin(state,action){
      state.isLogin=action.payload
    },
    clearError(state){
        state.error.loginError= '',
        state.error.signupError=''
    },
    setError(state,action){
        state.error.signupError=action.payload.signupError
        state.error.loginError=action.payload.loginError
    },
  },

});

export const isLogin = (state) => state.auth.isLogin;
export const loginError=(state)=>state.auth.error.loginError
export const signupError=(state)=>state.auth.error.signupError

export default AuthSlice.reducer;
export const { clearError,setError,setIsLogin } = AuthSlice.actions;
