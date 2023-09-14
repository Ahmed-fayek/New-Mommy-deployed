import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AddNewCategory } from "../../../api";
import AuthContext from "../../../context/AuthProvider";
import Loading from "../../../components/Loading";
function Reminder() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [reminders, setreminders] = useState([]);
  const [update, setupdate] = useState(false);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);

  useEffect(() => {
    if (user) {
      const config = {
        method: "get",
        url: `${AddNewCategory}/allReminders/${user.baby[0].id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      };
      axios(config)
        .then((response) => {
          //console.log(response.data.reminders);

          setreminders(response.data.reminders);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  }, [user, update]);
  /* Handle Delete Item */
  const handleDelete = async (itemid: string) => {
    await Swal.fire({
      title: `Are you sure you want to delete ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "delete",
          url: `${AddNewCategory}/reminder/${itemid}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
          .then((response) => {
            // //console.log(response.data);
            setupdate(!update);
          })
          .catch((error) => {
            if (error.response.status == "401") {
              setRefresh(!Refresh);
            }
          });
        Swal.fire("Deleted!", ` has been deleted.`, "success");
      }
    });
  };
  let returned: any;
  if (user) {
    returned = reminders.map((reminder: any) => {
      return (
        <div className="reminder" key={reminder.id}>
          <div className="reminder-head">
            <i className="fa-solid fa-stopwatch-20"></i>
            <span className="reminder-time">{reminder.time} </span>
            <Link to={`/addReminder/${reminder.id}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </div>
          <div className="reminder-note">Notes: {reminder.note} </div>
          <div className="reminder-footer">
            <div className="reminder-date">Date: {reminder.date}</div>
            <button
              className="stop-reminder"
              onClick={() => {
                handleDelete(reminder.id);
              }}
            >
              close reminder
            </button>
          </div>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return (
    <div className="reminders">
      <h1>All Reminders</h1>
      <Link to={"/addReminder"} className="addReminderbtn">
        Add new reminder
      </Link>
      <br></br>
      <div className="all-reminders">{returned}</div>
    </div>
  );
}

export default Reminder;
