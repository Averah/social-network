import React from "react";
import { useForm } from "react-hook-form";
import { actions } from "../../../redux/dialogsReducer";
import { CustomContentButton } from "../../../UI/CustomContentButton/CustomContentButton";
import CustomTextarea from "../../../UI/CustomTextArea/CustomTextArea";
import { useAppDispatch } from '../../../Hooks/useAppDispatch';

type UserSubmitForm = {
  dialogsMessage: string
}
const MessageForm:React.FC = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({ mode: "onChange" });

  const dispatch = useAppDispatch()

  const onSubmit = (data:UserSubmitForm) => {
    dispatch(actions.addDialogsMessageActionCreator(data.dialogsMessage));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <CustomTextarea
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
        <CustomContentButton>Send message</CustomContentButton>
      </div>
    </form>
  );
};

export default MessageForm;
