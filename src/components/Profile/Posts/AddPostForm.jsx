import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPostActionCreator } from "../../../redux/profileReducer";
import CustomTextarea from "../../../UI/CustomTextArea/CustomTextArea";

const AddPostForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addPostActionCreator(data.postText));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
      <CustomTextarea
          name="postText"
          type="textarea"
          placeholder="Enter your post"
          {...register("postText", {
            required: "You cannot send an empty post",
          })}
          customError={errors?.postText ? (errors?.postText.message || "Error!") : null}
        />
        
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

export default AddPostForm;
