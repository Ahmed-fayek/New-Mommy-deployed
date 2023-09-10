import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "./styles.css";

import logo from "../../../../assets/images/Layer 1.svg";
import resetpassword from "../../../../assets/images/reset-pass.svg";
import AuthContext from "../../../../context/AuthProvider";
import axios from "../../../../api/axios";
import { RessetPassword } from "../../../../api";

const ResetPAss = () => {
  const { EmailCon } = useContext<any>(AuthContext);
  const { CodeCon } = useContext<any>(AuthContext);
  const [showpass, setshowpass] = useState<boolean>(false);
  const [errmsg, setErrMsg] = useState<string>();
  const [password, setpassword] = useState<string>("");
  const [passwordcon, setpasswordcon] = useState<string>("");
  const navigator = useNavigate();

  const handleEmailSubmit = async (e: any) => {
    if (!CodeCon) {
      setErrMsg("session ended");
    } else if (passwordcon !== password) {
      setErrMsg("password don't match");
    } else if (password.length > 20) {
      setErrMsg("password should be shorter");
    } else {
      e.preventDefault();
      setErrMsg("");
      await axios({
        method: "post",
        url: RessetPassword + CodeCon,
        data: {
          email: EmailCon,
          password: password,
        },
      })
        .then((res) => {
          navigator("/login");
        })
        .catch((err) => {
          // //console.log(err);

          if (!err) {
            setErrMsg(" No server response");
          } else if (!password) {
            setErrMsg("write password");
          } else if (err.response?.status === 400) {
            setErrMsg("password should be longer");
          } else {
            setErrMsg("session ended");
          }
        });
    }
  };
  return (
    <>
      <header className="">
        <div className="img-logo">
          <img src={logo} alt="img" />
        </div>
      </header>

      <section className="main-container">
        <div>
          <img src={resetpassword} alt="img" />
        </div>

        <form className="reset-password">
          <div className="container">
            <div className="reset-password-block">
              {/* <p className="forget-password-msg">
            Please Enter the the new password for your account
          </p> */}

              <h1 className="forget-password-msg">reset password</h1>

              {/* reset-password input*/}
              <div className="reset-password__field">
                {/* <i className="reset-password__icon fas fa-lock"></i> */}
                <input
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  type={showpass ? "text" : "password"}
                  className="  reset-password__input  "
                  placeholder="new password"
                  required
                ></input>
                {/* show pass icon */}

                {/* <i
              className={
                showpass
                  ? "fa-solid fa-eye pass__icon"
                  : "fa-solid fa-eye-slash pass__icon"
              }
              onClick={() => {
                setshowpass(!showpass);
              }}
            ></i> */}
              </div>
              <div className="reset-password__field">
                {/* <i className="reset-password__icon fas fa-lock"></i> */}
                <input
                  onChange={(e) => {
                    setpasswordcon(e.target.value);
                  }}
                  type={showpass ? "text" : "password"}
                  className="  reset-password__input  "
                  placeholder="confirm new Password"
                  required
                ></input>
              </div>
              {/* submit button */}
              <div className="submit__feild">
                <p className="reset-pass-err">
                  {errmsg}{" "}
                  {errmsg === "session ended" ? (
                    <Link to={"/emailconfim"}> enter email again</Link>
                  ) : (
                    ""
                  )}
                </p>
                <button
                  onClick={(e) => {
                    handleEmailSubmit(e);
                  }}
                  className="button reset-password__submit"
                  type="submit"
                >
                  <span className="button__text ">Reset password</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
export default ResetPAss;
