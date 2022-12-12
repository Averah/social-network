import s from "./Description.module.css";



const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img
          className={s.backgroundImage}
          src="http://c.files.bbci.co.uk/13F56/production/_110005718_gettyimages-1162816285.jpg"
          alt="backgroundImage"
        ></img>

        <div className={s.descriptionBlock}>ava + description</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
