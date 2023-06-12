import axios from "axios";
import { UsersApi } from "./api";
function SetToken(accToken: string, refToken: string) {
  localStorage.setItem("token", accToken);
  //     axios({
  //       method: "post",
  //       url: UsersApi,
  //       data: {},
  //     })
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  console.log(accToken);
  console.log(refToken);
}
export default SetToken;
