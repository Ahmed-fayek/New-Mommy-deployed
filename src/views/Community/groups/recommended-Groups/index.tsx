import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import gpimg from "./../../../../assets/images/Group 34416.svg";
import "./styles.css";
import { useNavigate } from "react-router-dom";
const RecommendedGroups = () => {
  const { auth } = useContext<any>(AuthContext);
  const [recGroups, setrecGroups] = useState<any>();
  const Navigate = useNavigate();
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);

  useEffect(() => {
    if (auth) {
      axios({
        method: "GET",
        url: "https://newMommy.mooo.com:3003/api/recommendedGroups",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          //console.log(response.data.groups);
          setrecGroups(response.data.groups);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  }, [auth]);
  const handleJoinGroup = (e: any) => {
    axios({
      method: "Post",
      url: `https://newMommy.mooo.com:3003/api/joinGroup/${e}`,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    })
      .then((response) => {
        // setrecGroups(response.data.groups);
        //console.log(response);
      })
      .catch((error) => {
        if (error.response.status == "401") {
          setRefresh(!Refresh);
        }
      });
  };
  return (
    <>
      <h3>Recommended for you</h3>

      <div className="rec-grops">
        {recGroups
          ? recGroups?.map((group: any) => {
              return (
                <div key={group.id} className="rec-group">
                  <img
                    onClick={() => {
                      Navigate(`/GroupView/${group.id}`);
                    }}
                    src={gpimg}
                    alt=""
                  />
                  <div className="group-data">
                    <div className="group-info">
                      <h3>{group.groupName}</h3>
                      <p>{group.count}</p>
                    </div>
                    <span
                      onClick={() => {
                        handleJoinGroup(group.id);
                      }}
                    >
                      <i className="fa-solid fa-plus"></i>
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
export default RecommendedGroups;
