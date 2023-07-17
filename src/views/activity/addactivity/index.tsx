import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { NewbabyApi } from "../../../api";
import AuthContext from "../../../conrext/AuthProvider";

const AddActivity = () => {
  const navigator = useNavigate();

  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);

  let currentDate: Date = new Date();
  let dateFormat: string = `${currentDate.getFullYear()}-${
    currentDate.getMonth() < 10
      ? `0` + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1
  }-${
    currentDate.getDate() < 10
      ? `0` + currentDate.getDate()
      : currentDate.getDate()
  }`;

  const [doctorName, setdoctorName] = useState<string>("");
  const [diagnosis, setdiagnosis] = useState<string>("");
  const [reportDate, setreportDate] = useState<string>(dateFormat);
  const [DRErrMsg, setDRErrMsg] = useState<string>("");
  const [diagnosisErrMsg, setdiagnosisErrMsg] = useState<string>("");
  const [SubmiterrMsg, setSubmiterrMsg] = useState<string>("");
  const [successMessageVisible, setSuccessMessageVisible] =
    useState<string>("");

  /* validate function */

  var nameVal = new RegExp("[A-Za-z]");

  /* Dr Name  */
  const drNameVal = (e: any) => {
    if (!nameVal.test(e.target.value)) {
      setDRErrMsg("invalid data");
    } else {
      setdoctorName(e.target.value);
      setDRErrMsg("");
    }
  };

  /* report Date  */
  const reportDateVal = (e: any) => {
    setreportDate(e.target.value);
  };

  /* diagnosis  */
  const DiagnosisVal = (e: any) => {
    if (!nameVal.test(e.target.value)) {
      setdiagnosisErrMsg("invalid data");
    } else {
      setdiagnosis(e.target.value);
      setdiagnosisErrMsg("");
    }
  };

  /* submit  */

  const submitVal = async () => {
    await axios({
      method: "post",
      url: `https://13.51.206.195:3002/api/users/addActivity/${user.id}`,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },

      data: {},
    })
      .then((res) => {
        console.log(res);

        setSuccessMessageVisible("successful added "); // Show success message

        // Redirect to main page after 3 seconds
        setTimeout(() => {
          navigator("/main");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="add-activity">
      <div className="container">
        <div className="signup-block">
          {/*Date */}
          <div className="input__field">
            <label htmlFor="Date"> Date</label>
            <input
              onChange={(e) => {
                reportDateVal(e);
              }}
              type="date"
              className="the__input "
              name="reportDate"
              id="Date"
              min="2018-12-31"
              max={dateFormat}
              value={reportDate}
              required
            />
          </div>

          {/* Dr. Name */}
          <div className="input__field">
            <label htmlFor="DrName"> Dr. Name</label>
            <input
              onChange={(e) => {
                drNameVal(e);
              }}
              type="text"
              className="the__input "
              placeholder="Dr Name"
              name=" DrName"
              id="DrName"
            />
            <p>{DRErrMsg}</p>
          </div>
          {/* DiagnosisVal */}
          <div className="input__field">
            <label htmlFor="babyName">DiagnosisVal</label>
            <input
              onChange={(e) => {
                DiagnosisVal(e);
              }}
              id="babyName"
              name="DiagnosisVal"
              type="email"
              className=" the__input"
              placeholder="DiagnosisVal"
              required
            />
            <p>{diagnosisErrMsg}</p>
          </div>
          <div></div>

          <button
            onClick={() => {
              if (diagnosisErrMsg == "" && DRErrMsg == "") {
                setSubmiterrMsg("");
                submitVal();
              } else {
                setSubmiterrMsg("check data");
              }
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text"> Add baby</span>
          </button>
          <p>{SubmiterrMsg}</p>
          <button
            onClick={() => {
              navigator("/main");
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text"> skip now</span>
          </button>
        </div>
        <div className="msg">
          <p>{successMessageVisible}</p>
        </div>
      </div>
    </div>
  );
};
export default AddActivity;
