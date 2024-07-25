import React from 'react';
import LoginForm from "../components/Forms/LoginForm";
import SignupForm from "../components/Forms/SignupForm";
import "../static/css/loginform.css"

export const Login = () => {
  return (
        <div className={"d-flex flex-column min-vh-100"}>
          <LoginForm/>
        </div>
  );
};

export const SignUp = () => {
  return (
        <div className={"d-flex flex-column min-vh-100"}>
          <SignupForm/>
        </div>
  );
}
