import React, { useState } from 'react';
import './tracking.css';
import MainPage from '../main-page';
import DeleteAccount from '../deleteaccount/delete-account';

const Tracking= () => {
  const [activeComponent, setActiveComponent] = useState<string>('Reminder');
  const changeActiveComponent = (component: string) => {
    setActiveComponent(component);
  };
  // Define components to render based on activeComponent
  const components: Record<string, JSX.Element> = {
    Reminder: <MainPage/>,
    Medical:<DeleteAccount/>,
  };

  return (
    <div className='container'>
      <div className='sidebar'>
        <ul>
          <li onClick={() => changeActiveComponent('Reminder')}>
          <i className="fa-solid fa-clock-rotate-left"></i>
            <span>Reminders</span>
          </li>
          <li onClick={() => changeActiveComponent('Medical')}>
          <i className="fa-solid fa-stethoscope"></i>
            <span>Health</span>
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
          <li onClick={() => changeActiveComponent('I_Dont_Know')}>
            <i className="fa-solid fa-baby"></i>
            <span>Baby firsts</span>
          </li>
        </ul>
      </div>
      {/* Active Component  */}
      <div className="content">{components[activeComponent]}</div>
    </div>
  );
};

export default Tracking;
