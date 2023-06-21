import { Route, Routes } from "react-router-dom";
import Welcome from "../views/welcome";
import SignIn from "../views/signIn";
import Signup from "../views/signUp";
import FirstUse from "../views/First-use";
import AddBaby from "../views/add-baby";
import EmailConfirm from "../views/reset-pass";
import AccessCode from "../views/reset-pass/Accesscode/AccessCode";
import ResetPAss from "../views/reset-pass/resetpass/resetPass";
import MainPage from "../views/main-page";

const MainRouer = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/babymoon" element={<FirstUse />}></Route>
        <Route path="/addbaby" element={<AddBaby />}></Route>
        <Route path="/emailconfim" element={<EmailConfirm />}></Route>
        <Route path="/confirmcode" element={<AccessCode />}></Route>
        <Route path="/resetpass" element={<ResetPAss />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
      </Routes>
    </>
  );
};
export default MainRouer;
