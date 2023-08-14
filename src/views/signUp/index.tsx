import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { NewuserApi } from "../../api";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import welcomeimg from "./../../assets/images/Layer 1.svg";
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
  const { setAuth } = useContext<any>(AuthContext);
  const { setUser } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);

  useEffect(() => {
    if (user?.id && auth.access_token) {
      navigator("/main");
    }
  }, [auth, user]);
  /*emil exist function */

  var nameVal = new RegExp("^[A-Za-z]*$");
  var emailVal = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  /* first name validation */
  const firstNameval = (e?: any) => {
    if (e.target.value === "") {
      setfNameErrMSG("");
    } else if (!nameVal.test(e.target.value)) {
      setfNameErrMSG("enter valid name");
    } else {
      setfNameErrMSG("");
      setFirstName(e.target.value);
    }
  };

  /* last name validation */
  const lastNameval = (e: any) => {
    if (e.target.value === "") {
      setlNameErrMSG("");
    } else if (!nameVal.test(e.target.value)) {
      setlNameErrMSG("enter valid name");
    } else {
      setlNameErrMSG("");
      setLastName(e.target.value);
    }
  };
  /* email validation */
  const userEmailVal = (e: any) => {
    if (e.target.value === "") {
      setemailErrMSG("");
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
    if (e.target.value === "") {
      setpassErrMSG("");
    }
  };

  /* submit validate */
  const submitVal = async (e: any) => {
    if (!firstName) {
      setfNameErrMSG("Fname is required");
      return;
    } else if (firstName.trim().length < 2 && firstName.trim().length > 0) {
      setfNameErrMSG("Fname is Short");
      return;
    } else {
      setfNameErrMSG("");
    }

    if (!lasttName) {
      setlNameErrMSG("Lname is required");
      return;
    } else if (lasttName.trim().length < 2 && lasttName.trim().length > 0) {
      setlNameErrMSG("Lname is Short");
      return;
    } else {
      setlNameErrMSG("");
    }

    if (
      fNameErrMSG.length === 0 &&
      lNameErrMSG.length === 0 &&
      passErrMSG.length === 0 &&
      emailErrMSG.length === 0
    ) {
      await axios({
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
          //restore all data stores
          setUser({});
          setAuth({});
          //set new data to context
          setAuth(res.data);
          //  add to localStorage
          const accessToken = res?.data?.access_token;
          const refreshToken = res?.data?.refresh_token;
          const userId = res?.data?.id;
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("token", refreshToken);
          localStorage.setItem("user_id", userId);
          // if email is already signed up once before
          if (res.data.message === "Email already exist") {
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
        <div className="welcome-msg">
          <div className="auth-welcome-container">
            <div className="welcome-app-logo">
              <img src={welcomeimg} alt="" />
              <h1>Let’s get started</h1>
            </div>
          </div>
        </div>
        <div className="signup-block">
          <div className="r-welcome-app-logo">
            <img src={welcomeimg} alt="" />
          </div>
          <div className="signup-auth-head">
            <h1 className="Welcome-back">Sign Up</h1>
            <p>Create an account with email to login form anywhere.</p>
          </div>
          {/* First name input*/}
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
          </div>
          <p className=" err-msg" id="user-fname">
            {fNameErrMSG}
          </p>
          {/* Last name input*/}
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
          </div>
          <p className="err-msg" id="user-lname">
            {lNameErrMSG}
          </p>
          {/* email  input*/}
          <div className="signup__field">
            <input
              onChange={(e) => {
                userEmailVal(e);
              }}
              type="email"
              className=" signup__input"
              placeholder="Email adress"
              required
            />
          </div>
          <p className="err-msg" id="user-email">
            {emailErrMSG}
          </p>
          {/* Password input*/}

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
          <p className=" err-msg" id="length">
            {passErrMSG}
          </p>
          <p className="go-signup">
            Already have account?
            <Link className="go-signup-link" to={"/login"}>
              {" Login"}
            </Link>
          </p>
          {/* Submit*/}
          <div className="submit__feild">
            <button
              onClick={(e) => {
                submitVal(e);
              }}
              className="button signup__submit"
              type="submit"
            >
              <span className="button__text">Sign up</span>
            </button>
          </div>
          <div className="continue-with">
            <span className="showw "> </span>
            <span className="cont-with">Or continue with</span>
            <span className="showw reversed"> </span>
          </div>
          <button className="social-submit" type="submit">
            <span className="button__text">
              <i className="fa-brands fa-google"></i> Sign Up with Google
            </span>
          </button>
          <button className="social-submit" type="submit">
            <span className="button__text">
              <i className="fa-brands fa-facebook"></i>Sign Up with Facebook
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
