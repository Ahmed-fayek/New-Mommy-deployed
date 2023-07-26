import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { AddNewCategory, NewbabyApi } from "../../api";
import AuthContext from "../../context/AuthProvider";

const AddBaby = () => {
  const navigator = useNavigate();
  //get auth from context to get acc token for api request
  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  let currentDate: Date = new Date();
  // reformat the date to send it to back-end to be as "year-month-day"
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
  const [babyNameErrMsg, setbabyNameErrMsg] = useState<string>("");
  const [babyGender, setBabyGender] = useState<string>("boy");
  const [babyWeight, setWeight] = useState<number>(0);
  const [birthday, setbirthday] = useState<string>(dateFormat);
  const [successMessageVisible, setSuccessMessageVisible] =
    useState<string>("");
  const [file, setfile] = useState<any>();
  /* Update value tells me if this is adding or update */
  const { babyId } = useParams();
  const [Update, setUpdate] = useState<boolean>(false);
  useEffect(() => {
    if (babyId) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  }, [babyId]);

  useEffect(() => {
    if (Update) {
      if (user) {
        axios({
          method: "GET",
          url: `${AddNewCategory}/updateBaby/${babyId}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            console.log(response);
            // setactivity(response.data.activity.activity);
            // setstartDate(response.data.activity.date);
            // settime(response.data.activity.time.slice(0, 5));
            // setnote(response.data.activity.note);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [Update, user]);
  //regular expression to test if baby name contain only letters
  var nameVal = new RegExp("^[A-Za-z]*$");
  /* baby name onchange function  */
  const babyNameval = (e: any) => {
    if (!nameVal.test(e.target.value)) {
      setbabyNameErrMsg("name must be only letters");
    } else if (e.target.value == "") {
      setbabyNameErrMsg("");
    } else {
      setbabyNameErrMsg("");
      setbabyName(e.target.value);
    }
  };

  /* baby birthdate onchange function  */
  const birthval = (e: any) => {
    setbirthday(e.target.value);
  };
  /* gender  */
  const genderval = (e: any) => {
    setBabyGender(e.target.value);
  };

  /* baby weight onchange function  */
  const weightval = (e: any) => {
    if (e.target.value > 10) {
      e.target.value = 10;
    }
    setWeight(e.target.value);
  };

  /* initial formdata  */
  const formData = new FormData();
  /* baby image onchange function  */
  const fileval = async (e: any) => {
    setfile(e.target.files[0]);
  };

  /* submit  */
  const submitVal = async () => {
    //append all data to form data
    formData.append("images", file);
    formData.append("babyName", babyName);
    formData.append("gender", babyGender);
    formData.append("weight", `${babyWeight}`);
    formData.append("birthDate", birthday);
    //api request
    await axios({
      method: "post",
      url: NewbabyApi,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },

      data: formData,
    })
      .then((res) => {
        console.log(res);

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
    <div className="add-baby">
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
          {/* add baby name input*/}
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
            {/* baby error msg to tell user to write only letters */}
            <p className="  remove-style">{babyNameErrMsg}</p>
          </div>
          {/*birthday input*/}
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
            {/* gender input*/}
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
            {/* weight input*/}
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
          {/* Submit Button */}
          <button
            onClick={() => {
              submitVal();
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text"> Add baby</span>
          </button>
          {/* Skip Button */}
          <button
            onClick={() => {
              console.log("sss");

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
export default AddBaby;
