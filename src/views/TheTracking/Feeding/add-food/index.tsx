import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import { AddNewCategory } from "../../../../api";
import TimeConverter from "../../../../services/timeconverter";

const AddFood = () => {
  const navigator = useNavigate();

  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
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

  /* Update value tells me if this is adding or update */
  const { foodId } = useParams();
  const [Update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (foodId) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  }, [foodId]);

  useEffect(() => {
    if (Update) {
      if (user) {
        axios({
          method: "GET",
          url: `${AddNewCategory}/mealById/${foodId}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            // //console.log(response);
            settime(response.data.meal.time.slice(0, 5));
            setnote(response.data.meal.note);
            setfood(response.data.meal.food);
            setstartDate(response.data.meal.date);
          })
          .catch((error) => {
            if (error.response.status == "401") {
              setRefresh(!Refresh);
            }
          });
      }
    }
  }, [Update, user]);
  var nameVal = new RegExp("^[A-Za-z]*$");
  /* Dr Name  */
  const foodVal = (e: any) => {
    setfood(e.target.value);
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
    setnote(e.target.value);
  };

  /* submit  */

  const submitVal = async () => {
    let mytime = TimeConverter(time);
    if (!Update) {
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
          // //console.log(res);

          setSuccessMessageVisible("successful added "); // Show success message

          // Redirect to main page after 3 seconds
          setTimeout(() => {
            navigator("/tracking");
          }, 3000);
        })
        .catch((err) => {
          if (err.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    } else {
      await axios({
        method: "PATCH",
        url: `${AddNewCategory}/updateMeal/${foodId}`,
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
          // //console.log(res);

          setSuccessMessageVisible("successful added "); // Show success message

          // Redirect to main page after 3 seconds
          setTimeout(() => {
            navigator("/tracking");
          }, 3000);
        })
        .catch((err) => {
          if (err.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  };

  return (
    <div className="add-food">
      <div className="container">
        <div className="signup-block">
          <h2>{Update ? "Edit" : "Add"} Food</h2>{" "}
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
              value={food}
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
              value={note}
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
          {/*Go to Main */}
          <button
            onClick={() => {
              navigator("/traacking");
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text"> Cancel</span>
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
