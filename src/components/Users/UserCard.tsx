import React from "react";
import { CustomContentButton } from "../../UI/CustomContentButton/CustomContentButton";
import defaultAvatar from "./../../images/DefaultAvatar/defaultAvatar.png";
import s from "./UserCard.module.css";
import { UserType } from '../../Types/types';

type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  follow: (id: number) => void
  unfollow: (id: number) => void
}

let UserCard: React.FC<PropsType> = ({ user, followingInProgress, follow, unfollow }) => {
  return (
    <div key={user.id} className={s.userCard}>
      <div>
        <img
          src={
            user.photos.small != null ? user.photos.small : defaultAvatar
          }
          className={s.userPhoto}
          alt="avatar"
        />
      </div>
      <div>{user.name}</div>
      <div>{user.status ? user.status : "No Status"}</div>
      <div>Country:</div>
      <div>City:</div>
      <div>
        {user.followed ? (
          <CustomContentButton
            className={s.followingButton}
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              unfollow(user.id);
            }}
          >
            Unfollow
          </CustomContentButton>
        ) : (
          <CustomContentButton
            className={s.followingButton}
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              follow(user.id);
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
