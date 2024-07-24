import React from 'react';
import NavigationBar from "./Navbar";
import Footer from "./Footer";
import LoginForm from "./Forms/LoginForm";
import "../static/css/loginform.css"
import SignupForm from "./Forms/SignupForm";

export const Login = () => {
  return (
  <div>
      <header>
        <NavigationBar/>
      </header>
        <main className={"d-flex flex-column min-vh-100"}>
          <LoginForm/>
        </main>
        <footer>
          <Footer/>
        </footer>
  </div>
  );
};

export const SignUp = () => {
  return (
  <div>
      <header>
        <NavigationBar/>
      </header>
        <main className={"d-flex flex-column min-vh-100"}>
          <SignupForm/>
        </main>
        <footer>
          <Footer/>
        </footer>
  </div>
  );
}
