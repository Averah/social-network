import React, { useState } from "react";
import { useEffect } from "react";
const ProfileStatusWithHooks = (props) => {

  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect (() => {
    setStatus(props.status)
  }, [props.status])


  const activateEditMode = () => {
    setEditMode(true)
    
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateUsersStatus(status)
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }


  return (
    <div>
      {editMode ? (
        <div>
          <input
          onChange={onStatusChange}
          onBlur={deactivateEditMode} 
          autoFocus={true} value={status} />
        </div>
      ) : (
        <div>
          <span onClick={activateEditMode}>{props.status || "Your status"}</span>
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
