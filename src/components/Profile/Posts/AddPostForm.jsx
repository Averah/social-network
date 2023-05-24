import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPostActionCreator } from "../../../redux/profileReducer.ts";
import { CustomContentButton } from "../../../UI/CustomContentButton/CustomContentButton";
import CustomTextarea from "../../../UI/CustomTextArea/CustomTextArea";
import s from "./MyPosts.module.css";

const AddPostForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addPostActionCreator(data.postText));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.addPost}>
        <CustomTextarea
          name="postText"
          type="textarea"
          placeholder="Enter your post"
          {...register("postText", {
            required: "You cannot send an empty post",
          })}
          customError={
            errors?.postText ? errors?.postText.message || "Error!" : null
          }
        />
      <div>
        <CustomContentButton>Add post</CustomContentButton>
      </div>
    </form>
  );
};

export default AddPostForm;
