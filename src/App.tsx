import SignIn from "./components/signIn/signIn";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/signUp/Signup";

function App() {

  return (
    <div className='App'>
        <Routes>
            <Route path="/" element={<SignIn />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;






// import React, { useEffect, useState } from 'react';
// import './App.css';
// import UsersList from './components/UsersList';
// export interface IState{
// users:{
//     name:string,
//     url:string,
//     age: number,
//     natio:string
//   }[]
// }

// function App() {
//   const [users, setusers] = useState<IState['users']>([{
//     name: "Ahmed",
//     url:"https://imglarger.com/Images/before-after/ai-image-enlarger-1-after-2.jpg",
//     age: 30,
//     natio:"Egypt"
//   }]);
//     const [name, setName] = useState('');
//   const [src, setSrc] = useState('');
//   const [age, setage] = useState('');
//   const [nationality, senationality] = useState('');
//   const adduser = () => {
//     setusers([...users, {
//       name: name,
//     url:src,
//     age: parseInt(age),
//     natio:nationality}])
//      }
//   return (
//     <div className='App'>
//       <h1>Users in my website</h1>
//       <UsersList users={users} />
//   <div className='form' id='form'>
//         <input type="text" placeholder='enter the name' onChange={(e) => {
//           setName(e.target.value)
//         }} />
//         <input type="number" placeholder='enter the age' onChange={(e) => {
//           setage(e.target.value)
//         }} />
//         <input type="text"  placeholder='enter the src' onChange={(e) => {
//           setSrc(e.target.value)
//         }} />
//         <input type="text"  placeholder='enter the nationality' onChange={(e) => {
//           senationality(e.target.value)
//         }} />
//                 <button className='addbtn' onClick={()=>{adduser()}}> Add User</button>

//       </div>

//     </div>
//   );
// }

// export default App;
