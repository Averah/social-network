import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import defaultAvatar from "../../../images/DefaultAvatar/defaultAvatar.png";
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  return (
    <div>
      <div>
        <div className={s.descriptionBlock}>
          <div>
            <img
              src={props.profile.photos.large || defaultAvatar}
              className={s.userAvatar}
              alt="avatar"
            />
          </div>
          {props.isOwner && (
            <div>
              <label for="avatar" className={s.uploadAvatar}>
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
            <ProfileStatusWithHooks
              status={props.status}
              updateUsersStatus={props.updateUsersStatus}
              isOwner={props.isOwner}
            />
          </div>
          <div>{props.profile.fullName}</div>
          <div>{props.profile.aboutMe}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
