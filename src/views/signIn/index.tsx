import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import "./styles.css";
import axios from "../../api/axios";
import RefreshToken from "../../services/refreshToken";
import welcomeimg from "./../../assets/images/Layer 1.svg";
const LOGIN_URL = "auth/login";

const SignIn = () => {
  const { setAuth } = useContext<any>(AuthContext);
  const { setUser } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const navigator = useNavigate();

  useEffect(() => {
    if (user?.id && auth.access_token) {
      navigator("/main");
    }
  }, [auth, user]);
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [showpass, setshowpass] = useState<boolean>(false);
  const [errmsg, setErrMsg] = useState<string>("");
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
    if (!email && !pass) {
      setErrMsg("Email and password are required");
      return;
    }
    try {
      const response = await axios.post(LOGIN_URL, {
        email: email,
        password: pass,
      });
      setUser({});
      setAuth({});
      console.log(response);
      setAuth(response.data);
      setUser(response.data);
      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      const userId = response?.data?.id;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("token", refreshToken);
      localStorage.setItem("user_id", userId);
      navigator("/main");
      return <RefreshToken />;
    } catch (err: any) {
      console.log(err);
      if (!err) {
        setErrMsg("No server response");
      } else if (err.response && err.response.status) {
        if (
          err.response.status === 400 &&
          err.response.data.message === "email should not be empty"
        ) {
          setErrMsg("Email should not be empty");
        } else if (
          err.response.status === 400 &&
          err.response.data.message === "password should not be empty"
        ) {
          setErrMsg("Password should not be empty");
        } else if (err.response.status === 401) {
          setErrMsg("Unauthorized");
        } else if (err.response.status === 403) {
          setErrMsg("Wrong email or password");
        } else if (
          err.response.status === 400 &&
          err.response.data.message === "Invalid email or password"
        ) {
          setErrMsg("Wrong email or password");
        } else {
          setErrMsg("An error occurred");
        }
      }
    }
  };

  return (
    <form className="log-in">
      <div className="container">
        <div className="welcome-msg">
          <div className="auth-welcome-container">
            <div className="welcome-app-logo">
              <img src={welcomeimg} alt="" />
              <h1>Welcome Back!</h1>
            </div>
          </div>
        </div>
        <div className="login-block">
          <div className="r-welcome-app-logo">
            <img src={welcomeimg} alt="" />
          </div>
          <div className="login-auth-head">
            <h1 className="Welcome-back">Login</h1>
            <p>please login to your account</p>
          </div>

          {/* Login input*/}
          <div className="login__field">
            <input
              onChange={(e) => {
                valUserName(e);
              }}
              type="email"
              className=" login__input"
              placeholder="your Email"
              required
            />
          </div>
          {/* password input*/}
          <div className="login__field">
            <input
              onChange={(e) => {
                valPass(e);
              }}
              type={showpass ? "text" : "password"}
              className="  login__input  "
              placeholder="your Password"
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
          </div>
          <Link className="links" to={"/emailconfim"}>
            <p>Forget password ? </p>
          </Link>
          {/* submit button */}
          <p className="baby-name-err">{errmsg}</p>

          <div className="submit__feild">
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
          <p className="go-signup">
            Don’t have account?
            <Link className="go-signup-link" to={"/signup"}>
              {" Sign up"}
            </Link>
          </p>
          {/* submit button */}
          <div className="continue-with">
            <span className="showw"></span>
            <span className="cont-with">Or continue with</span>
            <span className="showw reversed"> </span>
          </div>
          <button className="social-submit" type="submit">
            <span className="button__text">
              <i className="fa-brands fa-google"></i> LogIn with Google
            </span>
          </button>
          <button className="social-submit">
            <span className="button__text">
              <i className="fa-brands fa-facebook"></i>LogIn with Facebook
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};
export default SignIn;
