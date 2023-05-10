import { forwardRef } from 'react';

import s from "./CustomTextArea.module.css";

 const CustomTextarea = forwardRef((props, ref) => {
    const {customError, ...otherProps} = props;
    return (
      <div>
        <textarea {...otherProps} ref={ref} className={s.customTextarea}/>
        {customError && (
        <p>
          {customError}
        </p>
        )}
      </div>
    );
  });

  export default CustomTextarea