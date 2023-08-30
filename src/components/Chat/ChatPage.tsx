import React, { useCallback, useState } from 'react'
import { CustomContentButton } from '../../UI/CustomContentButton/CustomContentButton';
import { Chat } from './Chat';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

export const ChatPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const openChat = () => setIsOpen(true)
  const closeChat = useCallback(() => setIsOpen(false), [])
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  if (isOpen === false && isAuth) {
    return <CustomContentButton onClick={openChat}>Open chat</CustomContentButton>
  } else if (isAuth === false) {
    return null
  }
  return <Chat closeChat={closeChat} />
}

