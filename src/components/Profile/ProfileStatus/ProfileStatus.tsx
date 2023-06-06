import React, { useState } from "react";
import { useEffect } from "react";
// @ts-ignore
import { CustomInput } from "../../../UI/CustomInput/CustomInput";

type PropsType = {
  status: string
  isOwner: boolean
  updateUsersStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {
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

  const onStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
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

export default ProfileStatus;
