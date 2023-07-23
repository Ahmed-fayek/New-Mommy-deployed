import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../conrext/AuthProvider";
import Loading from "../../components/Loading";
import "./styles.css";
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
          console.log(response.data.firsts);

          setreminders(response.data.firsts);
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
          <div> {reminder.diagnosis}</div>
          <div> {reminder.doctorName}</div>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return <div>{returned}</div>;
}

export default BabyFirsts;
