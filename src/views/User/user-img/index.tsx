import axios from "axios";
import AuthContext from "../../../context/AuthProvider";
import React, { useState, useContext, useEffect } from "react";

const UserImg = () => {
  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  const [images, setImages] = useState<FileList | null>(null);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (images) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      if (user) {
        axios({
          method: "POST",
          url: "https://newmommy.mooo.com:3003/api/uploadProfileImage",
          data: formData,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            console.log(res);
            alert("Profile updated successfully!");
          })
          .catch((error) => {
            if (error.response.status == "401") {
              setRefresh(!Refresh);
            }
          });
      }
    }
  };
  //       useEffect(()=>{
  //       if(auth){
  //             axios({
  //                   method: "GET",
  //                   url: "https://newMommy.mooo.com:3003/api/profileById/64f94ef08963ab728f070230",
  //                   headers: {
  //                         Authorization: `Bearer ${auth.access_token}`,
  //             },
  //             })
  //             .then((res) => {
  //                   console.log(res)
  //             })
  //             .catch((error) => {
  //                     const { setRefresh } = useContext<any>(AuthContext);
  // const { Refresh } = useContext<any>(AuthContext);
  // if (error.response.status == "401") {
  //   setRefresh(!Refresh);
  // }
  //             });
  //       }
  //       })
  //  console.log(user.picture)
  return (
    <div style={{ marginTop: "100px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="images">Upload Images:</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Uploade Image Profile</button>
      </form>
    </div>
  );
};

export default UserImg;
