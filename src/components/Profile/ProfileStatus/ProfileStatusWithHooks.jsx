import React, { useState } from "react";
import { useEffect } from "react";
import { CustomInput } from "../../../UI/CustomInput/CustomInput";


const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    if (props.isOwner) {
      setEditMode(true);
    }
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUsersStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return props.isOwner && editMode ? (
    <div>
      <CustomInput
        onChange={onStatusChange}
        onBlur={deactivateEditMode}
        autoFocus={true}
        value={status}
      />
    </div>
  ) : (
     <div onClick={activateEditMode}>
      <span>Status: </span>{props.status}
   </div>
   
  );
};

export default ProfileStatusWithHooks;
