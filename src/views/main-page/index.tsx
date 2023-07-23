import { useContext } from "react";
import { Link } from "react-router-dom";
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
          <h1>Hello {userName}</h1>
          <Link to={"/addbaby"}>addbaby</Link> <br></br>
          <br></br>
          <Link to={"/loading"}>loading</Link> <br></br>
          <br></br>
          <Link to={"/addMedical"}>addMedical</Link> <br></br>
          <br></br>
          <Link to={"/addMedicalDocs"}>addMedicalDocs</Link> <br></br>
          <br></br>
          <Link to={"/medicalhistory"}>medicalhistory</Link> <br></br>
          <br></br>
          <Link to={"/activity"}>activity</Link> <br></br>
          <br></br>
          <Link to={"/addactivity"}>addactivity</Link> <br></br>
          <br></br>
          <Link to={"/feeding"}>feeding</Link> <br></br>
          <br></br>
          <Link to={"/addfood"}>addfood</Link> <br></br>
          <br></br>
          <Link to={"/growth"}>growth</Link> <br></br>
          <br></br>
          <Link to={"/addgrowth"}>addgrowth</Link> <br></br>
          <br></br>
          <Link to={"/addFirist"}>addFirist</Link> <br></br>
          <br></br>
          <Link to={"/babyFirsts"}>babyFirsts</Link> <br></br>
          <br></br>
          <Link to={"/addReminder"}>addReminder</Link> <br></br>
          <br></br>
          <Link to={"/reminder"}>reminder</Link> <br></br>
          <br></br>
          <Link to={"/"}></Link> <br></br>
          <br></br>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};
export default MainPage;
