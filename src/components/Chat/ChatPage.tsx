import React, { useCallback, useState } from 'react'
import { CustomContentButton } from '../../UI/CustomContentButton/CustomContentButton';
import { Chat } from './Chat';

export const ChatPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const openChat = () => setIsOpen(true)
  const closeChat = useCallback(() => setIsOpen(false), [])

  if (isOpen === false) {
    return <CustomContentButton onClick={openChat}>Open chat</CustomContentButton>
  }
  return <Chat closeChat={closeChat} />
}
