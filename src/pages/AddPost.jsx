import { useState } from "react";
import InputField from "../Components/InputField";
import RTE from "../Components/RTE";
import { useForm } from "react-hook-form";
import databaseService from "../appwrite/appwriteServie";
import ImageView from "../Components/ImageView";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const { control, register, handleSubmit, watch } = useForm();
  const navigate=useNavigate()

  const addToDatabase = async (data) => {
    console.log(data);
    try {
      const result = await databaseService.addData(data);
      navigate('/'+data.title, { state: {...data,imageUrl: URL.createObjectURL(watch("file")[0])} })
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(watch("file")?.length);

  if (watch("file") !== undefined && watch("file").length !== 0) {
    console.dir(URL.createObjectURL(watch("file")[0]));
  }

  return (
    <main className="min-h-[78vh] my-4 flex justify-center  ">
      <form
        className="grid gap-4 w-full grid-cols-[66%_34%] px-6"
        onSubmit={handleSubmit(addToDatabase)}
      >
        <div>
          <InputField
            label="Title : "
            placeholder="Enter your Title"
            type="text"
            {...register("title")}
          />
          <RTE control={control} />
        </div>
        <div className="flex-grow-2">
          <InputField
            label="Featured Image : "
            placeholder="Uplaod your Image"
            type="file"
            {...register("file")}
          />
          {
            // if(watch('file')!==undefined && watch('file').length!==0){
            //   console.dir(URL.createObjectURL(watch('file')[0]))
            //   }

            watch("file") !== undefined ? (
              watch("file").length !== 0 ? (
                <ImageView src={URL.createObjectURL(watch("file")[0])} height="max-h-40" />
              ) : (
                ""
              )
            ) : (
              ""
            )
          }
          <select
            className="border-solid border-2 border-pink-200 rounded-md text-lg outline-none px-2 py-1 w-full bg-white"
            {...register("access")}
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
          <button
            type="submit"
            className="w-full ml-auto font-semibold bg-blue-500 text-white py-2 rounded-lg my-4 hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddPost;
