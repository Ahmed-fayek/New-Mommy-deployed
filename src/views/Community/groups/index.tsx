import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import { Autherror } from "../../../services/auth404";
import RecommendedGroups from "./recommended-Groups";
import AllGroups from "./allGroups";

const Groups = () => {
  // Autherror("error");

  return (
    <>
      <div className="groups">
        <AllGroups />
        <RecommendedGroups />
      </div>
    </>
  );
};
export default Groups;
