import React from 'react'
import s from './Chat.module.css'
import { useForm } from 'react-hook-form';
import CustomTextarea from '../../UI/CustomTextArea/CustomTextArea';
import { CustomContentButton } from '../../UI/CustomContentButton/CustomContentButton';

type PropsType = {
  closeChat: () => void
  sendMessage: (message: string) => void
  buttonDisabled: boolean
}

type UserSubmitForm = {
  message: string
}

export const ChatForm: React.FC<PropsType> = React.memo(({ closeChat, sendMessage, buttonDisabled }) => {
  const {
    register,
    handleSubmit,
    reset
  } = useForm<UserSubmitForm>({ mode: "onChange" });

  const onSubmit = (data: UserSubmitForm) => {
    sendMessage(data.message)
    reset()
  };
  const onClose = () => closeChat()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.messageText}>
        <CustomTextarea
          placeholder="Enter your message"
          {...register("message", {
            required: "You cannot send an empty message",
          })}
        />
      </div>
      <div className={s.formButtons}>
        <CustomContentButton type='submit' disabled={buttonDisabled}>Send message</CustomContentButton>
        <CustomContentButton type="button" onClick={onClose}>Close chat</CustomContentButton>
      </div>
    </form>
  );
});




