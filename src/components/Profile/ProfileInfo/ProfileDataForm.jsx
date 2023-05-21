import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile } from "../../../redux/profileReducer";
import { CustomContentButton } from "../../../UI/CustomContentButton/CustomContentButton";
import cn from "classnames";
import s from "./ProfileInfo.module.css";

const ProfileDataForm = (props) => {
  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: props.profile,
  });

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
    <form onSubmit={handleSubmit(onSubmit)} className={s.userEditingData}>
      <div className={s.formField}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
        </div>
        <input
          id="fullName"
          type="text"
          name="fullName"
          {...register("fullName")}
        />
      </div>
      <div className={s.formField}>
        <div>
          <label htmlFor="aboutMe">About me:</label>
        </div>
        <input
          type="text"
          id="aboutMe"
          name="aboutMe"
          {...register("aboutMe")}
        />
      </div>
      <div className={cn(s.checkbox, s.formField)}>
        <span>Looking for a job:</span>
        <input
          type="checkbox"
          id="lookingForAJob"
          name="checkbox"
          {...register("lookingForAJob")}
        />
        <label htmlFor="true"></label>
      </div>
      <div className={s.formField}>
        <div>
          <label htmlFor="lookingForAJobDescription">
            My professional skills:
          </label>
        </div>
        <input
          type="textarea"
          name="lookingForAJobDescription"
          id="lookingForAJobDescription"
          {...register("lookingForAJobDescription")}
        />
      </div>
      {Object.entries(props.profile.contacts).map(([key], index) => (
        <div className={cn(s.contact, s.formField)} key={index}>
          <div>
            <label htmlFor="contact">{key}:</label>
          </div>
          <input
            type="text"
            name={`contacts.${key}`}
            {...register(`contacts.${key}`)}
          />
        </div>
      ))}
      <div>
        {error && (
          <p style={{ color: "red" }}>{error.join(", ") || "Error!"}</p>
        )}
      </div>
      <CustomContentButton type="submit">Save changes</CustomContentButton>
      <span>
        <CustomContentButton
          className={s.cancelChangesBtn}
          type="button"
          onClick={cancelChanges}
        >
          Cancel changes
        </CustomContentButton>
      </span>
    </form>
  );
};

export default ProfileDataForm;
