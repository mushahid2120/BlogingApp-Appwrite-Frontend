import { useEffect, useState } from "react";
import databaseService from "../appwrite/appwriteServie";
import BlogCard from "../Components/BlogCard";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPost, getAllPost, getIsEdit } from "../store/slice/postSlice";

export default function AllPost() {
  const allPost = useSelector(getAllPost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPost())
    //   const response = await databaseService.getAllBlogs();
    //   if (response) {
    //     setAllPost(response.documents);
    //   }
    // };
    // getposts();
    // if (blogs) dispatch(setAllPost(blogs));
  }, []);


  return (
    <main className="min-h-[78vh] m-4 grid grid-cols-3">
      {allPost.map(({ $id: id, title, file, content,access }) => {
        return (
          <BlogCard
            title={title}
            file={file}
            content={content}
            key={id}
            id={id}
            access={access}
          />
        );
      })}
    </main>
  );
}
