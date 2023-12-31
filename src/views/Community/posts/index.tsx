import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthProvider";
import postimg from "./../../../assets/images/bro.svg";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { Feed, Like, Newpost, unlike } from "../../../api";
const Post = () => {
  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);

  // console.log(user);
  const [posts, setposts] = useState<any>();
  const [refreshposts, setrefreshposts] = useState<any>(false);
  const [IsLooding, setIsLooding] = useState<any>(true);
  const [deleting, setdeleting] = useState<any>("");
  const navigator = useNavigate();
  //get All posts
  useEffect(() => {
    if (auth) {
      axios({
        method: "GET",
        url: `${Feed}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          console.log(response.data.posts);
          setposts(response.data.posts);
          setIsLooding(false);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  }, [auth, refreshposts]);
  // handle like and unlike
  const handleAddLike = (ele: any, id: any) => {
    if (ele.currentTarget.classList.contains("liked-this")) {
      if (auth) {
        axios({
          method: "Post",
          url: `${unlike}/${id}`,
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
          url: `${Like}/${id}`,
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
        url: `${Newpost}/${post.id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((response) => {
          //console.log(response);
          setdeleting("deleted");
          setrefreshposts(!refreshposts);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  };

  return (
    <div className="Posts">
{/* <<<<<<< HEAD */}

      <a href="/AddPost" className="addPost">

        Add post
      </a>


{/* ======= */}
      {/* <Link to="/AddPost" className="addPost">
        Add post
      </Link> */}
{/* >>>>>>> 552be009971f95355b021162721eb75416048267 */}
      {IsLooding ? (
        <>Loading</>
      ) : (
        posts.map((post: any) => {
          return (
            <div key={post.id} className="post">
              <div className="post-header">
                <div className="">
                  <img
                    src={post.Users.image ? post.Users.image : postimg}
                    onClick={() => {
                      navigator(`/user/${post.Users.id}`);
                    }}
                    alt="Profile"
                    className="profile-image"
                  />
                  <div className="author-info">
                    <span
                      onClick={() => {
                        navigator(`/user/${post.Users.id}`);
                      }}
                      className="author-name"
                    >{`${post.Users.firstname} ${post.Users.lastname}`}</span>
                    <span className="post-time">
                      {post.time.slice(11, 16)}{" "}
                      <span className="post-date">
                        {post.time.slice(0, 10)}
                      </span>
                    </span>
                  </div>
                </div>
                {user.id === post.Users.id ? (
                  <div className="delete">
                    {/* {deleting} */}
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
                  <i className="fa-regular fa-heart  iconlike"></i>
                </span>
                {/* <span className="comment-add">Comment</span> */}
              </div>

                </div>
              </div>

              {/* ******************************* */}

{/*               
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
                  <i className="fa-regular fa-heart  iconlike"></i>
                </span> */}
                {/* <span className="comment-add">Comment</span> */}
              {/* </div> */}
{/* *********************** */}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Post;
