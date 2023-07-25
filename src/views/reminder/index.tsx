import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import Loading from "../../components/Loading";
import "./styles.css";
import { Link } from "react-router-dom";
import { AddNewCategory } from "../../api";
function Reminder() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [reminders, setreminders] = useState([]);

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
          console.log(response.data.reminders);

          setreminders(response.data.reminders);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  let returned: any;
  if (user) {
    returned = reminders.map((reminder: any) => {
      console.log(reminder);

      return (
        <div className="reminder" key={reminder.id}>
          <div>{reminder.id} </div>
          <div>{reminder.date} </div>
          <Link to={`/addReminder/${reminder.id}`}>Update</Link>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return <div>{returned}</div>;
}

export default Reminder;
