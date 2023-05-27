import React, { useEffect } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getUsersProfile,
  getUsersStatus,
  updateUsersStatus,
  savePhoto,
} from "../../redux/profileReducer";
import { useParams } from "react-router-dom";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { compose } from "redux";

import { AppStateType } from '../../redux/redux-store';

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
  getUsersProfile: (userId: number) => void
  getUsersStatus: (userId: number) => void
  updateUsersStatus: (status: string) => void
  savePhoto: (file: File) => void
}



type PropsType = MapPropsType & MapDispatchPropsType & PathParamsType

export const ProfileContainerWithHooks:React.FC<PropsType> = (props) => {
  const params = useParams();
  useEffect(() => {
    let userId = params.userId ? +params.userId : null;
    if (!userId) {
      userId = props.authorizedUserId;
    }
    props.getUsersProfile(userId);
    props.getUsersStatus(userId);
  }, [
    params.userId,
    props.getUsersProfile,
    props.getUsersStatus,
    props.authorizedUserId,
  ]);

  return (
    <Profile
      {...props}
      profile={props.profile}
      status={props.status}
      updateUsersStatus={props.updateUsersStatus}
      isOwner={!params.userId}
      savePhoto={props.savePhoto}
    />
  );
};

let mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUsersProfile,
    getUsersStatus,
    updateUsersStatus,
    savePhoto,
  }),
  withAuthRedirect
)(ProfileContainerWithHooks);
