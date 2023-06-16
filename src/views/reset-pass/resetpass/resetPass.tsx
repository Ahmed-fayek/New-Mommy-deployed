import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RessetPassword } from "../../../api";
import "./styles.css";
import axios from "../../../api/axios";
import { EmailConfirmm } from "..";
import { ConfirmCode } from "../Accesscode/AccessCode";

const ResetPAss = () => {
  const [showpass, setshowpass] = useState<boolean>(false);
  const [errmsg, setErrMsg] = useState<string>();
  const [password, setpassword] = useState<string>("");
  const navigator = useNavigate();

  const handleEmailSubmit = async (e: any) => {
    if (!ConfirmCode) {
      setErrMsg("session ended");
    }
    e.preventDefault();
    setErrMsg("");
    await axios({
      method: "post",
      url: RessetPassword + ConfirmCode,
      data: {
        email: EmailConfirmm,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // try {
    //   const response = await axios.post(RessetPassword, {
    //     password: password,
    //   });
    //   console.log(response);

    //   // navigator("/login");
    // } catch (err: any) {
    //   console.log(err);
    // if (!err) {
    //   setErrMsg(" No server response");
    // } else if (
    //   err.response?.status == 400 &&
    //   err.response.data.message == "email should not be empty"
    // ) {
    //   setErrMsg("email should not be empty");
    // } else if (
    //   err.response?.status == 400 &&
    //   err.response.data.message == "password should not be empty"
    // ) {
    //   setErrMsg(" password should not be empty");
    // } else if (err.response?.status == 401) {
    //   setErrMsg("unouthorized");
    // } else if (
    //   err.response.status == 400 &&
    //   err.response.data.message == "Invalid email or password"
    // ) {
    //   setErrMsg("wrong email or password");
    // }
    // }
  };
  return (
    <form className="reset-password">
      <div className="container">
        <div className="reset-password-block">
          <p className="forget-password-msg">
            Please Enter the the new password for your account
          </p>
          {/* reset-password input*/}
          <div className="reset-password__field">
            <i className="reset-password__icon fas fa-lock"></i>
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type={showpass ? "text" : "password"}
              className="  reset-password__input  "
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
          </div>
          <div className="reset-password__field">
            <i className="reset-password__icon fas fa-lock"></i>
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type={showpass ? "text" : "password"}
              className="  reset-password__input  "
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
          </div>
          {/* submit button */}
          <div className="submit__feild">
            <button
              onClick={(e) => {
                handleEmailSubmit(e);
              }}
              className="button reset-password__submit"
              type="submit"
            >
              <span className="button__text">Reset</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ResetPAss;
