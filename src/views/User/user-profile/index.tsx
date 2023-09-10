import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import "./styles.css";
import Loading from "../../../components/Loading";
import defaultimg from "./../../../assets/images/Layer 1.svg";
import defaultpimg from "./../../../assets/images/momandbaby.png";
const UserProfile = () => {
  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);

  const [profile, setprofile] = useState<any>();
  const [postlokes, setpostlokes] = useState<any>(false);
  const { userid } = useParams();
  useEffect(() => {
    if (auth) {
      axios({
        method: "GET",
        url: `https://newMommy.mooo.com:3003/api/profileById/${userid}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          setprofile(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  }, [auth, postlokes]);

  const handleAddLike = (ele: any, id: any, likeCounts: any) => {
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
            // console.log(response);
            setpostlokes(!postlokes);
          })
          .catch((error) => {
            // console.log(error);
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
            // console.log(response);
            setpostlokes(!postlokes);
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    }
  };

  if (profile) {
    return (
      <>
        <div className="profile-view">
          <div className="profile-images">
            <div className="cover">
              <img
                src={profile.user.cover ? profile.user.cover : defaultimg}
                alt=""
              />
              <div className="profileimg">
                <img
                  src={profile.user.image ? profile.user.image : defaultpimg}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="profile-name">
            <h1>
              {" "}
              {profile.user.firstname} {profile.user.lastname}
            </h1>
            {profile.userExistsInFriends ? (
              <button
                onClick={() => {
                  // handleleaveGroup(groupid);
                }}
              >
                Unfriend
              </button>
            ) : (
              <button
                onClick={() => {
                  // handleJoinGroup(groupid);
                }}
              >
                Add friend{" "}
              </button>
            )}
          </div>
          <div className="posts">
            {profile.posts.map((post: any) => {
              return (
                <div key={post.id} className="post">
                  <div className="post-header">
                    <div className="">
                      {/* <img src={postimg} alt="Profile" className="profile-image" /> */}
                      <div className="author-info">
                        <span className="author-name">{`${profile.user.firstname} ${profile.user.lastname}`}</span>
                        <span className="post-time">
                          {post.time.slice(11, 16)}{" "}
                          <span className="post-date">
                            {post.time.slice(0, 10)}
                          </span>
                        </span>
                      </div>
                    </div>
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
                        post.media == null
                          ? "post-media remove-this"
                          : "post-media"
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
                        handleAddLike(e, post.id, post.likeCount);
                        e.currentTarget.classList.toggle("liked-this");
                      }}
                      className={
                        post.userExistsInLikes
                          ? "like-add liked-this"
                          : "like-add"
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
        </div>
      </>
    );
  } else {
    return <Loading />;
  }
};
export default UserProfile;
