import { useEffect, useState } from "react"
import databaseService from "../appwrite/appwriteServie"
import BlogCard from "../Components/BlogCard"


export default function AllPost() {

  const [allPost ,setAllPost]=useState([])  

  useEffect(()=>{
    const getposts=async()=>{
      const response=await databaseService.getAllBlogs()
      if(response)
        setAllPost(response.documents)
    }
    getposts()
  },[])



  return (
    <main className="min-h-[78vh] m-4 grid grid-cols-3">
      {
        allPost.map(({title,file,content})=>{
          return <BlogCard title={title} file={file} content={content} key={title}/>
        })
      }
    </main>
    
  )
}
