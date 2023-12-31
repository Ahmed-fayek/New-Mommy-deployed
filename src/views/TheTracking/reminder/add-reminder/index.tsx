import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import { AddNewCategory } from "../../../../api";
import TimeConverter from "../../../../services/timeconverter";
const AddReminder = () => {
  const navigator = useNavigate();
  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  let currentDate = new Date();
  let dateFormat = currentDate.toJSON().slice(0, 10);
  let currentTime = currentDate.toJSON().slice(11, 16);
  const [time, settime] = useState<string>(currentTime);
  const [note, setnote] = useState<string>("");
  const [reminderDate, setreminderDate] = useState<string>(dateFormat);
  const [noteErrMsg, setnoteErrMsg] = useState<string>("");
  const [SubmiterrMsg, setSubmiterrMsg] = useState<string>("");

  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const [successMessageVisible, setSuccessMessageVisible] =
    useState<string>("");

  /* Update value tells me if this is adding or update */
  const { reminderId } = useParams();
  const [Update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (reminderId) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  }, [reminderId]);

  useEffect(() => {
    if (Update) {
      if (user) {
        axios({
          method: "GET",
          url: `${AddNewCategory}/reminderById/${reminderId}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            // //console.log(response);
            settime(response.data.reminder.time.slice(0, 5));
            setnote(response.data.reminder.note);
            setreminderDate(response.data.reminder.date);
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
  /* report Date  */
  const reminderDateVal = (e: any) => {
    setreminderDate(e.target.value);
  };
  /* report Time  */
  const startTimeVal = (e: any) => {
    settime(e.target.value);
    // //console.log(e.target.value);
  };
  /* note  */
  const noteVal = (e: any) => {
    setnote(e.target.value);
    setnoteErrMsg("");
  };

  /* submit  */

  const submitVal = async () => {
    setSuccessMessageVisible("  "); // Show success message

    let mytime = TimeConverter(time);
    if (note == "") {
      setnoteErrMsg("write your data");
    } else {
      if (!Update) {
        await axios({
          method: "post",
          url: `${AddNewCategory}/addReminder/${user.baby[0].id}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
          data: {
            date: reminderDate,
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
          url: `${AddNewCategory}/updateReminder/${reminderId}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
          data: {
            date: reminderDate,
            time: mytime,
            note: note,
          },
        })
          .then((res) => {
            // //console.log(res);
            setSuccessMessageVisible("successful added "); // Show success message
            // Redirect to main page after 3 seconds
            setTimeout(() => {
              // navigator("/tracking");
            }, 3000);
          })
          .catch((err) => {
            if (err.response.status == "401") {
              setRefresh(!Refresh);
            }
          });
      }
    }
  };

  return (
    <div className="add-reminder">
      <div className="container">
        <div className="signup-block">
          {/*Date */}
          <h2>{Update ? "Edit" : "Add"} Reminder</h2>
          <div className="input__field">
            <label htmlFor="Date"> Date</label>
            <input
              onChange={(e) => {
                reminderDateVal(e);
              }}
              type="date"
              className="the__input "
              name="reminderDate"
              id="Date"
              min="2018-12-31"
              max={dateFormat}
              value={reminderDate}
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
              name="reminderDate"
              id="Date"
              value={time}
              required
            />
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
              if (noteErrMsg == "") {
                setSubmiterrMsg("");
                submitVal();
              } else {
                setSubmiterrMsg("");
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
          <p>{successMessageVisible}</p>

          <button
            onClick={() => {
              navigator("/tracking");
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text"> Cancel</span>
          </button>
        </div>
        <div className="msg"></div>
      </div>
    </div>
  );
};
export default AddReminder;
