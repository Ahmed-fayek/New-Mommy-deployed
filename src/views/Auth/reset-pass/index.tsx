import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "./styles.css";
import forgotpass from "./../../../assets/images/forgot-pass.svg";
import logo from "./../../../assets/images/Layer 1.svg";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import { EmailConfirmation } from "../../../api";
// import "bootstrap/dist/css/bootstrap.min.css";

const EmailConfirm = () => {
  const { SetemailCon } = useContext<any>(AuthContext);
  const [email, setemail] = useState<string>("");
  const [errmsg, setErrMsg] = useState<string>("");
  const navigator = useNavigate();
  const emailVal = (e: any) => {
    setemail(e.target.value);
  };
  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    setErrMsg("");
    await axios({
      method: "post",
      url: EmailConfirmation,
      data: {
        email: email,
      },
    })
      .then((res) => {
        SetemailCon(email);
        navigator("/confirmcode");
        // console.log(res);
      })
      .catch((err) => {
        if (!err) {
          setErrMsg(" No server response");
        } else if (
          err.response?.status == 400 &&
          err.response.data.message == "email must be an email"
        ) {
          setErrMsg("write email correctlly");
        } else if (
          err.response?.status == 400 &&
          err.response.data.message == "email doesn't exist"
        ) {
          setErrMsg("email doesn't exist");
        }
      });
  };

  return (
    <>
      <header className="">
        <div className="img-logo">
          <img src={logo} alt="img" />
        </div>
      </header>

      <div className="main-container ">
        <div className="img-forgotpass">
          <img src={forgotpass} alt="image" />
        </div>

        <form
          className="reset-pass"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="container">
            <div className="reset-pass-block">
              <h1 className="forget-password ">Forgot Password?</h1>
              <p className="forget-password-msg">
                Don't worry! it happens. Please check your email account to
                reset your password.
              </p>
              {/* reset-pass input*/}
              <div className="reset-pass__field">
                {/* <i className="reset-pass__icon fas fa-user"></i> */}
                <input
                  onChange={(e) => {
                    emailVal(e);
                  }}
                  type="email"
                  className=" reset-pass__input"
                  placeholder="Enter Your Email"
                  required
                />
              </div>

              <div className="Container-ButtonsResetPass">
                {/* submit button */}

                <div className="submit__feild">
                  <button
                    onClick={(e) => {
                      navigator("/login");
                    }}
                    className="button cancel__submit"
                  >
                    <span className=" button-cancel">cancel</span>
                  </button>
                </div>
                <div className="submit__feild">
                  <p className="reset-pass-err">{errmsg}</p>

                  <button
                    onClick={(e) => {
                      handleEmailSubmit(e);
                    }}
                    className="button reset-pass__submit"
                  >
                    <span className="button__text">next</span>
                  </button>
                </div>

                {/* <div className="submit__feild">
            <button
              onClick={(e) => {
                navigator("/login");
              }}
              className="button cancel__submit"
            >
              <span className=" button-cancel">cancel</span>
            </button>
          </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default EmailConfirm;
