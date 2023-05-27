import React from 'react'
import s from './CustomContentButton.module.css'
import cn from "classnames";

type PropsType = React.ButtonHTMLAttributes<HTMLButtonElement>

export const CustomContentButton:React.FC<PropsType> = ({ className, children, ...otherProps }) => {
    return <button  {...otherProps} className={cn(s.customContentButton, className)}>{children}</button>
}

