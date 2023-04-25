import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile } from "../../../redux/profileReducer";
import s from "./ProfileInfo.module.css";

const ProfileDataForm = (props) => {
  const {
    register,
    handleSubmit,
  } = useForm({ mode: "onBlur", defaultValues: props.profile });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const serverResponseMessage = await dispatch(saveProfile(data));

    if (serverResponseMessage === "success") {
      props.deactivateEditMode();
    }
  };
  const error = useSelector((state) => state.profilePage.errorMessages);

  const cancelChanges = () => {
    const deactivateEditMode = props.deactivateEditMode;
    deactivateEditMode();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.userData}>
      <div>
        <b>
          <label for="fullName">Full Name:</label>
        </b>
        <input
          id="fullName"
          type="text"
          name="fullName"
          {...register("fullName")}
        />
      </div>
      <div>
        <b>
          <label for="aboutMe">About me:</label>
        </b>
        <input
          type="text"
          id="aboutMe"
          name="aboutMe"
          {...register("aboutMe")}
        />
      </div>
      <div className={s.checkbox}>
        <b>Looking for a job:</b>
        <input
          type="checkbox"
          id="lookingForAJob"
          name="checkbox"
          {...register("lookingForAJob")}
        />
        <label for="true"></label>
      </div>
      <div>
        <b>
          <label for="lookingForAJobDescription">My professional skills:</label>
        </b>
        <input
          type="textarea"
          name="lookingForAJobDescription"
          id="lookingForAJobDescription"
          {...register("lookingForAJobDescription")}
        />
      </div>
      {Object.entries(props.profile.contacts).map(([key]) => (
        <div className={s.contact}>
          <b>
            <label for="contact">{key}</label>
          </b>
          <input
            type="text"
            name={`contacts.${key}`}
            {...register(`contacts.${key}`)}
          />
        </div>
      ))}
      <div>
          {error && <p style={{ color: "red" }}>{error.join(', ') || "Error!"}</p>}
        </div>
      <button type="submit">Save changes</button>
      <span>
        <button type="button" onClick={cancelChanges}>
          Cancel changes
        </button>
      </span>
    </form>
  );
};

export default ProfileDataForm;
