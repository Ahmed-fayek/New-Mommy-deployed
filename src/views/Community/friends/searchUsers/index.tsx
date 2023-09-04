import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import "./styles.css";

const SearchUsers = () => {
  const { auth } = useContext<any>(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [friendRequestStatus, setFriendRequestStatus] = useState<{
    [id: string]: boolean;
  }>({});
  useEffect(() => {
    const fetchAllUsers = async () => {
      if (auth) {
        try {
          const response = await axios.get(
            `https://newMommy.mooo.com:3002/api/users`,
            {
              headers: {
                Authorization: `Bearer ${auth.access_token}`,
              },
            }
          );
          setAllUsers(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchAllUsers();
  }, [auth]);

  useEffect(() => {
    const filteredUsers = Object.entries(allUsers).filter(([id, user]) => {
      const fullName: string = `${user.firstname} ${user.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setSearchResults(filteredUsers);
  }, [searchQuery, allUsers]);

  const addFriends = async (id: number) => {
    if (auth) {
      await axios({
        method: "post",
        url: `https://newMommy.mooo.com:3003/api/sendFriendRequest/${id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((res) => {
          console.log(res);
          setFriendRequestStatus({ ...friendRequestStatus, [id]: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="search-users">
      <input
        type="text"
        placeholder="Search users"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchResults
        .filter((users) =>
          users.some((user: any) => user.firstname || user.lastname)
        )
        .map((users) =>
          users.map((user: any) => (
            <div className="add-friend" key={user.id}>
              {user.firstname || user.lastname ? (
                <div className="user-info">
                  <img src={user.picture} alt="" />
                  <p>
                    {user.firstname} {user.lastname}
                  </p>
                </div>
              ) : null}
              {user.firstname || user.lastname ? (
                <button
                  onClick={() => {
                    addFriends(user.id);
                  }}
                >
                  {friendRequestStatus[user.id] ? "Delete" : "Add Friend"}
                </button>
              ) : null}
            </div>
          ))
        )}
    </div>
  );
};
export default SearchUsers;
