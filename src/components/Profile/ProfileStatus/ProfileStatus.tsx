import React, { useState } from "react";
import { useEffect } from "react";
import { useAppDispatch } from "../../../Hooks/useAppDispatch";
// @ts-ignore
import { CustomInput } from "../../../UI/CustomInput/CustomInput";
import { updateUsersStatus } from '../../../redux/profileReducer';

type PropsType = {
  status: string
  isOwner: boolean
}

const ProfileStatus: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  const dispatch = useAppDispatch()

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
    dispatch(updateUsersStatus(status));
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
