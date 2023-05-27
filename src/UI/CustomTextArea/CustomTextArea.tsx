import React from 'react'
import { forwardRef } from 'react';
import s from "./CustomTextArea.module.css";

type PropsType = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  customError?: string | null
}
export type Ref = HTMLTextAreaElement;

 const CustomTextarea = forwardRef<Ref, PropsType>((props, ref) => {
    const {customError, ...otherProps} = props;
    return (
      <div>
        <textarea {...otherProps} ref={ref} className={s.customTextarea} />
        {customError && (
        <div className={s.errorMessage}>
          {customError}
        </div>
        )}
      </div>
    );
  });



  export default CustomTextarea