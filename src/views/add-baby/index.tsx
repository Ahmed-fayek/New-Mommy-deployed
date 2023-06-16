import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/functions";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import "./styles.css";
import axios from "axios";
import { NewbabyApi } from "../../api";
interface NewBaby {
  babyName: string;
  babyGender: string;
  babyWeight: number;
  birthday: string;
}
const AddBaby = () => {
  // console.log(firebase);
  const navigator = useNavigate();
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

  const [babyName, setbabyName] = useState<string>("");
  const [babyGender, setBabyGender] = useState<string>("boy");
  const [babyWeight, setWeight] = useState<number>(0);
  const [birthday, setbirthday] = useState<string>(dateFormat);
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
  const babyNameval = (e: any) => {
    validateFunction(nameVal, "baby-name", e);
    if (!validateFunction(nameVal, "baby-name", e)) {
      setbabyName(e.target.value);
    } else {
    }
  };

  /* birthday  */
  const birthval = (e: any) => {
    setbirthday(e.target.value);
  };
  /* gender  */
  const genderval = (e: any) => {
    setBabyGender(e.target.value);
  };

  /* weight  */
  const weightval = (e: any) => {
    setWeight(e.target.value);
    if (e.target.value > 10) {
      e.target.value = 10;
    }
  };
  /* fire base */
  const firebaseConfig = {
    apiKey: "AIzaSyDW9kQMNqFiYzobRtHqnydGYUl7FnNskUw",
    authDomain: "newbebeimg.firebaseapp.com",
    projectId: "newbebeimg",
    storageBucket: "newbebeimg.appspot.com",
    messagingSenderId: "453284381062",
    appId: "1:453284381062:web:408b8c928730eb1e9c2c07",
    measurementId: "G-KD6CDB19LX",
  };
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  /* file  */
  const fileval = (e: any) => {
    setfile(e.target.value);
    // const storage = firebaseApp.storage();
    // // Create a storage reference
    // const storageRef = storage.ref();

    // // Upload the file
    // const uploadTask = storageRef.child("images/" + file.name).put(file);
    // uploadTask.on(
    //   "state_changed",
    //   function (snapshot:any) {
    //     // Handle progress, errors, and completion
    //   },
    //   function (error:any) {
    //     console.log(error);

    //   },
    //   function () {
    //     // Handle completion
    //   }
    // );
  };
  /* submit  */
  const submitVal = () => {
    axios({
      method: "post",
      url: NewbabyApi,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      data: {
        babyName: babyName,
        gender: babyGender,
        weight: +babyWeight,
        birthDate: birthday,
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
    <div className="add-baby">
      <div className="container">
        <div className="signup-block">
          {/* add baby name */}
          <div className="input__field">
            <label htmlFor="babyName">what's your baby name</label>
            <input
              onChange={(e) => {
                babyNameval(e);
              }}
              id="babyName"
              name="babyName"
              type="email"
              className=" the__input"
              placeholder="Enter name"
              required
            />
            <p className=" remove remove-style" id="baby-name">
              name must be string
            </p>
          </div>
          {/*birthday */}
          <div className="input__field">
            <label htmlFor="birthday"> BirthDay</label>
            <input
              onChange={(e) => {
                birthval(e);
              }}
              type="date"
              className="the__input "
              placeholder="gender"
              name="birthday"
              id="birthday"
              min="2018-12-31"
              max={dateFormat}
              value={birthday}
              required
            />
          </div>
          {/* file */}
          <div className="input__field">
            <label htmlFor="birthday"> BirthDay</label>
            <input
              onChange={(e) => {
                fileval(e);
              }}
              type="file"
              className="the__input "
              required
            />
          </div>

          <div className="two-inputs">
            {/* gender */}
            <div className="input__field">
              <label htmlFor="gender">Baby Gender</label>
              <select
                className=" the__input "
                name="gender"
                id="gender"
                onChange={(e) => {
                  genderval(e);
                }}
              >
                <option value="boy">boy</option>
                <option value="girl">girl</option>
              </select>
            </div>
            {/* weight */}
            <div className="input__field">
              <label htmlFor="weight"> Weight</label>
              <input
                onChange={(e) => {
                  weightval(e);
                }}
                type="number"
                className="the__input "
                placeholder="weight"
                name="weight"
                id="weight"
                min="1"
                max="10"
              />
            </div>
          </div>
          <div></div>

          <button
            onClick={() => {
              submitVal();
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <br></br>
            <span className="button__text"> Add baby</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddBaby;
