import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { NewuserApi } from "../../api";

const Signup = () => {
  const [firstName, setFirstName] = useState<string>();
  const [lasttName, setLastName] = useState<string>();
  const [email, setemail] = useState<string>();
  const [pass, setPass] = useState();
  const [showpass, setshowpass] = useState<boolean>(false);
  const navigator = useNavigate();
  /* validate function */
  const validateFunction = (regex: RegExp, elementID: string, element: any) => {
    if (element.target.value === "") {
      document.getElementById(elementID)?.classList.add("remove");
    } else if (!regex.test(element.target.value)) {
      document.getElementById(elementID)?.classList.remove("remove");
      return true;
    } else if (
      !document.getElementById(elementID)?.classList.contains("remove")
    ) {
      document.getElementById(elementID)?.classList.add("remove");
      return false;
    }
  };
  /*emil exist function */
  const emailExistFunction = (elementID: string) => {
    document.getElementById(elementID)?.classList.remove("remove");
  };
  var nameVal = new RegExp("[A-Za-z]");
  var emailVal = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  /* first name validation */
  const firstNameval = (e: any) => {
    validateFunction(nameVal, "user-fname", e);
    if (!validateFunction(nameVal, "user-fname", e)) {
      setFirstName(e.target.value);
    }
  };
  /* last name validation */
  const lastNameval = (e: any) => {
    validateFunction(nameVal, "user-lname", e);
    if (!validateFunction(nameVal, "user-lname", e)) {
      setLastName(e.target.value);
    }
  };
  /* email validation */
  const UserNameVal = (e: any) => {
    validateFunction(emailVal, "user-email", e);

    if (!validateFunction(emailVal, "user-email", e)) {
      setemail(e.target.value);
    }
  };
  /* password validation */
  const valPass = (e: any) => {
    setPass(e.target.value);
    /*check pass length */
    if (!(e.target.value.length >= 8 && e.target.value.length < 20)) {
      document.getElementById("length")?.classList.remove("remove");
    } else {
      document.getElementById("length")?.classList.add("remove");
    }
  };
  /* submit validate */
  const submitVal = (e: any) => {
    if (
      !validateFunction(nameVal, "user-lname", e) &&
      !validateFunction(nameVal, "user-fname", e) &&
      validateFunction(emailVal, "user-email", e)
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
          if (res.data.message == "Email already exist") {
            emailExistFunction("email-exist");
          } else {
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
              <p className="remove remove-style" id="user-fname">
                name should be string
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
              <p className="remove remove-style" id="user-lname">
                name should be string
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
            <p className="remove remove-style" id="user-email">
              email is not valid
            </p>
            <p className="remove remove-style" id="email-exist">
              email already exist
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
            <p className="remove remove-style" id="length">
              password length between 8 & 20 char
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
