import { useContext } from "react";
import "./styles.css";
import AuthContext from "../../conrext/AuthProvider";
import Loading from "../../components/Loading";
const MainPage = () => {
  const { user } = useContext<any>(AuthContext);
  let userName = "";
  if (user) {
    userName = user.firstname;
    return (
      <div className="main-page">
        <div className="main-page-content">
          {/* <h1>Hello {userName}</h1> */}
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};
export default MainPage;
