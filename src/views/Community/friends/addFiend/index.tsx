import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/AuthProvider";

function AddFriends() {
  const { auth } = useContext<any>(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    if (auth) {
      axios({
        method: "get",
        url: "https://newMommy.mooo.com:3002/api/users",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((res) => {
          setAllUsers(res.data);
          // console.log(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, [auth]);
  const addFriends = async () => {
    if (auth) {
      await axios({
        method: "post",
        url: "https://newMommy.mooo.com:3003/api/sendFriendRequest/64847dd92424ea5a43b1caea",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      }).then((res) => {
        // console.log(res);
      });
    }
  };

  return (
    <>
      {}
      <button
        style={{ margin: "50px" }}
        onClick={() => {
          addFriends();
        }}
      >
        {" "}
        Add Friend
      </button>
    </>
  );
}
export default AddFriends;
//mohammed elsayed
//hanan
