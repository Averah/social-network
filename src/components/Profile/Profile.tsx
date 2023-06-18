import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import s from "./Profile.module.css";
import React, { useEffect } from 'react'
import MyPostsMemorized from './Posts/MyPosts';
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../Hooks/useAppDispatch";
import { actions, getUsersProfile, getUsersStatus } from '../../redux/profileReducer';
import { useSelector } from 'react-redux';
import { AppStateType } from "../../redux/redux-store";

const Profile: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch()

  const status = useSelector((state: AppStateType) => state.profilePage.status)
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)

  useEffect(() => {
    let userId = params.userId ? +params.userId : null;
    if (!userId) {
      userId = authorizedUserId;
    }
    dispatch(getUsersProfile(userId));
    dispatch(getUsersStatus(userId));
  }, [params.userId, dispatch, authorizedUserId]);

  useEffect(() => {
    return () => {
      dispatch(actions.setUserProfile(null))
    }
  }, [dispatch])

  return (
    <div className={s.profileContent}>
      <div className={s.profileInfo}>
        <ProfileInfo
          profile={profile}
          status={status}
          isOwner={!params.userId}
        />
      </div>
      <div className={s.profilePosts}>
        <MyPostsMemorized />
      </div>
    </div>
  );
};

export default withAuthRedirect(Profile);
