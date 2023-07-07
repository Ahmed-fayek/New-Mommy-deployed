import "./styles.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCCode } from "../../../api";
import axios from "../../../api/axios";
import AuthContext from "../../../conrext/AuthProvider";
const AccessCode = () => {
  const { EmailCon } = useContext<any>(AuthContext);
  const { setCodeCon } = useContext<any>(AuthContext);

  const [firConCode, setfirConCode] = useState<string>("");
  const [secConCode, setsecConCode] = useState<string>("");
  const [thirdConCode, setthirdConCode] = useState<string>("");
  const [fourthConCode, setfourthConCode] = useState<string>("");
  const [errmsg, setErrMsg] = useState<string>("");
  const navigator = useNavigate();
  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    if (firConCode && secConCode && thirdConCode && fourthConCode) {
      setErrMsg("");
      axios({
        method: "post",
        url:
          ACCCode +
          `/${firConCode}${secConCode}${thirdConCode}${fourthConCode}`,

        data: {
          email: EmailCon,
        },
      })
        .then((res) => {
          console.log(res);
          navigator("/resetpass");
          setCodeCon(
            `/${firConCode}${secConCode}${thirdConCode}${fourthConCode}`
          );
        })
        .catch((err) => {
          console.log(err);

          if (!err) {
            setErrMsg(" No server response");
          } else if (
            err.response?.status == 400 &&
            err.response.data.message == "email must be an email"
          ) {
            setErrMsg("wrong code");
          } else if (
            err.response?.status == 400 &&
            err.response.data.message == "user doesn't exist"
          ) {
            setErrMsg("please enter correct code ");
          }
        });
    } else {
      setErrMsg("write code");
    }

    // try {

    //   const response = await axios.post(ACCCode,
    //     {
    //     firConCode: firConCode,
    //   });
    //   console.log(response);
    //   // navigator("/babymoon");
    // } catch (err: any) {
    //   console.log(err);
    // }
  };
  return (
    <form className="confirm-code">
      <div className="container">
        <div className="confirm-code-block">
          <p className="forget-password-msg">
            Please Enter the 4 digit code we sent you via Email
          </p>
          {/* confirm-code input*/}
          <div className="confirm-code__field">
            <input
              id="first-con-code"
              onChange={(e) => {
                setfirConCode(e.target.value);

                if (e.target.value) {
                  document.getElementById("second-con-code")?.focus();
                }
              }}
              type="text"
              min={0}
              max={9}
              minLength={0}
              maxLength={1}
              className=" confirm-code__input"
              value={firConCode}
              required
            />
            <input
              id="second-con-code"
              onChange={(e) => {
                setsecConCode(e.target.value);

                document.getElementById("third-con-code")?.focus();
              }}
              type="text"
              min={0}
              max={9}
              minLength={0}
              maxLength={1}
              className=" confirm-code__input"
              value={secConCode}
              required
            />
            <input
              id="third-con-code"
              onChange={(e) => {
                setthirdConCode(e.target.value);

                document.getElementById("fourth-con-code")?.focus();
              }}
              type="text"
              min={0}
              max={9}
              minLength={0}
              maxLength={1}
              className=" confirm-code__input"
              value={thirdConCode}
              required
            />
            <input
              id="fourth-con-code"
              onChange={(e) => {
                setfourthConCode(e.target.value);
              }}
              type="text"
              min={0}
              max={9}
              minLength={0}
              maxLength={1}
              className=" confirm-code__input"
              value={fourthConCode}
              required
            />
            <input
              onClick={() => {
                setfirConCode("");
                setsecConCode("");
                setthirdConCode("");
                setfourthConCode("");
              }}
              type="button"
              min={0}
              max={9}
              minLength={0}
              maxLength={1}
              className=" confirm-code__clear"
              value={"clear"}
              required
            />
          </div>
          {/* submit button */}
          <div className="submit__feild">
            <p className="reset-pass-err">{errmsg}</p>

            <button
              onClick={(e) => {
                handleEmailSubmit(e);
              }}
              className="button confirm-code__submit"
              type="submit"
            >
              <span className="button__text">Verify</span>
            </button>
            <p className="resend-code" onClick={(e) => {}}>
              Resend Code
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
export default AccessCode;
