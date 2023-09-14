import axios from "axios";
import { useContext, useEffect, useState } from "react";

import "./styles.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthProvider";
import Loading from "../../../components/Loading";
import { AddNewCategory } from "../../../api";
import BabyAge from "../../../services/babyAge";
function BabyFirsts() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [firsts, setfirsts] = useState([]);
  const [update, setupdate] = useState(false);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);

  useEffect(() => {
    if (user) {
      const config = {
        method: "get",
        url: `${AddNewCategory}/allFirsts/${user.baby[0].id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      };
      axios(config)
        .then((response) => {
          setfirsts(response.data.firsts);
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
          url: `${AddNewCategory}/first/${itemid}`,
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
  let returned: any;
  if (user) {
    returned = firsts.map((first: any) => {
      return (
        <div className="first" key={first.id}>
          <div className="feed-header">
            <span>
              <i className="fa-solid fa-star-of-life"></i>
            </span>
            <span className="first-name">{first.babyFirst}</span>
            <Link to={`/addfirst/${first.id}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </div>
          <div className="feed-center">
            <img src={first.image} alt="img" />
          </div>
          <div className="feed-footer">
            <span>{first.note}</span>

            <div className="div">
              <button
                className="removefeedbtn"
                onClick={() => {
                  handleDelete(first.id);
                }}
              >
                remove First
              </button>
              <span>{BabyAge(`${first.date}`).slice(0, 17)}</span>
            </div>
          </div>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return (
    <div className="firsts">
      <h1>Firsts</h1>
      <Link to={"/addFirist"} className="addFiristbtn">
        Add New first
      </Link>
      <br></br>
      <div className="all-firsts">{returned}</div>
    </div>
  );
}

export default BabyFirsts;
