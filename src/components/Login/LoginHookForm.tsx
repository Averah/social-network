import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signIn} from '../../redux/authReducer';
import { AppStateType } from '../../redux/redux-store';


type UserSubmitType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
  error?: Array<string>
}

const LoginForm:React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitType>({ mode: "onBlur" });

  const dispatch = useDispatch();

  const onSubmit = (data:UserSubmitType) => {
    dispatch(signIn(data));
  };
  const error = useSelector((state:AppStateType) => state.auth.errorMessages);
  const captchaURL = useSelector((state:AppStateType) => state.auth.captchaURL);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          placeholder="Your e-mail"
          type="email"
          {...register("email", {
            required: "E-mail is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter valid e-mail",
            },
          })}
        />
        <div>
          {errors?.email && (
            <p style={{ color: "red" }}>{errors.email?.message || "Error!"}</p>
          )}
        </div>
      </div>
      <div>
        <input
          placeholder="Your password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
      </div>
      <div>
        <input
          id="rememberMe"
          type="checkbox"
          {...register("rememberMe")}
        ></input>
        <label htmlFor="rememberMe">Remember me</label>
      </div>
      <div>
        <p style={{ color: "red" }}>{error}</p>
      </div>
      {captchaURL && (
        <div>
          <img src={captchaURL} alt="captcha" />
        </div>
      )}
      {captchaURL && <div><input type='text' {...register("captcha")}></input></div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
