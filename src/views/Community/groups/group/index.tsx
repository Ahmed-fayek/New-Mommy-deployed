import { useContext, useEffect, useState } from "react";
import "./styles.css";
import testimg from "./../../../../assets/images/Group 34416.svg";
import AuthContext from "../../../../context/AuthProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../../../components/Loading";

const GroupView = () => {
  const { auth } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const { setRefresh } = useContext<any>(AuthContext);
  const { groupid } = useParams();
  const [group, setgroup] = useState<any>();

  useEffect(() => {
    if (auth) {
      axios({
        method: "get",
        url: `https://newMommy.mooo.com:3003/api/groupById/${groupid}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((res) => {
          console.log(res);
          setgroup(res.data);
        })
        .catch((err) => {
          if (err.response.data.statusCode == 401) {
            setRefresh(!Refresh);
          }
          //console.log(err);
        });
    }
  }, [auth]);
  const formdata = new FormData();
  // useEffect(() => {
  //   formdata.append("caption", "New Post From Fayek");
  //   if (auth) {
  //     axios({
  //       method: "post",
  //       url: `https://newMommy.mooo.com:3003/api/postGroup/${groupid}`,
  //       headers: {
  //         Authorization: `Bearer ${auth.access_token}`,
  //       },
  //       data: formdata,
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         // setgroup(res.data);
  //       })
  //       .catch((err) => {
  //         if (err.response.data.statusCode == 401) {
  //           setRefresh(!Refresh);
  //         }
  //         //console.log(err);
  //       });
  //   }
  // }, [auth]);
  const handleleaveGroup = (id: any) => {
    axios({
      method: "Post",
      url: `https://newMommy.mooo.com:3003/api/leaveGroup/${id}`,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    })
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  const handleJoinGroup = (id: any) => {
    axios({
      method: "Post",
      url: `https://newMommy.mooo.com:3003/api/joinGroup/${id}`,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  if (group) {
    return (
      <div className="group-view">
        <div className="group-images">
          <div className="cover">
            <img src={group.group.cover ? group.group.cover : testimg} alt="" />
          </div>
        </div>
        <div className="group-name">
          <h1>{group.group.groupName}</h1>
          {group.userExistsInFriends ? (
            <button
              onClick={() => {
                handleleaveGroup(groupid);
              }}
            >
              {" "}
              leave Group
            </button>
          ) : (
            <button
              onClick={() => {
                handleJoinGroup(groupid);
              }}
            >
              Join Group
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default GroupView;
