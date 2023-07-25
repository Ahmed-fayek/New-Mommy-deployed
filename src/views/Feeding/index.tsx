import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import Loading from "../../components/Loading";
import "./styles.css";
import { Link } from "react-router-dom";
import { AddNewCategory } from "../../api";
function Feeding() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [reminders, setreminders] = useState([]);

  useEffect(() => {
    if (user) {
      const config = {
        method: "get",
        url: `${AddNewCategory}/meals/${user.baby[0].id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      };
      axios(config)
        .then((response) => {
          console.log(response.data.meals);

          setreminders(response.data.meals);
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
          <Link to={`/addfood/${reminder.id}`}>Update</Link>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return <div>{returned}</div>;
}

export default Feeding;
