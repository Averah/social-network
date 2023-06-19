import React, { useEffect, useState } from 'react'
import s from './Chat.module.css'
import { ChatForm } from './ChatForm';
import useWebSocket from 'react-use-websocket';
import defaultAvatar from './../../images/DefaultAvatar/defaultAvatar.png'

const socketUrl = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx';

export const Chat: React.FC<ChatPropsType> = ({ closeChat }) => {
  const [messageHistory, setMessageHistory] = useState([])
  const {
    sendMessage,
    lastMessage,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('web socket opened'),
    onClose: () => console.log('web socket closed'),
    shouldReconnect: (closeEvent) => true,
  })

  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      const messages = JSON.parse(lastMessage.data)
      setMessageHistory((prev) => prev.concat(messages));
    }
  }, [lastMessage]);

  return (
    <div className={s.chat}>
      <div className={s.chatMessages}  >
        {messageHistory.map((m, index) => <Message key={index} message={m} />)}
      </div>
      <ChatForm closeChat={closeChat} sendMessage={sendMessage} />
    </div>

  )
}

const Message: React.FC<{ message: MessageType }> = React.memo(({ message }) => {
  return <div>
    <img className={s.avatar} src={message.photo? message.photo : defaultAvatar} alt='avatar' /> <b>{message.userName}</b>
    <br />
    {message.message}
    <hr />
  </div>
})


type ChatPropsType = {
  closeChat: () => void
}

export type MessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}