import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { NewbabyApi } from "../../../api";
import AuthContext from "../../../conrext/AuthProvider";

const AddMedical = () => {
  const navigator = useNavigate();

  const { auth } = useContext<any>(AuthContext);

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
  const [babyWeight, setWeight] = useState<number>(0);
  const [birthday, setbirthday] = useState<string>(dateFormat);
  const [successMessageVisible, setSuccessMessageVisible] =
    useState<string>("");
  const [file, setfile] = useState<any>();

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

  /* user  */
  const Diagnosis = (e: any) => {
    validateFunction(nameVal, "baby-name", e);
    if (!validateFunction(nameVal, "baby-name", e)) {
      setdoctorName(e.target.value);
    } else {
    }
  };

  /* birthday  */
  const birthval = (e: any) => {
    setbirthday(e.target.value);
  };

  /* weight  */
  const weightval = (e: any) => {
    setWeight(e.target.value);
    if (e.target.value > 10) {
      e.target.value = 10;
    }
  };

  /* file  */
  const formData = new FormData();

  const fileval = async (e: any) => {
    setfile(e.target.files[0]);
  };

  /* submit  */

  const submitVal = async () => {
    formData.append("images", file);
    formData.append("babyName", doctorName);
    formData.append("weight", `${babyWeight}`);
    formData.append("birthDate", birthday);
    await axios({
      method: "post",
      url: NewbabyApi,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },

      data: formData,
    })
      .then((res) => {
        setSuccessMessageVisible("successful added baby "); // Show success message

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
    <div className="add-medical">
      <div className="container">
        <div className="signup-block">
          {/* file */}
          <div className="pic__field">
            <input
              className="input__field"
              type="file"
              onChange={(e) => {
                if (e.target.files?.length) {
                  fileval(e);
                } else {
                  console.log("select");
                }
              }}
            />
          </div>

          {/*Date */}
          <div className="input__field">
            <label htmlFor="Date"> Date</label>
            <input
              onChange={(e) => {
                birthval(e);
              }}
              type="date"
              className="the__input "
              name="birthday"
              id="Date"
              min="2018-12-31"
              max={dateFormat}
              value={birthday}
              required
            />
          </div>

          {/* Dr. Name */}
          <div className="input__field">
            <label htmlFor="DrName"> Dr. Name</label>
            <input
              onChange={(e) => {
                weightval(e);
              }}
              type="text"
              className="the__input "
              placeholder="Dr Name"
              name=" DrName"
              id="DrName"
            />
          </div>
          {/* Diagnosis */}
          <div className="input__field">
            <label htmlFor="babyName">Diagnosis</label>
            <input
              onChange={(e) => {
                Diagnosis(e);
              }}
              id="babyName"
              name="Diagnosis"
              type="email"
              className=" the__input"
              placeholder="Diagnosis"
              required
            />
            <p className=" remove remove-style" id="baby-name">
              name must be string
            </p>
          </div>
          <div></div>

          <button
            onClick={() => {
              submitVal();
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text"> Add baby</span>
          </button>
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
export default AddMedical;
