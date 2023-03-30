import React from "react";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../images/DefaultAvatar/defaultAvatar.png";
import styles from "./Users.module.css";



let Users = (props) => {
  let pages = [];
  for (let i = 1; i <= 10; i++) {
    pages.push(i);
  }

  // const follow = (id) => {
  //   props.toggleFollowingProgress(true, id)
  //   followAPI.followUser(id).then((data) => {
  //     if (data.resultCode === 0) {
  //       props.follow(id);
  //     }
  //     props.toggleFollowingProgress(false, id)
  //   });

  // };

  // const unfollow = (id) => {
  //   props.toggleFollowingProgress(true, id)
  //   followAPI.unfollowUser(id).then((data) => {
  //     if (data.resultCode === 0) {
  //       props.unfollow(id);
  //     }
  //     props.toggleFollowingProgress(false, id)
  //   });
  // };

  return (
    <div>
      <div>
        {pages.map((p) => {
          return (
            <span
              className={props.currentPage === p ? styles.selectedPage : ""}
              onClick={(e) => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      </div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={`/profile/${u.id}`}>
                <img
                  src={u.photos.small != null ? u.photos.small : defaultAvatar}
                  className={styles.userPhoto}
                  alt="avatar"
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={props.followingInProgress.some(id => id === u.id)}
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : ( 
                <button
                  disabled={props.followingInProgress.some(id => id === u.id)}
                  onClick={() => {
                    props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{"u.location.country"}</div>
              <div>{"u.location.city"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
