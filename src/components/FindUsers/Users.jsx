import React from "react";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../images/DefaultAvatar/defaultAvatar.png";
import styles from "./Users.module.css";
import axios from 'axios';

let Users = (props) => {
  let pages = [];
  for (let i = 1; i <= 10; i++) {
    pages.push(i);
  }

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
                  onClick={() => {
                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {withCredentials : true, 
              headers: {
                'API-KEY': '7d155533-d3bd-4d80-af50-1dc93df6d79c'
              }})
                .then(response => {
                    if (response.data.resultCode === 0) {
                      props.unfollow(u.id);
                    }
                });
                    
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {withCredentials : true, 
              headers: {
                'API-KEY': '7d155533-d3bd-4d80-af50-1dc93df6d79c'
              }})
                .then(response => {
                    if (response.data.resultCode === 0) {
                      props.follow(u.id);
                    }
                    
                  })}
                }
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
