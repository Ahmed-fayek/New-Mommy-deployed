import { useContext, useEffect, useState } from "react";
import "./styles.css";
import testimg from "./../../../../assets/images/Group 34416.svg";
import AuthContext from "../../../../context/AuthProvider";
import axios from "axios";
import { Link, NavLink, useParams } from "react-router-dom";
import Loading from "../../../../components/Loading";
import postimg from "./../../../../assets/images/bro.svg";
const GroupView = () => {
  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const { groupid } = useParams();
  const [group, setgroup] = useState<any>();
  const [refreshposts, setrefreshposts] = useState<boolean>(false);
  const [refreshcomp, setrefreshcomp] = useState<boolean>(false);
  const { setRefresh } = useContext<any>(AuthContext);
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
          if (err.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  }, [auth, refreshcomp, refreshposts]);
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
        setrefreshcomp(!refreshcomp);
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
        // console.log(response);
        setrefreshcomp(!refreshcomp);
      })
      .catch((error) => {
        if (error.response.status == "401") {
          setRefresh(!Refresh);
        }
      });
  };
  const handleAddLike = (ele: any, id: any) => {
    if (ele.currentTarget.classList.contains("liked-this")) {
      if (auth) {
        axios({
          method: "Post",
          url: `https://newMommy.mooo.com:3003/api/unlike/${id}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
          .then((response) => {
            //console.log(response);
            setrefreshposts(!refreshposts);
          })
          .catch((error) => {
            if (error.response.status == "401") {
              setRefresh(!Refresh);
            }
          });
      }
    } else {
      if (auth) {
        axios({
          method: "Post",
          url: `https://newMommy.mooo.com:3003/api/Like/${id}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
          .then((response) => {
            //console.log(response);
            setrefreshposts(!refreshposts);
          })
          .catch((error) => {
            if (error.response.status == "401") {
              setRefresh(!Refresh);
            }
          });
      }
    }
  };
  const deletePost = (post: any) => {
    //console.log(post);
    if (auth) {
      axios({
        method: "DELETE",
        url: `https://newMommy.mooo.com:3003/api/post/${post.id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          //console.log(response);
          setrefreshposts(!refreshposts);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
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
          {group.userExistsInGroup ? (
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
        <a href={`/AddPostGroup/${groupid}`} className="addgroup">
          add post to {group.group.groupName} group
        </a>
        {group.posts.map((post: any) => {
          return (
            <div key={post.id} className="post">
              <div className="post-header">
                <div className="">
                  <Link to={`/user/${post.usersId}`}>
                    <img
                      src={
                        // post.Users.image ? post.Users.image :
                        postimg
                      }
                      alt="Profile"
                      className="profile-image"
                    />
                  </Link>
                  <div className="author-info">
                    <Link to={`/user/${post.usersId}`}>
                      {/* <span className="author-name">{`${post.Users.firstname} ${post.Users.lastname}`}</span> */}
                    </Link>

                    <span className="post-time">
                      {post.time.slice(11, 16)}{" "}
                      <span className="post-date">
                        {post.time.slice(0, 10)}
                      </span>
                    </span>
                  </div>
                </div>
                {user.id === post.usersId ? (
                  <div className="delete">
                    <i
                      onClick={() => {
                        deletePost(post);
                      }}
                      className="fa-solid fa-trash"
                    ></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="post-content">
                <p className="post-caption">{post.caption}</p>
                <img
                  src={post.media == null ? "" : post.media}
                  onError={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add("remove-this");
                  }}
                  alt="post Media"
                  className={
                    post.media == null ? "post-media remove-this" : "post-media"
                  }
                />
              </div>
              <div className="post-footer">
                <div className="post-stats">
                  <span className="like-count">{post.likeCount} Likes</span>
                </div>
              </div>
              <div className="post-actions">
                <span
                  onClick={(e) => {
                    handleAddLike(e, post.id);
                    e.currentTarget.classList.toggle("liked-this");
                  }}
                  className={
                    post.userExistsInLikes ? "like-add liked-this" : "like-add"
                  }
                >
                  Like
                </span>
                {/* <span className="comment-add">Comment</span> */}
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default GroupView;
