import axios from "axios";
import { useContext, useEffect, useState } from "react";

import "./styles.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthProvider";
import Loading from "../../../components/Loading";
function BabyFirsts() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [firsts, setfirsts] = useState([]);
  const [update, setupdate] = useState(false);

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
          setfirsts(response.data.firsts);
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
          url: `https:newMommy.mooo.com:3002/api/users/first/${itemid}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
          .then((response) => {
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
    returned = firsts.map((first: any) => {
      return (
        <div className="reminder" key={first.id}>
          <div>{first.id} </div>
          <div> {first.babyFirst}</div>
          <div>{first.date} </div>
          <img src={first.image} width={"100px"} height={"100px"}></img>
          <button
            onClick={() => {
              handleDelete(first.id);
            }}
          >
            delete
          </button>
          <Link to={`/addFirist/${first.id}`}>update</Link>
        </div>
      );
    });
  } else {
    returned = <Loading />;
  }

  return (
    <div>
      <Link to={"/addFirist"}>addFirist</Link> <br></br>
      {returned}
    </div>
  );
}

export default BabyFirsts;
