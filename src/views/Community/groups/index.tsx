import { useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import Community from "../main";

const Groups = () => {
  const { auth } = useContext<any>(AuthContext);
  useEffect(() => {
    if (auth) {
      axios({
        method: "GET",
        url: "https://newMommy.mooo.com:3003/api/recommendedGroups",
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
  }, [auth]);
  return (
    <>
      <div className="likes"></div>
    </>
  );
};
export default Groups;
