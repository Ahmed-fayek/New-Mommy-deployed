import { Route, Routes } from "react-router-dom";

// import AllFriends from "../views/Community/friends/allFriends";
import SearchUsers from "../views/Community/friends/searchUsers";
import Community from "../views/Community/main";
import AddPost from "../views/Community/posts/addPost";
import { CommunityProvider } from "../context/CommunityProvider";
import Welcome from "../views/Components/welcome";
import SignIn from "../views/Auth/signIn";
import Signup from "../views/Auth/signUp";
import FirstUse from "../views/Components/First-use";
import AddBaby from "../views/User/add-baby";
import EmailConfirm from "../views/Auth/reset-pass";
import AccessCode from "../views/Auth/reset-pass/Accesscode/AccessCode";
import ResetPAss from "../views/Auth/reset-pass/resetpass/resetPass";
import MainPage from "../views/Components/main-page";
import Loading from "../components/Loading";
import ResetEmail from "../views/Auth/reset-email";
import CodeConfirm from "../views/Auth/reset-email/codeconfirm.tsx";
import Reminder from "../views/TheTracking/reminder";
import AddMedical from "../views/TheTracking/medicals/addMedical";
import AddMedicalDocs from "../views/TheTracking/medicals/add-medical-docs";
import MedicalHistory from "../views/TheTracking/medicals/medical history";
import Activity from "../views/TheTracking/activity/allactivities";
import AddActivity from "../views/TheTracking/activity/addactivity";
import Feeding from "../views/TheTracking/Feeding";
import AddFood from "../views/TheTracking/Feeding/add-food";
import Growth from "../views/TheTracking/growth";
import AddGrowth from "../views/TheTracking/growth/addgrowth";
import BabyFirsts from "../views/TheTracking/baby-firsts";
import AddFirist from "../views/TheTracking/baby-firsts/add-first";
import AddReminder from "../views/TheTracking/reminder/add-reminder";
import { DeleteAccount } from "../api";
import Tracking from "../views/TheTracking/tracking/Tracking";
import GroupView from "../views/Community/groups/group";
import UserProfile from "../views/User/user-profile";
import UserImg from "../views/User/user-img";
import MyProfile from "../views/User/myprofile";
import CreateGroup from "../views/Community/groups/addGroup";
import AddPostGroup from "../views/Community/groups/addpostgroup";
import Learning from "../views/learning";
import BabyTrack from "../views/TheTracking/BabyTracker";

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
        <Route path="/GroupView/:groupid" element={<GroupView />}></Route>
        <Route path="/user/:userid" element={<UserProfile />}></Route>
        <Route path="/learning" element={<Learning />}></Route>
        <Route path="/BabyTrack" element={<BabyTrack />}></Route>
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
        <Route path="/searchUser" element={<SearchUsers />}></Route>
        <Route path="/userimg" element={<UserImg />}></Route>
        <Route path="/my-profile" element={<MyProfile />}></Route>
        <Route path="/addgroup" element={<CreateGroup />}></Route>
        <Route path="/AddPostGroup/:groupid" element={<AddPostGroup />}></Route>
      </Routes>
    </>
  );
};
export default MainRouer;
