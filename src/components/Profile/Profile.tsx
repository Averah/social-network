import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import s from "./Profile.module.css";
import React from 'react'
import MyPostsMemorized from './Posts/MyPosts';
import { ProfileType } from '../../Types/types';

type PropsType = {
  profile: ProfileType | null
  status: string
  isOwner: boolean
  updateUsersStatus: (status: string) => void
  savePhoto: (file: File) => void
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div className={s.profileContent}>
      <div className={s.profileInfo}>
        <ProfileInfo
          profile={props.profile}
          status={props.status}
          updateUsersStatus={props.updateUsersStatus}
          isOwner={props.isOwner}
          savePhoto={props.savePhoto}
        />
      </div>
      <div className={s.profilePosts}>
        <MyPostsMemorized store={props.store} />
      </div>
    </div>
  );
};

export default withAuthRedirect(Profile);
