import React, { useState ,useContext } from 'react';
import AuthContext from '../../../context/AuthProvider';
import axios from "axios";


const UpdateBabyProfile = () => {
  const [babyName, setBabyName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [images, setImages] = useState<any>(null);
  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('babyName', babyName);
    formData.append('gender', gender);
    formData.append('birthDate', birthDate);

if (images) {
       for (let i = 0; i < images.length; i++) {
        formData.append("images", images);
       }
}
  

    if (auth) {
      await axios({
       method: 'PATCH',
       data: formData,
        url: `https://newMommy.mooo.com:3002/api/users/updateBaby/:id`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
          "Content-Type": "multipart/form-data"
        },
      })
        .then((res) => {
          console.log(res.data);
          alert("baby updated successfully!");
        })
        .catch((error) => {
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
}

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="babyName">Baby Name:</label>
        <input
          type="text"
          id="babyName"
          value={babyName}
          onChange={(e) => setBabyName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <input
          type="text"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="birthDate">Birth Date:</label>
        <input
          type="text"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="images">Baby Image:</label>
        <input
          type="file"
          id="images"
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
        />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateBabyProfile;
