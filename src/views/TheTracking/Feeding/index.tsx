import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthProvider";
import { AddNewCategory } from "../../../api";
import Loading from "../../../components/Loading";
function Feeding() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [foods, setfoods] = useState([]);
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
          url: `${AddNewCategory}/meal/${itemid}`,
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
          setfoods(response.data.meals);
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
    returned = foods.map((food: any) => {
      return (
        <div className="food" key={food.id}>
          <div className="feed-header">
            <span>
              <i className="fa-solid fa-utensils"></i>
            </span>
            <span className="food-name">{food.food}</span>
            <Link to={`/addfood/${food.id}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </div>
          <div className="feed-center">
            <span>Note: {food.note}</span>
            <span>{food.date}</span>
          </div>
          <div className="feed-footer">
            <button
              className="removefeedbtn"
              onClick={() => {
                handleDelete(food.id);
              }}
            >
              remove feed
            </button>
            <span>{food.time}</span>
          </div>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return (
    <div className="foods">
      <h1>Feeding</h1>
      <Link to={"/addfood"} className="addfoodbtn">
        Add New food
      </Link>
      <br></br>
      <div className="all-foods">
        {" "}
        {returned.length > 0 ? returned : "Loading your data try to add one"}
      </div>
    </div>
  );
}

export default Feeding;
