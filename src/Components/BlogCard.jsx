import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/appwriteServie";
import { Link } from "react-router-dom";
import ImageView from "./ImageView";

export default function BlogCard({ title, file,content }) {
  
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const getImage = async (file) => {
      const res = databaseService.getFile(file);
      setImageUrl(res);
    };
    getImage(file);
  },[title]);


  return (
    <Link to={`/${title}`} state={{title,imageUrl,content}}>
      <div className="bg-white  max-w-56 text-center rounded-md overflow-hidden m-2 shadow-md hover:shadow-lg">
        {/* <img src={imageUrl} alt="" /> */}
        <ImageView src={imageUrl} height="h-36"/>
        <h2 className="my-2 font-semibold">{title}</h2>
      </div>
    </Link>
  );
}
