import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../conrext/AuthProvider";
import Loading from "../../components/Loading";
import "./styles.css";
import { Link } from "react-router-dom";
import { AddNewCategory } from "../../api";
function Growth() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [reminders, setreminders] = useState([]);

  useEffect(() => {
    if (user) {
      const config = {
        method: "get",
        url: `${AddNewCategory}/growthMilestones/${user.baby[0].id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      };
      axios(config)
        .then((response) => {
          console.log(response.data.growthMilestones);

          setreminders(response.data.growthMilestones);
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
          <div> {reminder.age}</div>
          <div>{reminder.date} </div>
          <div> {reminder.weight}</div>
          <div> {reminder.height}</div>
          <Link to={`/addgrowth/${reminder.id}`}>Update</Link>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return <div>{returned}</div>;
}

export default Growth;
