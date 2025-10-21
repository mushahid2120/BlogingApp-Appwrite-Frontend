import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import databaseService from "../../appwrite/appwriteServie";

export const fetchAllPost=createAsyncThunk("post/fetchAll",async()=>{
    const response=await databaseService.getAllBlogs()
    return response.documents
})


const Postslice=createSlice({
    name: "post",
    initialState:{
        allPost:[],
        isEdit: false
    },
    reducers:{ 
        setAllPost(state,action){
            state.allPost=action.payload
        },
        setIsEdit(state,action){
            state.isEdit=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllPost.fulfilled,(state,action)=>{
            state.allPost=action.payload
        })
    }
})

export const getAllPost=(state)=>(state.post.allPost)
export const getIsEdit=(state)=>(state.post.isEdit)

export const {setAllPost,setIsEdit}=Postslice.actions

export default Postslice.reducer