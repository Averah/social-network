import mainLogo from "./mainLogo1.png";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <div className={s.mainLogo}>
          <img src={mainLogo} alt="logo" />
        </div>
        <div className={s.loginBlock}>
          {props.isAuth ? (
            <button onClick={props.logOut}>Log Out</button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
