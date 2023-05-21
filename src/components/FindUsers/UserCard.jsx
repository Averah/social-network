import React from "react";

import { CustomContentButton } from "../../UI/CustomContentButton/CustomContentButton";
import defaultAvatar from "./../../images/DefaultAvatar/defaultAvatar.png";
import s from "./UserCard.module.css";

let UserCard = (props) => {
  return (
    <div key={props.u.id} className={s.userCard}>
      <div>
        <img
          src={
            props.u.photos.small != null ? props.u.photos.small : defaultAvatar
          }
          className={s.userPhoto}
          alt="avatar"
        />
      </div>
      <div>{props.u.name}</div>
      <div>{props.u.status ? props.u.status : "No Status"}</div>
      <div>Country:</div>
      <div>City:</div>
      <div>
        {props.u.followed ? (
          <CustomContentButton
            className={s.followingButton}
            disabled={props.followingInProgress.some((id) => id === props.u.id)}
            onClick={(event) => {
              event.preventDefault();
              props.unfollow(props.u.id);
            }}
          >
            Unfollow
          </CustomContentButton>
        ) : (
          <CustomContentButton
            className={s.followingButton}
            disabled={props.followingInProgress.some((id) => id === props.u.id)}
            onClick={(event) => {
              event.preventDefault();
              props.follow(props.u.id);
            }}
          >
            Follow
          </CustomContentButton>
        )}
      </div>
    </div>
  );
};

export default UserCard;
