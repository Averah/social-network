import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile, showErrorMessages } from "../../../redux/profileReducer";
import { CustomContentButton } from "../../../UI/CustomContentButton/CustomContentButton";
import cn from "classnames";
import s from "./ProfileInfo.module.css";
import { ProfileType, ContactType } from '../../../Types/types';
import { AppStateType, AppDispatch } from '../../../redux/redux-store';


type PropsType = {
  profile: ProfileType
  deactivateEditMode: () => void
}

interface UserSubmitHandle extends ProfileType {
  error: null | string[]
}


const ProfileDataForm: React.FC<PropsType> = (props) => {
  const { register, handleSubmit } = useForm<UserSubmitHandle>({
    mode: "onBlur",
    defaultValues: props.profile,
  });

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async (data: UserSubmitHandle) => {
    const serverResponseMessage = await dispatch(saveProfile(data));
    if (serverResponseMessage === "success") {
      props.deactivateEditMode();
    }
  };

  const onCancelClick = () => {
    props.deactivateEditMode();
    dispatch(showErrorMessages(null));
  };

  let error = useSelector((state: AppStateType) => state.profilePage.errorMessages);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.userEditingData}>
      <div className={s.formField}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
        </div>
        <input
          id="fullName"
          type="text"
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
          {...register("aboutMe")}
        />
      </div>
      <div className={cn(s.checkbox, s.formField)}>
        <span>Looking for a job:</span>
        <input
          type="checkbox"
          id="lookingForAJob"
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
            {...register(`contacts.${key as keyof ContactType}`)}
          />
        </div>
      ))}
      <div>
        {error && (
          <p style={{ color: "red" }}>{error?.join(", ") || "Error!"}</p>
        )}
      </div>
      <CustomContentButton type="submit">Save changes</CustomContentButton>
      <span>
        <CustomContentButton
          className={s.cancelChangesBtn}
          type="button"
          onClick={onCancelClick}
        >
          Cancel changes
        </CustomContentButton>
      </span>
    </form>
  );
};

export default ProfileDataForm;
