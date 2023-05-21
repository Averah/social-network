import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import s from './Modal.module.css'

export const Modal = (props) => {
    useEffect(() => {
        const keydownListener = (event) => {
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

