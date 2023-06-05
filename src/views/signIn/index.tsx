import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { UsersApi } from "../../api";

const SignIn = () => {
  const [email, setEmail] = useState<string>();
  const [pass, setPass] = useState<string>();
  const [showpass, setshowpass] = useState<boolean>(false);

  /* user function */
  const valUserName = (e: any) => {
    setEmail(e.target.value);
  };
  /* password function */
  const valPass = (e: any) => {
    setPass(e.target.value);
  };
  /* submit */
  const submitVal = (e: any) => {
    e.preventDefault();
    axios({
      method: "post",
      url: UsersApi,
      data: {
        email: email,
        password: pass,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="log-in">
      <div className="container">
        <div className="login-block">
          <h1 className="Welcome-back">Welcome Back!</h1>
          {/* Login input*/}
          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input
              onChange={(e) => {
                valUserName(e);
              }}
              type="email"
              className=" login__input"
              placeholder="Email"
              required
            />
          </div>
          {/* password input*/}
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input
              onChange={(e) => {
                valPass(e);
              }}
              type={showpass ? "text" : "password"}
              className="  login__input  "
              placeholder="Password"
              required
            ></input>
            {/* show pass icon */}
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
            <Link className="links" to={"/"}>
              <p>Forget password ? </p>
            </Link>
          </div>
          {/* submit button */}
          <button
            onClick={(e) => {
              submitVal(e);
            }}
            className="button login__submit"
            type="submit"
          >
            <span className="button__text">Log In</span>
          </button>
          <div className="continue-with">
            <span className="showw"></span>
            <span className="cont-with">Or continue with</span>
            <span className="showw reversed"> </span>
          </div>
          <button className="button login__submit" type="submit">
            <span className="button__text">
              <i className="fa-brands fa-google"></i> LogIn with Google
            </span>
          </button>
          <button className="button login__submit">
            <span className="button__text">
              <i className="fa-brands fa-facebook"></i>LogIn with Facebook
            </span>
          </button>
          <span className="login-register">
            {" "}
            Don’t have account?{" "}
            <Link to={"/"} className="register-link">
              Sign up
            </Link>{" "}
          </span>
        </div>
      </div>
    </form>
  );
};
export default SignIn;
