import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addDialogsMessageActionCreator } from "../../../redux/dialogsReducer";
import CustomTextarea from "../../../UI/CustomTextArea/CustomTextArea";

const MessageForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addDialogsMessageActionCreator(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <CustomTextarea
          name="dialogsMessage"
          type="textarea"
          placeholder="Enter your message"
          {...register("dialogsMessage", {
            required: "You cannot send an empty message",
          })}
          customError={
            errors?.dialogsMessage
              ? errors?.dialogsMessage.message || "Error!"
              : null
          }
        />
      </div>
      <div>
        <button>Send message</button>
      </div>
    </form>
  );
};

export default MessageForm;
