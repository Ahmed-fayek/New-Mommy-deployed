import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../conrext/AuthProvider";
import "./styles.css";
import axios from "../../api/axios";
const LOGIN_URL = "auth/login";

const SignIn = () => {
  const { setAuth } = useContext<any>(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [showpass, setshowpass] = useState<boolean>(false);
  const [errmsg, setErrMsg] = useState<string>("");
  const navigator = useNavigate();
  /* validate function */
  const validateFunction = (regex: RegExp, elementID: string, element: any) => {
    if (!regex.test(element.target.value)) {
      document.getElementById(elementID)?.classList.remove("remove");
      return true;
    } else if (
      !document.getElementById(elementID)?.classList.contains("remove")
    ) {
      document.getElementById(elementID)?.classList.add("remove");
      return false;
    }
  };
  var nameVal = new RegExp("[A-Za-z]");
  /* user function */
  const valUserName = (e: any) => {
    setEmail(e.target.value);
  };
  /* password function */
  const valPass = (e: any) => {
    setPass(e.target.value);
  };
  /* submit */
  const SubmitVal = async (e: any) => {
    e.preventDefault();
    setErrMsg("");
    try {
      const response = await axios.post(LOGIN_URL, {
        email: email,
        password: pass,
      });
      const accessToken = response?.data?.access_token;
      setAuth({ email, pass, accessToken });
      localStorage.setItem("access_token", accessToken);
      if (accessToken) {
        // SetToken(accessToken, response.data.access_token);
        navigator("/babymoon");
      }
    } catch (err: any) {
      if (!err) {
        setErrMsg(" No server response");
      } else if (
        err.response?.status == 400 &&
        err.response.data.message == "email should not be empty"
      ) {
        setErrMsg("email should not be empty");
      } else if (
        err.response?.status == 400 &&
        err.response.data.message == "password should not be empty"
      ) {
        setErrMsg(" password should not be empty");
      } else if (err.response?.status == 401) {
        setErrMsg("unouthorized");
      } else if (
        err.response.status == 400 &&
        err.response.data.message == "Invalid email or password"
      ) {
        setErrMsg("wrong email or password");
      }
    }
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
          <div className="submit__feild">
            <p className="baby-name-err">{errmsg}</p>
            <button
              onClick={(e) => {
                SubmitVal(e);
              }}
              className="button login__submit"
              type="submit"
            >
              <span className="button__text">Log In</span>
            </button>
          </div>
          {/* submit button */}
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
            <Link to={"/signup"} className="register-link">
              Sign up
            </Link>{" "}
          </span>
        </div>
      </div>
    </form>
  );
};
export default SignIn;
