import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/authReducer";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(signIn(data));
  };
  const error = useSelector((state) => state.auth.errorMessages);
  const captchaURL = useSelector((state) => state.auth.captchaURL);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          placeholder="Your e-mail"
          type="email"
          name="email"
          onBlur
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
          name="password"
          {...register("password", { required: "Password is required" })}
        />
      </div>
      <div>
        <input
          name="rememberMe"
          id="rememberMe"
          type="checkbox"
          {...register("rememberMe")}
        ></input>
        <label for="rememberMe">Remember me</label>
      </div>
      <div>
        <p style={{ color: "red" }}>{error?.join()}</p>
      </div>
      {captchaURL && (
        <div>
          <img src={captchaURL} alt="captcha" />
        </div>
      )}
      {captchaURL && <div><input name='captcha' type='text' {...register("captcha")}></input></div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
