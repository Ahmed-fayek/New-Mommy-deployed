import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/AuthProvider";
import gpimg from "./../../../../assets/images/Group 34475.svg";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { allMyGroups, leaveGroup } from "../../../../api";
const AllGroups = () => {
  const [allGroups, setallGroups] = useState<any>();
  const [refreshcop, setrefreshcop] = useState<any>(false);
  const { auth } = useContext<any>(AuthContext);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const Navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      axios({
        method: "GET",
        url: `${allMyGroups}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          console.log(response.data.groups);
          setallGroups(response.data.groups);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  }, [auth, refreshcop]);

  const handleLeaveGroup = (e: any) => {
    axios({
      method: "Post",
      url: `${leaveGroup}/${e}`,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setrefreshcop(!refreshcop);
        // setallGroups(response.data.groups);
      })
      .catch((error) => {
        console.log(error);

        if (error.response.status == "401") {
          setRefresh(!Refresh);
        }
      });
  };
  return (
    <>
      <a href="/addgroup" className="addgroup">
        Create Group
      </a>

      <h3>Your Groups </h3>
      <div className="my-grops">
        {allGroups
          ? allGroups?.map((group: any) => {
              return (
                <div key={group.id} className="my-group">
                  <img
                    onClick={() => {
                      Navigate(`/GroupView/${group.groupId}`);
                    }}
                    src={gpimg}
                    alt="img"
                  />
                  <div className="group-data">
                    <div className="group-info">
                      <h3>{group.group.groupName}</h3>
                      <p>{group.group.count}</p>
                    </div>
                    <span
                      onClick={() => {
                        handleLeaveGroup(group.groupId);
                      }}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>{" "}
                    </span>
                  </div>
                </div>
              );
            })
          : "Loading"}
      </div>
    </>
  );
};
export default AllGroups;
