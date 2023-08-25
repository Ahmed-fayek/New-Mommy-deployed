import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import Loading from "../../components/Loading";
import "./styles.css";
import { Link } from "react-router-dom";
import { AddNewCategory } from "../../api";
import Swal from "sweetalert2";
function Reminder() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [reminders, setreminders] = useState([]);
  const [update, setupdate] = useState(false);

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
          // console.log(response.data.reminders);

          setreminders(response.data.reminders);
        })
        .catch((error) => {
          // console.log(error);
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
          url: `https:newMommy.mooo.com:3002/api/users/reminder/${itemid}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
          .then((response) => {
            // console.log(response.data);
            setupdate(!update);
          })
          .catch((error) => {
            // console.log(error);
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
          <div>{reminder.id} </div>
          <div>{reminder.note} </div>
          <div>{reminder.date} </div>
          <Link to={`/addReminder/${reminder.id}`}>Update</Link>
          <button
            onClick={() => {
              handleDelete(reminder.id);
            }}
          >
            Delete
          </button>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return <div>{returned}</div>;
}

export default Reminder;
