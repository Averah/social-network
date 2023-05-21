
import s from './CustomContentButton.module.css'
import cn from "classnames";

export const CustomContentButton = ({ className, children, ...otherProps }) => {
    return <button {...otherProps} className={cn(s.customContentButton, className)}>{children}</button>
}

