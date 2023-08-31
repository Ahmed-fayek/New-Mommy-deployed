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
  const addFriends = async () => {
    if (auth) {
      await axios({
        method: "post",
        url: "https://newMommy.mooo.com:3003/api/sendFriendRequest/64847dd92424ea5a43b1caea",
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
                addFriends();
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
