import React from "react";
import { CustomInput } from "../../UI/CustomInput/CustomInput";
import s from "./SearchUsers.module.css";

const SearchUsers = (props) => {
  return (
    <div className={s.searchUsers}>
      <div>Search Users:</div>
      <CustomInput className={s.searchUsersInput} />
    </div>
  );
};

export default SearchUsers;
