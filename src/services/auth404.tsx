import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
export const Autherror = (error: any) => {
  const { autherror } = useContext<any>(AuthContext);
  const { setautherror } = useContext<any>(AuthContext);
  setautherror(error);
  // console.log(autherror);
  return <></>;
};
