import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./styles.css";
import AuthContext from "../../../context/AuthProvider";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import { AddNewCategory } from "../../../api";
function Activity() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [activitys, setactivitys] = useState([]);
  const handleDelete = async (itemid: string) => {
    await axios({
      method: "delete",
      url: `https:newMommy.mooo.com:3002/api/users/activity/${itemid}`,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (user) {
      const config = {
        method: "get",
        url: `${AddNewCategory}/activities/${user.baby[0].id}`,
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
      return (
        <div style={{ margin: "50px" }} className="reminder" key={activity.id}>
          <h1>ssss</h1>
          <div>{activity.id} </div>
          <div> {activity.activity}</div>
          <div>{activity.date} </div>
          <div> {activity.note}</div>
          <div> {activity.time}</div>
          <button
            onClick={() => {
              handleDelete(activity.id);
            }}
          >
            delete
          </button>
          <Link to={`/addactivity/${activity.id}`}>update</Link>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return (
    <div className="act">
      <Link to={`/addactivity`}>add one</Link>
      {returned}
    </div>
  );
}

export default Activity;
