import axios from "axios";
import { useContext, useEffect, useState } from "react";

import "./styles.css";
import AuthContext from "../../../conrext/AuthProvider";
import Loading from "../../../components/Loading";
function Activity() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [activitys, setactivitys] = useState([]);

  useEffect(() => {
    if (user) {
      const config = {
        method: "get",
        url: `https://newMommy.mooo.com:3002/api/users/activities/${user.baby[0].id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      };
      axios(config)
        .then((response) => {
          setactivitys(response.data.activities);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  let returned: any;
  if (user) {
    returned = activitys.map((activity: any) => {
      console.log(activity);

      return (
        <div className="reminder" key={activity.id}>
          <div>{activity.id} </div>
          <div> {activity.activity}</div>
          <div>{activity.date} </div>
          <div> {activity.note}</div>
          <div> {activity.time}</div>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return <div>{returned}</div>;
}

export default Activity;
