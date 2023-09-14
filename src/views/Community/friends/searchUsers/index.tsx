import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import "./styles.css";
import pic from "./../../../../assets/images/istockphoto-1130884625-612x612.jpg";
import { sendFriendRequest } from "../../../../api";
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
          setAllUsers(Object.values(response.data));
          console.log(Object.values(response.data));
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchAllUsers();
  }, [auth]);

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults([]);
    } else {
      setSearchResults(
        Object.entries(allUsers).filter(([id, user]) => {
          const fullName: string = `${user.firstname} ${user.lastname}`;
          return fullName.toLowerCase().includes(searchQuery.toLowerCase());
        })
      );
    }
  }, [searchQuery]);
  console.log(searchResults);
  const addFriends = async (id: number) => {
    if (auth) {
      await axios({
        method: "post",
        url: `${sendFriendRequest}/${id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((res) => {
          setFriendRequestStatus({ ...friendRequestStatus, [id]: true });
        })
        .catch((err) => {
          //console.log(err);
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
      {searchResults.map((users) =>
        users.map((user: any) => (
          <div className="add-friend" key={user.id}>
            {user.firstname || user.lastname ? (
              <div className="user-info">
                <img src={pic} alt="img" />
                <p>
                  {user.firstname} {user.lastname}
                </p>
              </div>
            ) : (
              ""
            )}
            {user.firstname || user.lastname ? (
              <button
                onClick={() => {
                  addFriends(user.id);
                }}
              >
                {friendRequestStatus[user.id] ? "Delete" : "Add Friend"}
              </button>
            ) : (
              ""
            )}
          </div>
        ))
      )}
    </div>
  );
};
export default SearchUsers;
