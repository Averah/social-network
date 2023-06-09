// import React, { useEffect } from "react";
// import Profile from "./Profile";
// import { connect } from "react-redux";
// import {
//   getUsersProfile,
//   getUsersStatus,
//   updateUsersStatus,
//   savePhoto,
//   actions,
// } from "../../redux/profileReducer";
// import { useParams } from "react-router-dom";
// import { withAuthRedirect } from "../HOC/withAuthRedirect";
// import { compose } from "redux";
// import { AppStateType } from '../../redux/redux-store';
// import { useAppDispatch } from "../../Hooks/useAppDispatch";

// type MapPropsType = ReturnType<typeof mapStateToProps>

// type MapDispatchPropsType = {
//   getUsersProfile: (userId: number | null) => void
//   getUsersStatus: (userId: number | null) => void
//   updateUsersStatus: (status: string) => void
//   savePhoto: (file: File) => void
// }

// type PathParamsType = {
//   userId: number | null
// }

// type PropsType = MapPropsType & MapDispatchPropsType & PathParamsType

// export const ProfileContainer: React.FC<PropsType> = (props) => {
//   const params = useParams();
//   const dispatch = useAppDispatch()
//   useEffect(() => {
//     let userId = params.userId ? +params.userId : null;
//     if (!userId) {
//       userId = props.authorizedUserId;
//     }
//     props.getUsersProfile(userId);
//     props.getUsersStatus(userId);

//     return () => {
//       dispatch(actions.setUserProfile(null))
//     }
//   }, [
//     params.userId,
//     props.getUsersProfile,
//     props.getUsersStatus,
//     props.authorizedUserId,
//     dispatch
//   ]);

//   return (
//     <Profile
//       {...props}
//       profile={props.profile}
//       status={props.status}
//       updateUsersStatus={props.updateUsersStatus}
//       isOwner={!params.userId}
//       savePhoto={props.savePhoto}
//     />
//   );
// };

// let mapStateToProps = (state: AppStateType) => {
//   return {
//     profile: state.profilePage.profile,
//     status: state.profilePage.status,
//     authorizedUserId: state.auth.userId,
//     isAuth: state.auth.isAuth,
//   };
// };

// export default compose<React.ComponentType>(
//   connect(mapStateToProps, {
//     getUsersProfile,
//     getUsersStatus,
//     updateUsersStatus,
//     savePhoto,
//   }),
//   withAuthRedirect
// )(ProfileContainer);
