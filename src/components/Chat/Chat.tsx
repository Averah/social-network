import React, { useCallback, useEffect, useRef, useState } from 'react'
import s from './Chat.module.css'
import { ChatForm } from './ChatForm';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import defaultAvatar from './../../images/DefaultAvatar/defaultAvatar.png'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import Preloader from '../common/Preloader/Preloader';

const socketUrl = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx';

export const Chat: React.FC<ChatPropsType> = React.memo(({ closeChat }) => {
  const [messageHistory, setMessageHistory] = useState<MessageType[]>([])
  const [isInitiallyScrolled, setIsInitiallyScrolled] = useState(false)
  const myUserId = useSelector((state: AppStateType) => state.auth.userId)
  const ref = useRef<HTMLDivElement>(null)
  const scrollChatToBottom = () => ref.current?.scrollTo(0, ref.current.scrollHeight)

  const {
    sendMessage,
    lastMessage,
    readyState
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('web socket opened'),
    onClose: () => console.log('web socket closed'),
    shouldReconnect: (closeEvent) => true,
  })

  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      const messages = JSON.parse(lastMessage.data)
      setMessageHistory((prev) => prev.concat(messages))
    }
  }, [lastMessage, myUserId]);

  useEffect(() => {
    if (messageHistory.length && messageHistory[messageHistory.length - 1].userId === myUserId) {
      scrollChatToBottom()
    }
  }, [messageHistory, myUserId])

  useEffect(() => {
    if (messageHistory.length && isInitiallyScrolled === false) {
      scrollChatToBottom()
      setIsInitiallyScrolled(true)
    }
  }, [messageHistory, isInitiallyScrolled])

  const customSendMessage = useCallback((message: string) => {
    sendMessage(message)
  }, [sendMessage])

  return (
    <div className={s.chat}>
      {readyState === ReadyState.CONNECTING ? <Preloader /> : <div className={s.chatMessages} ref={ref} >
        {messageHistory.map((m, index) => <Message key={index} message={m} />)}
      </div>}
      <ChatForm closeChat={closeChat} sendMessage={customSendMessage} buttonDisabled={readyState !== ReadyState.OPEN} />
    </div>
  )
})


const Message: React.FC<{ message: MessageType }> = React.memo(({ message }) => {
  return <div className={s.chatMessage}>
    <img className={s.avatar} src={message.photo ? message.photo : defaultAvatar} alt='avatar' />
    <NavLink to={`/profile/${message.userId}`} className={s.userName}>{message.userName}</NavLink>
    <div className={s.message}>{message.message}</div>
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
