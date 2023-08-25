import React, { useState } from 'react';
import './tracking.css';
import MainPage from '../main-page';
import Activity from '../activity/allactivities';
import Reminder from '../reminder';
import MedicalHistory from '../medicals/medical history';
import Feeding from '../Feeding';
import Growth from '../growth';
import BabyFirsts from '../baby-firsts';
import { useNavigate } from 'react-router-dom';

const Tracking= () => {
  const navigator = useNavigate();
  const [activeComponent, setActiveComponent] = useState<string>('Reminder');
  const changeActiveComponent = (component: string) => {
    setActiveComponent(component);
  };
  // Define components to render based on activeComponent
  const components: Record<string, JSX.Element> = {
    Reminder: <Reminder/>,
    Activity:<Activity />,
    Medicals:<MedicalHistory />,
    Feeding:<Feeding />,
    Growth:<Growth />,
    Firsts:<BabyFirsts />,
    Main:<MainPage />
  };

  return (
    <div className='container'>
      <div className='sidebar'>
        <ul>
          <li onClick={() => navigator('/main')}>
          <i className="fa-solid fa-house"></i>            
          <span>Main</span>
          </li>
          <li onClick={() => changeActiveComponent('Reminder')}>
          <i className="fa-solid fa-clock-rotate-left"></i>
            <span>Reminders</span>
          </li>
          <li onClick={() => changeActiveComponent('Medicals')}>
          <i className="fa-solid fa-stethoscope"></i> 
            <span>Medicals</span>
          </li>
          <li onClick={() => changeActiveComponent('Activity')}>
          <i className="fa-solid fa-futbol"></i>
            <span>Activity</span>
          </li>
          <li onClick={() => changeActiveComponent('Feeding')}>
          <i className="fa-solid fa-mug-hot"></i>
            <span>Feeding</span>
          </li>
          <li onClick={() => changeActiveComponent('Growth')}>
          <i className="fa-solid fa-bolt"></i>
            <span>Growth</span>
          </li>
          <li onClick={() => changeActiveComponent('Firsts')}>
          <i className="fa-solid fa-baby"></i>            <span>Firsts</span>
          </li>
        </ul>
      </div>
      {/* Active Component  */}
      <div className="content">{components[activeComponent]}</div>
    </div>
  );
};

export default Tracking;
