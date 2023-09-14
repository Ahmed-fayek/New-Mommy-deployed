import React, { useContext, useState } from "react";
import "./tracking.css";
import Activity from "../activity/allactivities";
import Reminder from "../reminder";
import MedicalHistory from "../medicals/medical history";
import Feeding from "../Feeding";
import Growth from "../growth";
import BabyFirsts from "../baby-firsts";
import { Link, useNavigate } from "react-router-dom";
import MainPage from "../../Components/main-page";

import logo from "./../../../assets/images/Layer 1.svg";
import AuthContext from "../../../context/AuthProvider";
import Loading from "../../../components/Loading";

const Tracking = () => {
  const navigator = useNavigate();
  const { user } = useContext<any>(AuthContext);
  const [activeComponent, setActiveComponent] = useState<string>("Reminder");
  const changeActiveComponent = (component: string) => {
    setActiveComponent(component);
  };
  // Define components to render based on activeComponent
  const components: Record<string, JSX.Element> = {
    Reminder: <Reminder />,
    Activity: <Activity />,
    Medicals: <MedicalHistory />,
    Feeding: <Feeding />,
    Growth: <Growth />,
    Firsts: <BabyFirsts />,
    Main: <MainPage />,
  };
  if (user) {
    if (Object.keys(user).length > 0) {
      if (user.baby.length < 1) {
        return (
          <div className="AddBAbyToTrack">
            <h1>Add Your baby to track him/her </h1>
            <Link to={"/addbaby"}>Add Baby </Link>
          </div>
        );
      } else {
        return (
          <div className="container">
            <div className="sidebar">
              <img src={logo}></img>

              <ul>
                <li onClick={() => navigator("/main")}>
                  <i className="fa-solid fa-house"></i>
                  <span>Main</span>
                </li>
                <li onClick={() => changeActiveComponent("Reminder")}>
                  <i className="fa-solid fa-clock-rotate-left"></i>
                  <span>Reminders</span>
                </li>
                <li onClick={() => changeActiveComponent("Medicals")}>
                  <i className="fa-solid fa-stethoscope"></i>
                  <span>Medicals</span>
                </li>
                <li onClick={() => changeActiveComponent("Activity")}>
                  <i className="fa-solid fa-futbol"></i>
                  <span>Activity</span>
                </li>
                <li onClick={() => changeActiveComponent("Feeding")}>
                  <i className="fa-solid fa-mug-hot"></i>
                  <span>Feeding</span>
                </li>
                <li onClick={() => changeActiveComponent("Growth")}>
                  <i className="fa-solid fa-bolt"></i>
                  <span>Growth</span>
                </li>
                <li onClick={() => changeActiveComponent("Firsts")}>
                  <i className="fa-solid fa-baby"></i> <span>Firsts</span>
                </li>
              </ul>
            </div>
            {/* Active Component  */}
            <div className="content">{components[activeComponent]}</div>
          </div>
        );
      }
    } else {
      return <Loading />;
    }
  } else {
    return <Loading />;
  }
};

export default Tracking;
