import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthProvider";
import postimg from "./../../../assets/images/bro.svg";
import postimgerr from "./../../../assets/images/msid-69754806,imgsize-34865.jpg";
import "./styles.css";
const Post = () => {
  const firstname = "aaa",
    lastname = "ddd",
    image = "ee",
    caption = "ewewe",
    commentCount = "5",
    likeCount = "15",
    time = "post";
  const { auth } = useContext<any>(AuthContext);
  const [posts, setposts] = useState<any>();
  const [IsLooding, setIsLooding] = useState<any>(true);
  useEffect(() => {
    if (auth) {
      axios({
        method: "GET",
        url: "https://newMommy.mooo.com:3003/api/feed",
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
          console.log(error);
        });
    }
  }, [auth]);
  const handleAddLike = (ele: any, id: any) => {
    console.log(ele.currentTarget.classList.contains("liked-this"));
    if (ele.currentTarget.classList.contains("liked-this")) {
      console.log("eee");
      if (auth) {
        axios({
          method: "Post",
          url: `https://newMommy.mooo.com:3003/api/unlike/${id}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
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
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  return (
    <div className="Posts">
      {IsLooding ? (
        <>Loading</>
      ) : (
        posts.map((post: any) => {
          return (
            <div key={post.id} className="post">
              <div className="post-header">
                <img src={postimg} alt="Profile" className="profile-image" />
                <div className="author-info">
                  <span className="author-name">{`${post.Users.firstname} ${post.Users.lastname}`}</span>
                  <span className="post-time">{time}</span>
                </div>
              </div>
              <div className="post-content">
                <p className="post-caption">{caption}</p>
                <img
                  src={post.media == null ? postimgerr : post.media}
                  onError={(e) => {
                    e.currentTarget.classList.add("remove-this");
                  }}
                  alt="post Media"
                  className="post-media"
                />
              </div>
              <div className="post-footer">
                <div className="post-stats">
                  <span className="like-count">{post.likeCount} Likes</span>
                  <span className="comment-count">
                    {post.commentCount} Comments
                  </span>
                </div>
              </div>
              <div className="post-actions">
                <span
                  onClick={(e) => {
                    handleAddLike(e, post.id);
                    e.currentTarget.classList.toggle("liked-this");
                  }}
                  className="like-add"
                >
                  Like
                </span>
                <span className="comment-add">Comment</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Post;
