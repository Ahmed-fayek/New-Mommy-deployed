import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import { AddNewCategory } from "../../../../api";

const AddMedicalDocs = () => {
  const navigator = useNavigate();
  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);
  const [file, setfile] = useState<string>("");
  const [SubmiterrMsg, setSubmiterrMsg] = useState<string>("");
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const [successMessageVisible, setSuccessMessageVisible] =
    useState<string>("");
  {
    /* file */
  }
  const fileval = (e: any) => {
    setfile(e.target.files[0]);
  };
  /* submit  */
  const formData = new FormData();

  // let babyage=BabyAge("","")
  const submitVal = async () => {
    formData.append("images", file);
    // //console.log(auth);

    await axios({
      method: "post",
      url: `${AddNewCategory}/addMedicalDocument/${user.baby[0].id}`,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
      data: formData,
    })
      .then((res) => {
        // //console.log(res);
        setSuccessMessageVisible("successful added "); // Show success message
        // Redirect to main page after 3 seconds
        setTimeout(() => {
          navigator("/tracking");
        }, 3000);
      })
      .catch((err) => {
        if (err.response.status == "401") {
          setRefresh(!Refresh);
        }
      });
  };

  return (
    <div className="add-medical">
      <div className="container">
        <div className="signup-block">
          <h2>Add Medical Docs</h2>
          {/* file */}
          <div className="pic__field">
            <input
              className="input__field"
              type="file"
              onChange={(e) => {
                if (e.target.files?.length) {
                  fileval(e);
                } else {
                  // //console.log("select");
                }
              }}
            />
          </div>
          {/* Submit */}
          <button
            onClick={() => {
              if (file) {
                setSubmiterrMsg("");
                submitVal();
              } else {
                setSubmiterrMsg("check data");
              }
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text"> Add Medical</span>
          </button>
          {/*err msg */}
          <p>{SubmiterrMsg}</p>
          {/*Go to Main */}
          <button
            onClick={() => {
              navigator("/tracking");
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text">Cancel</span>
          </button>
        </div>
        <div className="msg">
          <p>{successMessageVisible}</p>
        </div>
      </div>
    </div>
  );
};
export default AddMedicalDocs;
