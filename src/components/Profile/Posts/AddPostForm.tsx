import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../Hooks/useAppDispatch";
import { actions } from '../../../redux/profileReducer';
import { CustomContentButton } from "../../../UI/CustomContentButton/CustomContentButton";
import CustomTextarea from "../../../UI/CustomTextArea/CustomTextArea";
import s from "./MyPosts.module.css";

const AddPostForm: React.FC = () => {
  type UserSubmitHandle = {
    postText: string
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitHandle>({ mode: "onChange" });

  const dispatch = useAppDispatch()

  const onSubmit = (data: UserSubmitHandle) => {
    dispatch(actions.addPostActionCreator(data.postText));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.addPost}>
      <CustomTextarea
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
