import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import AuthContext from "../../../context/AuthProvider";
import { AddNewCategory } from "../../../api";
import TimeConverter from "../../../services/timeconverter";
const AddActivity = () => {
  const navigator = useNavigate();

  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);

  let currentDate: Date = new Date();
  let dateFormat = currentDate.toJSON().slice(0, 10);
  let currentTime = currentDate.toJSON().slice(11, 16);
  const [time, settime] = useState<string>(currentTime);
  const [activity, setactivity] = useState<string>("");
  const [note, setnote] = useState<string>("");
  const [startDate, setstartDate] = useState<string>(dateFormat);
  const [activityErrMsg, setactivityErrMsg] = useState<string>("");
  const [noteErrMsg, setnoteErrMsg] = useState<string>("");
  const [SubmiterrMsg, setSubmiterrMsg] = useState<string>("");
  const [successMessageVisible, setSuccessMessageVisible] =
    useState<string>("");
  /* Update value tells me if this is adding or update */
  const { actId } = useParams();
  const [Update, setUpdate] = useState<boolean>(false);
  useEffect(() => {
    if (actId) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  }, [actId]);

  useEffect(() => {
    if (Update) {
      if (user) {
        axios({
          method: "GET",
          url: `${AddNewCategory}/activityById/${actId}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            setactivity(response.data.activity.activity);
            setstartDate(response.data.activity.date);
            settime(response.data.activity.time.slice(0, 5));
            setnote(response.data.activity.note);
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    }
  }, [Update, user]);
  var nameVal = new RegExp("^[A-Za-z]*$");
  /* Dr Name  */
  const drNameVal = (e: any) => {
    if (!nameVal.test(e.target.value)) {
      setactivityErrMsg("invalid data");
    } else {
      setactivity(e.target.value);
      setactivityErrMsg("");
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

    if (!Update) {
      await axios({
        method: "post",
        url: `${AddNewCategory}/addActivity/${user.baby[0].id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },

        data: {
          date: startDate,
          activity: activity,
          time: mytime,
          note: note,
        },
      })
        .then((res) => {
          // console.log(res);

          setSuccessMessageVisible("successful added "); // Show success message

          // Redirect to main page after 3 seconds
          setTimeout(() => {
            navigator("/main");
          }, 3000);
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      await axios({
        method: "PATCH",
        url: `${AddNewCategory}/updateActivity/${actId}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },

        data: {
          date: startDate,
          activity: activity,
          time: mytime,
          note: note,
        },
      })
        .then((res) => {
          // console.log(res);

          setSuccessMessageVisible("successful added "); // Show success message

          // Redirect to main page after 3 seconds
          setTimeout(() => {
            // navigator("/main");
          }, 3000);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
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
          {/* Activity */}
          <div className="input__field">
            <label htmlFor="DrName"> Activity</label>
            <input
              onChange={(e) => {
                drNameVal(e);
              }}
              type="text"
              className="the__input "
              placeholder="Activity"
              name=" Activity"
              value={activity}
              id="Activity"
            />
            <p>{activityErrMsg}</p>
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
              if (noteErrMsg == "" && activityErrMsg == "") {
                setSubmiterrMsg("");
                submitVal();
              } else {
                setSubmiterrMsg("check data");
              }
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text"> Add Activity</span>
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
export default AddActivity;
