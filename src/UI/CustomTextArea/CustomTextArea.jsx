import { forwardRef } from 'react';
import './CustomTextArea.css';

 const CustomTextarea = forwardRef((props, ref) => {
    const {customError, ...otherProps} = props;
    return (
      <div>
        <textarea {...otherProps} ref={ref} />
        {customError && (
        <p>
          {customError}
        </p>
        )}
      </div>
    );
  });

  export default CustomTextarea