import React from "react";
import { NavLink } from "react-router-dom";
import s from "./UsersList.module.css";
import UserCard from "./UserCard";

let UsersList = (props) => {
  return (
    <div className={s.usersList}>
      {props.users.map((u) => (
        <NavLink to={`/profile/${u.id}`} className={s.userCardLink} key={u.id}>
          <UserCard
            u={u}
            users={props.users}
            followingInProgress={props.followingInProgress}
            follow={props.follow}
            unfollow={props.unfollow}
          />
        </NavLink>
      ))}
    </div>
  );
};

export default UsersList;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import { CustomContentButton } from "../../UI/CustomContentButton/CustomContentButton";
// import defaultAvatar from "./../../images/DefaultAvatar/defaultAvatar.png";
// import s from "./User.module.css";

// let UsersList = (props) => {
//   return (
//     <div className={s.usersList}>
//       {props.users.map((u) => (
//         <NavLink to={`/profile/${u.id}`} className={s.userCardLink}>
//         <div
//           key={u.id}
//           className={s.userCard}
//         >
//           <div>
//             <img
//               src={u.photos.small != null ? u.photos.small : defaultAvatar}
//               className={s.userPhoto}
//               alt="avatar"
//             />
//           </div>
//           <div>{u.name}</div>
//           <div>{u.status ? u.status : "No Status"}</div>
//           <div>Country:</div>
//           <div>City:</div>
//           <div>
//             {u.followed ? (
//               <CustomContentButton
//                 className={s.followingButton}
//                 disabled={props.followingInProgress.some((id) => id === u.id)}
//                 onClick={(event) => {
//                   event.preventDefault();
//                   props.unfollow(u.id);
//                 }}
//               >
//                 Unfollow
//               </CustomContentButton>
//             ) : (
//               <CustomContentButton
//                 className={s.followingButton}
//                 disabled={props.followingInProgress.some((id) => id === u.id)}
//                 onClick={(event) => {
//                   event.preventDefault();
//                   props.follow(u.id);
//                 }}
//               >
//                 Follow
//               </CustomContentButton>
//             )}
//           </div>
//         </div>
//         </NavLink>
//       ))}
//     </div>
//   );
// };

// export default UsersList;
