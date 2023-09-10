import RecommendedGroups from "./recommended-Groups";
import AllGroups from "./allGroups";

const Groups = () => {
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
