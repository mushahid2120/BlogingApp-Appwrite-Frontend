import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ImageView from "../Components/ImageView";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import databaseService from "../appwrite/appwriteServie";
import Button from "../Components/Button";
import { useDispatch } from "react-redux";
import { fetchAllPost } from "../store/slice/postSlice";

export default function Blog() {
  const [blogData, setBlogData] = useState({
    title: "",
    file: "",
    content: "",
    access: ""
  });
  const [searchParams] = useSearchParams();
  const BlogId = searchParams.get("blog");
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const props = useLocation().state;

  useEffect(() => {
    if (props) {
      const { title, file, content,access } = props;
      setBlogData({ title, file, content,access });
    } else {
      console.log("from query string");
      const getBlog = async (id) => {
        const { title, file, content,access } = await databaseService.getBlog(id);
        setBlogData({ title, file, content,access});
      };
      getBlog(BlogId);
    }
  }, [BlogId]);

  const handleDelete = async () => {
    const res = await databaseService.deleteBlog(BlogId, blogData.file);
    dispatch(fetchAllPost())
    navigate("/allpost");
    console.log(res);
  };

  // const handleEdit=async(id,fileId)=>{
  //   const res=await databaseService.updateBlog
  // }

  if (blogData.title === "") return <h1>Loading...</h1>;

  return (
    <main className="min-h-[78vh] m-4">
      <div className="flex justify-end gap-2 text-white font-semibold my-2">
        <Link
          to={`/addpost?blog=${BlogId}`}
          state={{
            id: BlogId,
            title: blogData.title,
            file: blogData.file,
            content: blogData.content,
            access: blogData.access
          }}
        >
          <Button buttonName="Edit" bgColor="bg-blue-700" />
        </Link>
        <Button
          buttonName="Delete"
          bgColor="bg-red-700"
          onClick={handleDelete}
        />
      </div>
      <ImageView src={databaseService.getFile(blogData.file)} width="w-full" />
      <h2 className="text-xl font-semibold ">{blogData.title}</h2>
      <hr />
      <div>{parse(blogData.content)}</div>
    </main>
  );
}
