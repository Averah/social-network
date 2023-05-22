import s from './CustomInput.module.css'
import cn from "classnames";
import { forwardRef } from 'react';


export const CustomInput = forwardRef(({className, ...otherProps}, ref) => {
    return  <input ref={ref} {...otherProps} className={cn(s.customInput, className)}/>
})


