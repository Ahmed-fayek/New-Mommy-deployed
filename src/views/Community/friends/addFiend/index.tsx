import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/AuthProvider";
const AddFriends = () => {
  const { auth } = useContext<any>(AuthContext);
  const [allUsers, setAllUsers] = useState<any[]>([]);
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
          const data = res.data;
          setAllUsers(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [auth]);

  // useEffect(() => {
  //   if (auth) {
  //     axios({
  //       method: "GET",
  //       url: "https://newMommy.mooo.com:3003/api/allSentFriendRequests/",
  //       headers: {
  //         Authorization: `Bearer ${auth.access_token}`,
  //       },
  //     })
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [auth]);

  // useEffect(() => {
  //   if (auth) {
  //     axios({
  //       method: "Post",
  //       url: "https://newMommy.mooo.com:3003/api/acceptFriendRequest/64f5ad64254300e680df0d65",
  //       headers: {
  //         Authorization: `Bearer ${auth.access_token}`,
  //       },
  //     })
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [auth]);
  const addFriends = async (userid: any) => {
    if (auth) {
      await axios({
        method: "post",
        url: `https://newMommy.mooo.com:3003/api/sendFriendRequest/${userid}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      }).then((res) => {
        console.log(res.data);
      });
    }
  };
  return (
    <div style={{ margin: "100px" }}>
      <ul>
        {Object.entries(allUsers).map(([id, user]) => (
          <li key={id}>
            {user.firstname} {user.lastname}
            <button
              onClick={() => {
                addFriends(user.id);
              }}
            >
              Add Friend
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AddFriends;
