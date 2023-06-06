import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { Interface } from "readline";
import axios from "axios";
import { NewbabyApi } from "../../api";
interface NewBaby {
  babyName: string;
  babyGender: string;
  babyWeight: number;
  birthday: string;
}
const AddBaby = () => {
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
  /*1998-12-01*/
  const [babyName, setbabyName] = useState<string>("");
  const [babyGender, setBabyGender] = useState<string>("");
  const [babyWeight, setWeight] = useState<number>(0);
  const [birthday, setbirthday] = useState<string>(dateFormat);
  const [babyInfo, setbabyInfo] = useState<NewBaby>();

  /* user  */
  const babyNameval = (e: any) => {
    setbabyName(e.target.value);
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
  };
  //   console.log(babyName);
  //   console.log(babyGender);
  //   console.log(babyWeight);
  //   console.log(birthday);

  /* submit  */
  const submitVal = () => {
    axios({
      method: "patch",
      url: NewbabyApi,
      data: {
        baby: [
          {
            babyName: babyName,
            gender: babyGender,
            weight: babyWeight,
            birthdate: birthday,
          },
        ],
      },
    })
      .then((res) => {
        console.log(res.data);
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
                max="15"
              />
            </div>
          </div>
          {/* <div className="checed-box">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label htmlFor="vehicle1"> I sure of data</label>
          </div> */}

          <button
            onClick={(e) => {
              submitVal();
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <br></br>
            <span className="button__text"> + Add baby</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddBaby;
