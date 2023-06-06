
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";
import Sidebar from "./Sidebar/Sidebar";
import { AppStateType } from '../../redux/redux-store';
import React from "react";

const Navbar: React.FC = () => {

  const friends = useSelector((state: AppStateType) => state.sidebar.friends)

  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? s.active : '')}>
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" className={({ isActive }) => (isActive ? s.active : '')}>
          News
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/friends" className={({ isActive }) => (isActive ? s.active : '')}>
          Friends
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" className={({ isActive }) => (isActive ? s.active : '')}>
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" className={({ isActive }) => (isActive ? s.active : '')}>
          Music
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/users" className={({ isActive }) => (isActive ? s.active : '')}>
          Find Users
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? s.active : '')}>
          Settings
        </NavLink>
      </div>
      <Sidebar friends={friends} />

    </nav>
  );
};

export default Navbar;
