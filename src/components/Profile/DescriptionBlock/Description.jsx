import s from "./Description.module.css";



const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img
          className={s.backgroundImage}
          src="https://www.ucf.edu/files/2020/04/space-header-1600x550-1600x500.jpg"
          alt="backgroundImage"
        ></img>

        <div className={s.descriptionBlock}>ava + description</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
