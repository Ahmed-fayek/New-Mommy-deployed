import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import AuthContext from "../../../conrext/AuthProvider";
import { AddNewCategory } from "../../../api";
import TimeConverter from "../../../services/timeconverter";

const AddFood = () => {
  const navigator = useNavigate();

  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);

  let currentDate = new Date();
  let dateFormat = currentDate.toJSON().slice(0, 10);
  let currentTime = currentDate.toJSON().slice(11, 16);
  const [time, settime] = useState<string>(currentTime);
  const [food, setfood] = useState<string>("");
  const [note, setnote] = useState<string>("");
  const [startDate, setstartDate] = useState<string>(dateFormat);
  const [foodErrMsg, setfoodErrMsg] = useState<string>("");
  const [noteErrMsg, setnoteErrMsg] = useState<string>("");
  const [SubmiterrMsg, setSubmiterrMsg] = useState<string>("");
  const [successMessageVisible, setSuccessMessageVisible] =
    useState<string>("");
  var nameVal = new RegExp("^[A-Za-z]*$");
  /* Dr Name  */
  const foodVal = (e: any) => {
    if (!nameVal.test(e.target.value)) {
      setfoodErrMsg("invalid data");
    } else {
      setfood(e.target.value);
      setfoodErrMsg("");
    }
  };

  /* report Date  */
  const startDateVal = (e: any) => {
    setstartDate(e.target.value);
  };
  /* report Time  */
  const startTimeVal = (e: any) => {
    settime(e.target.value);
  };
  /* note  */
  const noteVal = (e: any) => {
    if (!nameVal.test(e.target.value)) {
      setnoteErrMsg("invalid data");
    } else {
      setnote(e.target.value);
      setnoteErrMsg("");
    }
  };

  /* submit  */

  const submitVal = async () => {
    let mytime = TimeConverter(time);
    await axios({
      method: "post",
      url: `${AddNewCategory}/addMeal/${user.baby[0].id}`,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },

      data: {
        date: startDate,
        food: food,
        time: mytime,
        note: note,
      },
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
    <div className="add-food">
      <div className="container">
        <div className="signup-block">
          {/*Date */}
          <div className="input__field">
            <label htmlFor="Date"> Date</label>
            <input
              onChange={(e) => {
                startDateVal(e);
              }}
              type="date"
              className="the__input "
              name="startDate"
              id="Date"
              min="2018-12-31"
              max={dateFormat}
              value={startDate}
              required
            />
          </div>
          {/*time */}
          <div className="input__field">
            <label htmlFor="Date"> Time</label>
            <input
              onChange={(e) => {
                startTimeVal(e);
              }}
              type="time"
              className="the__input "
              name="startDate"
              id="Date"
              value={time}
              required
            />
          </div>

          {/* food */}
          <div className="input__field">
            <label htmlFor="food"> food</label>
            <input
              onChange={(e) => {
                foodVal(e);
              }}
              type="text"
              className="the__input "
              placeholder="food"
              name=" food"
              id="food"
            />
            <p>{foodErrMsg}</p>
          </div>
          {/* note */}
          <div className="input__field">
            <label htmlFor="note">Note</label>
            <input
              onChange={(e) => {
                noteVal(e);
              }}
              id="babyName"
              name="note"
              type="email"
              className=" the__input"
              placeholder="note"
              required
            />
            <p>{noteErrMsg}</p>
          </div>
          <div></div>
          {/* Submit */}
          <button
            onClick={() => {
              if (noteErrMsg == "" && foodErrMsg == "") {
                setSubmiterrMsg("");
                submitVal();
              } else {
                setSubmiterrMsg("check data");
              }
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text"> Save </span>
          </button>
          {/*err msg */}
          <p>{SubmiterrMsg}</p>
          {/*skip now */}
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
export default AddFood;
