import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import { AddNewCategory } from "../../../../api";

const AddMedical = () => {
  const navigator = useNavigate();
  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  let currentDate: Date = new Date();
  let dateFormat = currentDate.toJSON().slice(0, 10);
  const [doctorName, setdoctorName] = useState<string>("");
  const [diagnosis, setdiagnosis] = useState<string>("");
  const [reportDate, setreportDate] = useState<string>(dateFormat);
  const [DRErrMsg, setDRErrMsg] = useState<string>("");
  const [diagnosisErrMsg, setdiagnosisErrMsg] = useState<string>("");
  const [SubmiterrMsg, setSubmiterrMsg] = useState<string>("");
  const [successMessageVisible, setSuccessMessageVisible] =
    useState<string>("");

  /* Update value tells me if this is adding or update */
  const { meddicalId } = useParams();
  const [Update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (meddicalId) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  }, [meddicalId]);

  useEffect(() => {
    if (Update) {
      if (user) {
        axios({
          method: "GET",
          url: `${AddNewCategory}/medicalRecord/${meddicalId}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            // //console.log(response);
            setdoctorName(response.data.medicalDocument.doctorName);
            setdiagnosis(response.data.medicalDocument.diagnosis);
            setreportDate(response.data.medicalDocument.date);
          })
          .catch((error) => {
            // //console.log(error);
          });
      }
    }
  }, [Update, user]);
  var nameVal = new RegExp("^[A-Za-z]*$");

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
    // //console.log(user);

    const data = {
      date: reportDate,
      doctorName: doctorName,
      diagnosis: diagnosis,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    if (!Update) {
      await axios
        .post(
          `${AddNewCategory}/addMedicalRecord/${user.baby[0].id}`,
          data,
          config
        )
        .then((response) => {
          // //console.log(response.data);
        })
        .catch((error) => {
          // //console.log(error);
        });
    } else {
      await axios
        .patch(
          `${AddNewCategory}/updateMedicalRecord/${meddicalId}`,
          data,
          config
        )
        .then((response) => {
          // //console.log(response.data);
        })
        .catch((error) => {
          // //console.log(error);
        });
    }
  };

  return (
    <div className="add-medical">
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
              value={doctorName}
            />
            <p>{DRErrMsg}</p>
          </div>
          {/* Diagnosis */}
          <div className="input__field">
            <label htmlFor="babyName">Diagnosis</label>
            <input
              onChange={(e) => {
                DiagnosisVal(e);
              }}
              id="babyName"
              name="DiagnosisVal"
              type="email"
              className=" the__input"
              placeholder="Diagnosis"
              value={diagnosis}
              required
            />
            <p>{diagnosisErrMsg}</p>
          </div>
          {/* Submit */}
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
            <span className="button__text"> Add Medical</span>
          </button>
          {/*err msg */}
          <p>{SubmiterrMsg}</p>
          {/*Go to Main */}
          <button
            onClick={() => {
              navigator("/main");
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text"> Go to Main</span>
          </button>
        </div>
        <div className="msg">
          <p>{successMessageVisible}</p>
        </div>
      </div>
    </div>
  );
};
export default AddMedical;
