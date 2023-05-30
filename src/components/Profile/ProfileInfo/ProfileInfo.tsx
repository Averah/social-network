import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import defaultAvatar from "../../../images/DefaultAvatar/defaultAvatar.png";
import s from "./ProfileInfo.module.css";
import ProfileDataForm from "./ProfileDataForm";
import { useState } from "react";
import { Modal } from "../../../UI/Modal/Modal";
import { useCallback } from "react";
import { CustomContentButton } from "../../../UI/CustomContentButton/CustomContentButton";
import { ProfileType } from '../../../Types/types';


type PropsType = {
  profile: ProfileType | null
  isOwner: boolean
  status: string
  savePhoto: (file: File) => void
  updateUsersStatus: (status:string) => void
}

const ProfileInfo:React.FC<PropsType> = (props) => {
  let [isEditMode, setIsEditMode] = useState(false);

  const closeModal = useCallback(() => {
    setIsEditMode(false);
  }, []);

  if (!props.profile) {
    return <Preloader />;
  }
  const onMainPhotoSelected = (event:React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const file: null | File = target.files ? target.files[0] : null
    if (file) {
      props.savePhoto(file);
    }
  };

  const activateEditMode = () => {
    setIsEditMode(true);
  };
  const deactivateEditMode = () => {
    setIsEditMode(false);
  };

  return (
    <div className={s.descriptionBlock}>
      <div className={s.userAvatar}>
        <img src={props.profile.photos.large || defaultAvatar} alt="avatar" />
        {props.isOwner && (
          <div className={s.uploadAvatar}>
            <label htmlFor="avatar">
              {props.profile.photos.large
                ? "Update your photo"
                : "Upload your photo"}
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={onMainPhotoSelected}
              hidden
            ></input>
          </div>
        )}
        <div className={s.userStatus}>
          <ProfileStatus
            status={props.status}
            updateUsersStatus={props.updateUsersStatus}
            isOwner={props.isOwner}
          />
        </div>
      </div>
      <ProfileData
        profile={props.profile}
        isOwner={props.isOwner}
        activateEditMode={activateEditMode}
      />
      <Modal isOpen={isEditMode} closeModal={closeModal}>
        <ProfileDataForm
          profile={props.profile}
          deactivateEditMode={deactivateEditMode}
        />
      </Modal>
    </div>
  );
};


type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  activateEditMode: () => void
}

const ProfileData:React.FC<ProfileDataPropsType> = (props) => {
  return (
    <div className={s.userData}>
      <div>
        <b>Full Name</b>: {props.profile.fullName}
      </div>
      <div>
        <b>About me</b>: {props.profile.aboutMe}
      </div>
      <div>
        <b>Looking for a job</b>: {props.profile.lookingForAJob ? "Yes" : "No"}
      </div>
      <div>
        <b>My Professional skills</b>: {props.profile.lookingForAJobDescription}
      </div>
      <div className={s.contacts}>
        <b>Contacts</b>:
        {Object.entries(props.profile.contacts).map(([key, value], index) => (
          <Contact contactTitle={key} contactValue={value} key={index} />
        ))}
      </div>
      {props.isOwner && (
        <CustomContentButton onClick={props.activateEditMode}>
          Edit your profile data
        </CustomContentButton>
      )}
    </div>
  );
};

type ContactPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact:React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contactList}>
      {contactTitle}: {contactValue}
    </div>
  );
};
export default ProfileInfo;
