import axios from "axios";
import { useContext, useState } from "react";
import "./styles.css";
import AuthContext from "../../../../context/AuthProvider";
const AddPost = () => {
  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  console.log(user);

  const [groupID, setGroupID] = useState("");
  const [images, setImages] = useState<any>();
  const [caption, setCaption] = useState("");
  const handleGroupId = (e: any) => {
    setGroupID(e.target.value);
    console.log(e.target.value);
  };
  const handleCaption = (e: any) => {
    setCaption(e.target.value);
    console.log(e.target.value);
  };
  const handleimage = (e: any) => {
    setImages(e.target.files[0]);
    console.log(e.target.files);
  };

  const formdata = new FormData();

  const handleSubmit = () => {
    console.log(images);
    console.log(caption);
    formdata.append("images", images);
    formdata.append("caption", caption);
    axios({
      method: "POST",
      url: `https://newMommy.mooo.com:3003/api/postProfile`,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
      data: formdata,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios({
    //   method: "POST",
    //   url: `https://newMommy.mooo.com:3003/api/postGroup/64847dd92424ea5a43b1caea`,
    //   headers: {
    //     Authorization: `Bearer ${auth.access_token}`,
    //   },
    //   data: formdata,
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <div className="add-post">
      <h1>Add Post</h1>
      <div className="add-post-block">
        <input
          onChange={(e) => {
            handleGroupId(e);
          }}
          type="text"
          name="groupID"
          placeholder="Group ID"
        />
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
        <button onClick={handleSubmit}>Add Post</button>
        <a href="/community">Back to all posts</a>
      </div>
    </div>
  );
};
export default AddPost;
