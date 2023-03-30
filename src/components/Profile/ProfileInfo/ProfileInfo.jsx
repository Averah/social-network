import Preloader from "../../common/Preloader/Preloader";
import { ProfileStatus } from "../ProfileStatus/ProfileStatus";
import s from "./ProfileInfo.module.css";



const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  
  return (
    <div>
      <div>
        {/* <img
          className={s.backgroundImage}
          src="https://www.ucf.edu/files/2020/04/space-header-1600x550-1600x500.jpg"
          alt="backgroundImage"
        ></img> */}

        <div className={s.descriptionBlock}>
          <img src={props.profile.photos.large} alt='avatar'/>
          <ProfileStatus status={props.status} updateUsersStatus={props.updateUsersStatus}/>
          <div>{props.profile.fullName}</div>
          <div>{props.profile.aboutMe}</div>
          
          </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
