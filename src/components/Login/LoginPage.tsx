import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginForm from "./LoginHookForm";
import { AppStateType } from '../../redux/redux-store';

const LoginPage:React.FC = () => {
  const isAuth = useSelector((state:AppStateType) => state.auth.isAuth);
  if (isAuth) {
    return <Navigate to="/profile" />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};
export default LoginPage;
