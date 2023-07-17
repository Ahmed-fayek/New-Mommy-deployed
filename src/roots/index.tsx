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
import Loading from "../components/Loading";
import ResetEmail from "../views/reset-email";
import CodeConfirm from "../views/reset-email/codeconfirm.tsx";
import AddMedical from "../views/medicals/addMedical";
import MedicalHistory from "../views/medicals/medical history";
import AddActivity from "../views/activity/addactivity";
import AddFood from "../views/Feeding/add-food";
import AddGrowth from "../views/growth/addgrowth";
import AddFirist from "../views/baby-firsts/add-first";
import AddReminder from "../views/reminder/add-reminder";

const MainRouer = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Welcome />
            </>
          }
        ></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/babymoon" element={<FirstUse />}></Route>
        <Route path="/addbaby" element={<AddBaby />}></Route>
        <Route path="/emailconfim" element={<EmailConfirm />}></Route>
        <Route path="/confirmcode" element={<AccessCode />}></Route>
        <Route path="/resetpass" element={<ResetPAss />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/loading" element={<Loading />}></Route>
        <Route path="/resetEmail" element={<ResetEmail />}></Route>
        <Route path="/emailcodeConfirm" element={<CodeConfirm />}></Route>
        <Route path="/addMedical" element={<AddMedical />}></Route>
        <Route path="/medicalhistory" element={<MedicalHistory />}></Route>
        <Route path="/addactivity" element={<AddActivity />}></Route>
        <Route path="/addfood" element={<AddFood />}></Route>
        <Route path="/addgrowth" element={<AddGrowth />}></Route>
        <Route path="/addFirist" element={<AddFirist />}></Route>
        <Route path="/addReminder" element={<AddReminder />}></Route>
      </Routes>
    </>
  );
};
export default MainRouer;
