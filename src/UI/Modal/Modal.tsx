import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import s from './Modal.module.css'
import React from 'react'

type PropsType = {
    isOpen: boolean
    children: React.ReactNode
    closeModal: () => void
}

export const Modal:React.FC<PropsType> = (props) => {
    useEffect(() => {
        const keydownListener = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && props.isOpen) {
                props.closeModal()
            }
        }
        window.addEventListener('keydown', keydownListener)

        return () => {
            window.removeEventListener('keydown', keydownListener)
        }
    }, [props.closeModal, props.isOpen])

    if (!props.isOpen) {
        return null
    }

    const modalJsx = (
        <div className={s.modalOverlay} onClick={props.closeModal}>
            <div onClick={(event) => event.stopPropagation()} className={s.content}>{props.children}</div>
        </div>
    )

    return createPortal(modalJsx, document.body);
}

