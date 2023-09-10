import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios from "axios";
import defaultimg from "./../../../assets/images/Layer 1.svg";
import defaultpimg from "./../../../assets/images/momandbaby.png";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
const MyProfile = () => {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const { setmyUser } = useContext<any>(AuthContext);
  const { myuser } = useContext<any>(AuthContext);
  const [myprofile, setmyprofile] = useState<any>();
  const [postlokes, setpostlokes] = useState(false);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const navigator = useNavigate();
  useEffect(() => {
    if (auth && user) {
      axios({
        method: "GET",
        url: `https://newMommy.mooo.com:3003/api/profileById/${user.id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          setmyprofile(response.data);
          setmyUser(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  }, [auth, postlokes, user]);
  //user => babies email name ..
  //profile by id => image cover name posts ///////
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
            // console.log(response);
            setpostlokes(!postlokes);
          })
          .catch((error) => {
            if (error.response.status == "401") {
              setRefresh(!Refresh);
            }
          });
      }
    }
  };
  if (myprofile) {
    return (
      <>
        <div className="profile-view">
          <div className="profile-images">
            <div className="cover">
              <img
                src={myprofile.user.cover ? myprofile.user.cover : defaultimg}
                alt=""
              />
              <div className="profileimg">
                <img
                  src={
                    myprofile.user.image ? myprofile.user.image : defaultpimg
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="profile-name">
            <h1>
              {" "}
              {myprofile.user.firstname} {myprofile.user.lastname}
            </h1>
            <button
              onClick={() => {
                navigator("/userimg");
              }}
            >
              Edit Profile
            </button>
          </div>
          <div className="Posts">
            <h1>All posts</h1>
            {myprofile.posts.map((post: any) => {
              return (
                <div key={post.id} className="post">
                  <div className="post-header">
                    <div className="">
                      <img
                        src={myprofile.user.image}
                        alt="Profile"
                        className="profile-image"
                      />
                      <div className="author-info">
                        <span className="author-name">{`${myprofile.user.firstname} ${myprofile.user.lastname}`}</span>
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
export default MyProfile;
