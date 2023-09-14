import axios from "axios";
import { useContext, useState } from "react";
import "./styles.css";
import AuthContext from "../../../../context/AuthProvider";
import { postProfile } from "../../../../api";
const AddPost = () => {
  const { auth } = useContext<any>(AuthContext);
  const [images, setImages] = useState<any>();
  const [caption, setCaption] = useState("");
  const [captionErrMsg, setcaptionErrMsg] = useState("");
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const handleCaption = (e: any) => {
    if (e.target.value === "") {
      setcaptionErrMsg("");
      setCaption(e.target.value);
    } else {
      setCaption(e.target.value);
    }
  };
  const handleimage = (e: any) => {
    setImages(e.target.files[0]);
  };

  const formdata = new FormData();

  const handleSubmit = () => {
    //console.log(caption);

    if (caption == "") {
      setcaptionErrMsg("Caption can't be empty");
    } else {
      formdata.append("images", images);
      formdata.append("caption", caption);
      axios({
        method: "POST",
        url: `${postProfile}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
        data: formdata,
      })
        .then((response) => {
          //console.log(response);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }

    // axios({
    //   method: "POST",
    //   url: `https://newMommy.mooo.com:3003/api/postGroup/64847dd92424ea5a43b1caea`,
    //   headers: {
    //     Authorization: `Bearer ${auth.access_token}`,
    //   },
    //   data: formdata,
    // })
    //   .then((response) => {
    //     //console.log(response);
    //   })
    //   .catch((error) => {

    // if (error.response.status == "401") {
    //   setRefresh(!Refresh);
    // }
    //   });
  };
  return (
    <div className="add-post">
      <h1>Add Post</h1>
      <div className="add-post-block">
        <input
          onChange={(e) => {
            handleCaption(e);
          }}
          type="text"
          name="caption"
          placeholder="Caption"
        />
        <input
          onChange={(e) => {
            handleimage(e);
          }}
          type="file"
          name="images"
        />
        <div className="submit-err">
          <button className="addPostbtn" onClick={handleSubmit}>
            Add Post
          </button>
          {captionErrMsg}
        </div>
        <a href="/community">Back to all posts</a>
      </div>
    </div>
  );
};
export default AddPost;
