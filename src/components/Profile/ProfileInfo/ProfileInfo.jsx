import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import defaultAvatar from "../../../images/DefaultAvatar/defaultAvatar.png";
import s from "./ProfileInfo.module.css";
import ProfileDataForm from "./ProfileDataForm";
import { useState } from "react";

const ProfileInfo = (props) => {
  let [isEditMode, setIsEditMode] = useState(false)

  if (!props.profile) {
    return <Preloader />;
  }
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const activateEditMode= () => {
     setIsEditMode(true)}
  const deactivateEditMode= () => {
      setIsEditMode(false)}
 
  return (
    <div className={s.descriptionBlock}>
        <div className={s.userAvatar}>
          <img src={props.profile.photos.large || defaultAvatar} alt="avatar" />
          {props.isOwner && (
            <div className={s.uploadAvatar}>
              <label for="avatar">
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
        </div>
      {isEditMode ? <ProfileDataForm  profile={props.profile} deactivateEditMode={deactivateEditMode}/> : <ProfileData profile={props.profile} 
      isOwner={props.isOwner}
      activateEditMode={activateEditMode} />}
    </div>
  );
};

const ProfileData = (props) => {
  return (
    <div className={s.userData}>
      <div>
        <b>Full Name</b>: {props.profile.fullName}
      </div>
      <div className={s.userStatus}>
          <ProfileStatusWithHooks
            status={props.status}
            updateUsersStatus={props.updateUsersStatus}
            isOwner={props.isOwner}
          />
        </div>
      <div>
        <b>About me</b>: {props.profile.aboutMe}
      </div>
      <div>
        <b>Looking for a job</b>: {props.profile.lookingForAJob ? 'Yes' : 'No'}
      </div>
      <div>
        <b>My Professional skills</b>: {props.profile.lookingForAJobDescription}
      </div>
      <div className={s.contacts}>
          <b>Contacts</b>: {Object.entries(props.profile.contacts).map(([key, value]) => 
          <Contact contactTitle={key} contactValue={value}/>)}
        </div>
        {props.isOwner && 
          <button onClick={props.activateEditMode}>Edit your profile data</button>
      }
        
    </div>
  );
};

const Contact = ({contactTitle, contactValue}) => {
  return <div className={s.contactList}>{contactTitle}: {contactValue}</div>
}
export default ProfileInfo;
