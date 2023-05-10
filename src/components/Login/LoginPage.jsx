import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginForm from "./LoginHookForm.jsx";

const LoginPage = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
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
