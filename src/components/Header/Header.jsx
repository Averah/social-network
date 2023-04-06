import mainLogo from "./mainLogo1.png";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src={mainLogo} alt="logo"></img>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <button onClick={props.logOut}>Log Out</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
