import axios from "axios";
import { useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthProvider";

const Posts = () => {
  const { auth } = useContext<any>(AuthContext);

  const config = {
    method: "GET",
    url: "https://newMommy.mooo.com:3003/api/feed",
    headers: {
      Authorization: `Bearer ${auth.access_token}`,
    },
  };
  useEffect(() => {
    if (auth) {
      axios(config)
        .then((response) => {
          console.log(response.data.posts);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth]);

  return <></>;
};
export default Posts;
