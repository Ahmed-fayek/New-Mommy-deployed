import { Route, Routes } from "react-router-dom";
import Welcome from "../views/welcome";
import SignIn from "../views/signIn";
import Signup from "../views/signUp";
import FirstUse from "../views/First-use";
import AddBaby from "../views/add-baby";

const MainRouer = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/babymoon" element={<FirstUse />}></Route>
        <Route path="/addbaby" element={<AddBaby />}></Route>
      </Routes>
    </>
  );
};
export default MainRouer;
