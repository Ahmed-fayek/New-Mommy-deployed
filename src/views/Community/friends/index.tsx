import axios from "../../../api/axios";
import { useContext, useEffect, useState } from "react";

function Friends() {
  useEffect(() => {
    axios({
      method: "post",
      url: "NewbabyApi",
      headers: {
        Authorization: `Bearer ${"auth.access_token"}`,
      },
    });
  }, []);

  return <>sssssssss</>;
}
export default Friends;
