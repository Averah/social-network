import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile, saveProfileSuccess } from "../../../redux/profileReducer";
import s from "./ProfileInfo.module.css";

const ProfileDataForm = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: props.profile});

  const dispatch = useDispatch();
  // useEffect(() => {
  //   reset(props.profile);
  // }, [props.profile]);

  const onSubmit = (data) => {
    console.log(data);
    const deactivateEditMode = props.deactivateEditMode
    dispatch(saveProfile(data))
    deactivateEditMode()
    

  };
  const error = useSelector((state) => state.auth.errorMessages);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
      <b><label for="fullName">Full Name:</label></b>
        <input
        id='fullName'
          type="text"
          name="fullName"
          onBlur
          {...register("fullName", {
            required: "Please enter name",
          })}
        />
        {/* <div>
          {errors?.email && (
            <p style={{ color: "red" }}>{errors.email?.message || "Error!"}</p>
          )}
        </div> */}
      </div>
      <div>
      <b><label for="aboutMe">About me:</label></b>
        <input type="text" id='aboutMe' name="aboutMe" {...register("aboutMe")}/>
        {/* <div>
          {errors?.password && (
            <p style={{ color: "red" }}>
              {errors?.password?.message || "Error!"}
            </p>
          )}
        </div> */}
        <div>
          <p style={{ color: "red" }}>{error?.join()}</p>
        </div>
      </div>
      <div className={s.checkbox}>
        <b>Looking for a job:</b>
        <input type="checkbox" id="lookingForAJob" name="checkbox" {...register("lookingForAJob")}/>
        <label for="true"></label>
      </div>
      <div>
      <b><label for="lookingForAJobDescription">My professional skills:</label></b>
        <input
          type="textarea"
          name="lookingForAJobDescription"
          id='lookingForAJobDescription'
          {...register("lookingForAJobDescription")}
        />
      </div>
       {Object.entries(props.profile.contacts).map(([key, value]) => 
          <div className={s.contact}>
            <b><label for='contact'>{key}</label></b>
            <input type='text' name={`contacts.${key}`} {...register(`contacts.${key}`)} />
          </div>)}
      <button type="submit">Save changes</button>
    </form>
  );
};

export default ProfileDataForm;
