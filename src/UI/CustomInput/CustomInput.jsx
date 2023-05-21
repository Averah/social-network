
import s from './CustomInput.module.css'
import cn from "classnames";


export const CustomInput = ({className, ...otherProps}) => {
    return  <input {...otherProps} className={cn(s.customInput, className)}/>
}


