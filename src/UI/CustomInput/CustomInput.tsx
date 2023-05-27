import React from 'react';
import s from './CustomInput.module.css'
import cn from "classnames";
import { forwardRef } from 'react';

type PropsType = React.InputHTMLAttributes<HTMLInputElement>

export type Ref = HTMLInputElement;

export const CustomInput = forwardRef<Ref, PropsType>(({className, ...otherProps}, ref) => {
    return  <input ref={ref} {...otherProps} className={cn(s.customInput, className)}/>
})


