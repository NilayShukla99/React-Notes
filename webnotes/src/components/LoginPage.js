import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useHistory } from "react-router";

import { Link } from "react-router-dom";

// Firebase configuration
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyC4W4wdIQS3S72g7-3tpp2alm6WfDF9y5A",
  authDomain: "webnotes-13034.firebaseapp.com",
  projectId: "webnotes-13034",
  storageBucket: "webnotes-13034.appspot.com",
  messagingSenderId: "349308509647",
  appId: "1:349308509647:web:c0cb74a7528359bdc8c6ba",
});

const LoginPage = () => {
  // users signin
  const [userDetails, setUserDetails] = useState({
    email: "",
    pwd: "",
  });

  //   users signup
  const [userSignUpDetails, setUserSignUpDetails] = useState({
    u_email: "",
    u_pwd: "",
    u_cnfPwd: "",
  });

  const [Error, setError] = useState("");

  //   user input
  const handleChangeLogIn = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUserDetails({ ...userDetails, [key]: value });
  };

  const handleChangeSignUp = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setUserSignUpDetails({ ...userSignUpDetails, [key]: value });
  };

  //   to change path
  const history = useHistory();

  //   authentication
  const auth = getAuth();
  const handleAuth = (e) => {
    //   preventDefault
    e.preventDefault();

    // authentication
    let name = e.target.name;
    if (name === "logIn") {
      // sign in
      signInWithEmailAndPassword(auth, userDetails.email, userDetails.pwd)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const uid = user.uid;
          console.log(user);
          history.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode, errorMessage);
        });
    } else if (name === "signUp") {
      // sign up
      if (userSignUpDetails.u_pwd === userSignUpDetails.u_cnfPwd) {
        createUserWithEmailAndPassword(
          auth,
          userSignUpDetails.u_email,
          userSignUpDetails.u_pwd
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("added:", user);

            switchSection(userSignUpDetails.u_email);
            setUserSignUpDetails({
              u_email: "",
              u_pwd: "",
              u_cnfPwd: "",
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode, errorMessage);
          });
      } else {
        setError("Re-enter password");
      }
    }
  };

  //   styling the header
  const style = {
    siteTitle: {
      color: "#000000",
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "600",
    },
    siteTagline: {
      position: "absolute",
      top: "55px",
    },
  };

  const [classList, setclassList] = useState({
    logIn: "logIn",
    signUp: "signUp",
  });

  //   section switch for css

  const linkToSignUp = document.getElementById("linkToSignUp");
  const switchSection = () => {
    if (!classList.logIn.includes("active")) {
      setclassList({
        logIn: "logIn active",
        signUp: "signUp active",
      });
      linkToSignUp.innerText = "Log In here";
    } else {
      setclassList({
        logIn: "logIn",
        signUp: "signUp",
      });
      //   setUserDetails({ email: email });
      linkToSignUp.innerText = "Sign up here";
    }
  };

  const switchSectionClick = (e) => {
    if (e.which === 32 || e.keyCode === 13) {
      linkToSignUp.click();
    }
  };

  return (
    <>
      <header>
        <span style={style.siteTitle}>WebNotes</span>
        <p style={style.siteTagline}>A Notes taking webApp</p>
      </header>
      <div className="wraper">
        <div className="greet">
          <h1>
            👋 Hello, <span id="greet">there!</span>
          </h1>
        </div>

        <div id="sectionPanel">
          <section className={classList.logIn}>
            <h3>Sign In</h3>
            <span>{Error}</span>
            <form action="#" method="post" id="logInForm">
              <div className="inputFld">
                <input
                  type="email"
                  id="logInEmail"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChangeLogIn}
                  placeholder="your email id"
                />
              </div>
              <div className="inputFld">
                <input
                  type="password"
                  id="logInPwd"
                  name="pwd"
                  value={userDetails.pwd}
                  onChange={handleChangeLogIn}
                  placeholder="enter password"
                />
              </div>
              <input
                onClick={handleAuth}
                name="logIn"
                type="submit"
                value="Log In"
                className="btn"
                id="logInBtn"
              />
            </form>
          </section>

          <p>
            Don't have account?
            <span
              id="linkToSignUp"
              tabIndex="0"
              onClick={switchSection}
              onKeyUp={switchSectionClick}
            >
              Sign Up here
            </span>
          </p>
          <section className={classList.signUp}>
            <h3>Sign Up</h3>

            <span>{Error}</span>
            <form action="#" method="post" id="signUpForm">
              <div className="inputFld">
                <input
                  name="u_email"
                  type="email"
                  id="email"
                  onChange={handleChangeSignUp}
                  value={userSignUpDetails.u_email}
                  placeholder="email id"
                />
              </div>
              <div className="inputFld">
                <input
                  name="u_pwd"
                  type="password"
                  id="pwd"
                  onChange={handleChangeSignUp}
                  value={userSignUpDetails.u_pwd}
                  placeholder="enter password"
                />
              </div>
              <div className="inputFld">
                <input
                  name="u_cnfPwd"
                  type="password"
                  id="cpwd"
                  onChange={handleChangeSignUp}
                  value={userSignUpDetails.u_cnfPwd}
                  placeholder="confirm password"
                />
              </div>
              <input
                onClick={handleAuth}
                name="signUp"
                type="submit"
                value="Sign Up"
                className="btn"
                id="signUpBtn"
              />
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
