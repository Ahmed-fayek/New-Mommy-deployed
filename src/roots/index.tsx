import { Route, Routes, useNavigate } from "react-router-dom";
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
import AddMedicalDocs from "../views/medicals/add-medical-docs";
import Reminder from "../views/reminder";
import Activity from "../views/activity/allactivities";
import BabyFirsts from "../views/baby-firsts";
import Feeding from "../views/Feeding";
import Growth from "../views/growth";
// import Friends from "../views/Community/friends";
import DeleteAccount from "../views/deleteaccount/delete-account";
import Tracking from "../views/tracking/Tracking";
// import AllFriends from "../views/Community/friends/allFriends";
import SearchUsers from "../views/Community/friends/searchUsers";
import Community from "../views/Community/main";
import AddPost from "../views/Community/posts/addPost";
import { CommunityProvider } from "../context/CommunityProvider";

const MainRouer = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/babymoon" element={<FirstUse />}></Route>
        <Route path="/addbaby/:babyId?" element={<AddBaby />}></Route>
        <Route path="/emailconfim" element={<EmailConfirm />}></Route>
        <Route path="/confirmcode" element={<AccessCode />}></Route>
        <Route path="/resetpass" element={<ResetPAss />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/loading" element={<Loading />}></Route>
        <Route path="/resetEmail" element={<ResetEmail />}></Route>
        <Route path="/emailcodeConfirm" element={<CodeConfirm />}></Route>
        <Route path="/reminder" element={<Reminder />}></Route>
        <Route path="/addMedical/:meddicalId?" element={<AddMedical />}></Route>
        <Route path="/addMedicalDocs" element={<AddMedicalDocs />}></Route>
        <Route path="/medicalhistory" element={<MedicalHistory />}></Route>
        <Route path="/activity" element={<Activity />}></Route>
        <Route path="/addactivity/:actId?" element={<AddActivity />}></Route>
        <Route path="/feeding" element={<Feeding />}></Route>
        <Route path="/addfood/:foodId?" element={<AddFood />}></Route>
        <Route path="/growth" element={<Growth />}></Route>
        <Route path="/addgrowth/:growthId?" element={<AddGrowth />}></Route>
        <Route path="/babyFirsts" element={<BabyFirsts />}></Route>
        <Route path="/addFirist/:firstId?" element={<AddFirist />}></Route>
        <Route
          path="/addReminder/:reminderId?"
          element={<AddReminder />}
        ></Route>
        {/* <Route path="/Friends" element={<Friends />}></Route> */}
        <Route path="/deleteaccount" element={<DeleteAccount />}></Route>
        <Route path="/tracking" element={<Tracking />}></Route>
        <Route path="/searchusers" element={<SearchUsers />}></Route>
        {/* <Route path="/friends" element={<Friends />}></Route> */}
        <Route
          path="/community"
          element={
            <>
              <CommunityProvider>
                <Community />
              </CommunityProvider>
            </>
          }
        ></Route>
        <Route path="/AddPost" element={<AddPost />}></Route>
      </Routes>
    </>
  );
};
export default MainRouer;
