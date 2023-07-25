import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import Loading from "../../components/Loading";
import "./styles.css";
import { Link } from "react-router-dom";
function BabyFirsts() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [reminders, setreminders] = useState([]);

  useEffect(() => {
    if (user) {
      const config = {
        method: "get",
        url: `https://newMommy.mooo.com:3002/api/users/allFirsts/${user.baby[0].id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      };
      axios(config)
        .then((response) => {
          console.log(response);
          setreminders(response.data.firsts);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);
  const handleDelete = async (itemid: string) => {
    await axios({
      method: "delete",
      url: `https:newMommy.mooo.com:3002/api/users/first/${itemid}`,
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
  let returned: any;
  if (user) {
    returned = reminders.map((reminder: any) => {
      console.log(reminder);
      return (
        <div className="reminder" key={reminder.id}>
          <div>{reminder.id} </div>
          <div> {reminder.babyFirst}</div>
          <div>{reminder.date} </div>
          <button
            onClick={() => {
              handleDelete(reminder.id);
            }}
          >
            delete
          </button>
          <Link to={`/addFirist/${reminder.id}`}>update</Link>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return <div>{returned}</div>;
}

export default BabyFirsts;
