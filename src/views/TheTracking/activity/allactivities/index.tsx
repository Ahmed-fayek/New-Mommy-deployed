import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../../../context/AuthProvider";
import { AddNewCategory } from "../../../../api";
import Loading from "../../../../components/Loading";
function Activity() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [activitys, setactivitys] = useState([]);
  const [update, setupdate] = useState(false);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
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
          url: `${AddNewCategory}/activity/${itemid}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
          .then((response) => {
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
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  }, [user, update]);

  let returned: any;
  if (user) {
    returned = activitys.map((activity: any) => {
      return (
        <div className="activity" key={activity.id}>
          <div className="feed-header">
            <span>
              <i className="fa-solid fa-chart-line"></i>{" "}
            </span>
            <span className="activity-name">{activity.activity}</span>
            <Link to={`/addactivity/${activity.id}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </div>
          <div className="feed-center">
            <span>Note: {activity.note}</span>
            <span>{activity.date}</span>
          </div>
          <div className="feed-footer">
            <button
              className="removefeedbtn"
              onClick={() => {
                handleDelete(activity.id);
              }}
            >
              remove feed
            </button>
            <span>{activity.time}</span>
          </div>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return (
    <div className="activitys">
      <h1>Activity</h1>
      <Link to={"/addactivity"} className="addactivitybtn">
        Add New activity
      </Link>
      <br></br>
      <div className="all-activitys">{returned}</div>
    </div>
  );
}

export default Activity;
