import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthProvider";
import { AddNewCategory } from "../../../api";
import Loading from "../../../components/Loading";
import BabyAge from "../../../services/babyAge";
function Growth() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [growths, setgrowths] = useState([]);
  const [update, setupdate] = useState(false);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);

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
          // //console.log(response.data.growthMilestones);

          setgrowths(response.data.growthMilestones);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
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
          url: `${AddNewCategory}/growthMilestone/${itemid}`,
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
  let returned: any;
  if (user) {
    returned = growths.map((growth: any) => {
      return (
        <div key={growth.id} className="growth">
          <span className="edit-growth">
            <Link to={`/addgrowth/${growth.id}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </span>
          <div>
            Date: <span> {growth.date}</span>
          </div>
          <div>
            Age:
            <span> {BabyAge(`${growth.date}`).slice(0, 17)}</span>
          </div>
          <div>
            Height: <span> {growth.height}</span>
          </div>
          <div>
            Weight: <span> {growth.weight}</span>
          </div>
          <section className="delete-growh-btn">
            <button
              onClick={() => {
                handleDelete(growth.id);
              }}
            >
              Delete growth
            </button>
          </section>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return (
    <div className="growths">
      <h1> Growth</h1>
      <Link to={"/addgrowth"} className="addgrowthbtn">
        Add new growth
      </Link>
      <div className="all-growths">
        {" "}
        {returned.length > 0 ? returned : "Loading your data try to add one"}
      </div>
    </div>
  );
}

export default Growth;
