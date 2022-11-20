import mainLogo from "./mainLogo1.png";
import s from "./Header.module.css";

const Header = () => {
  return (
    <header className={s.header}>
      <img src={mainLogo} alt="logo"></img>
    </header>
  );
};

export default Header;
