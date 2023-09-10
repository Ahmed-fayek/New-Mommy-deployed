import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/AuthProvider";
import gpimg from "./../../../../assets/images/Group 34475.svg";
import "./styles.css";
import { useNavigate } from "react-router-dom";
const AllGroups = () => {
  const [allGroups, setallGroups] = useState<any>();
  const { auth } = useContext<any>(AuthContext);
  const Navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      axios({
        method: "GET",
        url: "https://newMommy.mooo.com:3003/api/allMyGroups",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          //console.log(response.data.groups);
          setallGroups(response.data.groups);
        })
        .catch((error) => {
          //console.log(error);
        });
    }
  }, [auth]);
  const handleLeaveGroup = (e: any) => {
    axios({
      method: "Post",
      url: `https://newMommy.mooo.com:3003/api/leaveGroup/${e}`,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    })
      .then((response) => {
        //console.log(response);
        // setallGroups(response.data.groups);
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  return (
    <>
      <h3>Your Groups </h3>
      <div className="my-grops">
        {allGroups
          ? allGroups?.map((group: any) => {
              //console.log(group);

              return (
                <div key={group.id} className="my-group">
                  <img
                    onClick={() => {
                      Navigate(`/GroupView/${group.groupId}`);
                    }}
                    src={gpimg}
                    alt=""
                  />
                  <div className="group-data">
                    <div className="group-info">
                      <h3>{group.group.groupName}</h3>
                      <p>{group.group.count}</p>
                    </div>
                    <span
                      onClick={() => {
                        handleLeaveGroup(group.id);
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
