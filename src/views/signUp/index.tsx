import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { NewuserApi } from "../../api";
import axios from "../../api/axios";
// import SetToken from "../../token";

const Signup = () => {
  const [firstName, setFirstName] = useState<string>();
  const [lasttName, setLastName] = useState<string>();
  const [email, setemail] = useState<string>();
  const [pass, setPass] = useState();
  const [showpass, setshowpass] = useState<boolean>(false);
  const [fNameErrMSG, setfNameErrMSG] = useState<string>("");
  const [lNameErrMSG, setlNameErrMSG] = useState<string>("");
  const [emailErrMSG, setemailErrMSG] = useState<string>("");
  const [passErrMSG, setpassErrMSG] = useState<string>("");
  const navigator = useNavigate();

  /*emil exist function */

  var nameVal = new RegExp("[A-Za-z]");
  var emailVal = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  /* first name validation */
  const firstNameval = (e?: any) => {
    if (e.target.value == "") {
      setfNameErrMSG("write first name");
    } else if (!nameVal.test(e.target.value)) {
      setfNameErrMSG("enter valid name");
    } else {
      setfNameErrMSG("");
      setFirstName(e.target.value);
    }
  };

  /* last name validation */
  const lastNameval = (e: any) => {
    if (e.target.value == "") {
      setlNameErrMSG("write last name");
    } else if (!nameVal.test(e.target.value)) {
      setlNameErrMSG("enter valid name");
    } else {
      setlNameErrMSG("");
      setLastName(e.target.value);
    }
  };
  /* email validation */
  const UserNameVal = (e: any) => {
    if (e.target.value == "") {
      setemailErrMSG("write Email");
    } else if (!emailVal.test(e.target.value)) {
      setemailErrMSG("wrong email");
    } else {
      setemailErrMSG("");
      setemail(e.target.value);
    }
  };
  /* password validation */
  const valPass = (e: any) => {
    setPass(e.target.value);
    /*check pass length */
    if (!(e.target.value.length >= 8 && e.target.value.length < 20)) {
      setpassErrMSG("password length between 8 and 20");
    } else {
      setpassErrMSG("");
    }
  };

  /* submit validate */
  const submitVal = (e: any) => {
    if (
      fNameErrMSG.length == 0 &&
      lNameErrMSG.length == 0 &&
      passErrMSG.length == 0 &&
      emailErrMSG.length == 0
    ) {
      axios({
        method: "post",
        url: NewuserApi,
        data: {
          firstname: firstName,
          lastname: lasttName,
          email: email,
          password: pass,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.message == "Email already exist") {
            setemailErrMSG("email-exist");
          } else {
            setemailErrMSG("");
            navigator("/babymoon");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="sign-up">
      <div className="container">
        <div className="signup-block">
          <div>
            <h1 className="lets-start">Lets Get Started</h1>
            <p className="create-acc">
              Create an account with email to login form anywhere.
            </p>
          </div>
          <div className="full-name">
            <div className="signup__field">
              <input
                onChange={(e) => {
                  firstNameval(e);
                }}
                type="email"
                className=" signup__input"
                placeholder="First name"
                required
              />
              <p className=" remove-style" id="user-fname">
                {fNameErrMSG}
              </p>
            </div>
            <div className="signup__field">
              <input
                onChange={(e) => {
                  lastNameval(e);
                }}
                type="email"
                className=" signup__input"
                placeholder="Last name"
                required
              />
              <p className="remove-style" id="user-lname">
                {lNameErrMSG}
              </p>
            </div>
          </div>
          <div className="signup__field">
            <input
              onChange={(e) => {
                UserNameVal(e);
              }}
              type="email"
              className=" signup__input"
              placeholder="Email adress"
              required
            />
            <p className="remove-style" id="user-email">
              {emailErrMSG}
            </p>
          </div>
          <div className="signup__field">
            <input
              onChange={(e) => {
                valPass(e);
              }}
              type={showpass ? "text" : "password"}
              className="signup__input  "
              placeholder="Password"
              required
            />
            <p className=" remove-style" id="length">
              {passErrMSG}
            </p>
            <i
              className={
                showpass
                  ? "fa-solid fa-eye pass__icon"
                  : "fa-solid fa-eye-slash pass__icon"
              }
              onClick={() => {
                setshowpass(!showpass);
              }}
            ></i>
          </div>
          <button
            onClick={(e) => {
              submitVal(e);
            }}
            className="button signup__submit"
            type="submit"
          >
            <span className="button__text">Sign up</span>
          </button>
          <div className="continue-with">
            <span className="showw "> </span>
            <span className="cont-with">Or continue with</span>
            <span className="showw reversed"> </span>
          </div>
          <button className="button signup__submit" type="submit">
            <span className="button__text">
              <i className="fa-brands fa-google"></i> LogIn with Google
            </span>
          </button>
          <button className="button signup__submit" type="submit">
            <span className="button__text">
              <i className="fa-brands fa-facebook"></i>LogIn with Facebook
            </span>
          </button>
          <span className="signup-register">
            By signing up, you agree to our Terms of Use and Privacy Policy.
          </span>
        </div>
      </div>
    </div>
  );
};
export default Signup;
