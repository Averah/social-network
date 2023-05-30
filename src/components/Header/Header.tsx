import mainLogo from "./mainLogo1.png";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut} from '../../redux/authReducer';
import { AppStateType } from '../../redux/redux-store';
import React from "react";



const Header:React.FC = () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const dispatch = useDispatch()

  const logUserOut = () => {
    dispatch(logOut())
  }
  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <div className={s.mainLogo}>
          <img src={mainLogo} alt="logo" />
        </div>
        <div className={s.loginBlock}>
          {isAuth ? (
            <button onClick={logUserOut}>Log Out</button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
