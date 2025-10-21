import { useState } from "react";
import InputField from "../Components/InputField";
import RTE from "../Components/RTE";
import { useForm } from "react-hook-form";
import databaseService from "../appwrite/appwriteServie";
import ImageView from "../Components/ImageView";
import { useLocation, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

function AddPost() {
  const formData = useLocation().state;
  const { control, register, handleSubmit, watch, getValues } = useForm({
    defaultValues: {
      title: formData?.title || "",
      content: formData?.content || "",
      file: "",
    },
  });
  const navigate = useNavigate();


  const addToDatabase = async (data) => {
    const compressedFile = await imageCompression(data.file[0], {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1280,
    });
    const finalCompressedFile = new File([compressedFile], data.file[0].name, {
      type: compressedFile.type,
    });
    const imageref = await databaseService.uploadImage(finalCompressedFile);
    if (formData) {
      const result = await databaseService.updateBlog(formData.id, {
        ...data,
        file: imageref.$id,
      });
      navigate(`/+${data.title}?blog=${result.$id}`, {
        state: {
          title: result.title,
          file: result.file,
          content: result.content,
        },
      });
    } else {
      const result = await databaseService.addData({
        ...data,
        file: imageref.$id,
      });
      navigate(`/+${data.title}?blog=${result.$id}`, {
        state: {
          title: result.title,
          file: result.file,
          content: result.content,
        },
      });
    }
  };

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
          <RTE control={control} defaultValue={getValues("content")} />
        </div>
        <div className="flex-grow-2">
          <InputField
            label="Featured Image : "
            placeholder="Uplaod your Image"
            type="file"
            {...register("file")}
          />
          {watch("file") !== undefined ? (
            watch("file").length !== 0 ? (
              formData === null ? (
                <ImageView
                  src={URL.createObjectURL(watch("file")[0])}
                  height="max-h-40"
                />
              ) : (
                <ImageView
                  src={databaseService.getFile(formData.file)}
                  height="max-h-40"
                />
              )
            ) : (
              ""
            )
          ) : (
            ""
          )}
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
