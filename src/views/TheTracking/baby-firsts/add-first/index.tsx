import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import { AddNewCategory } from "../../../../api";

const AddFirist = () => {
  const navigator = useNavigate();

  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);

  let currentDate: Date = new Date();
  let dateFormat = currentDate.toJSON().slice(0, 10);
  const [babyFirst, setbabyFirst] = useState<string>("");
  const [note, setnote] = useState<string>("");
  const [reportDate, setreportDate] = useState<string>(dateFormat);
  const [file, setfile] = useState("");
  const [image, setimage] = useState(false);
  const [babyFirstErrMsg, setbabyFirstErrMsg] = useState<string>("");
  const [noteErrMsg, setnoteErrMsg] = useState<string>("");
  const [SubmiterrMsg, setSubmiterrMsg] = useState<string>("");
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const [successMessageVisible, setSuccessMessageVisible] =
    useState<string>("");

  /* Update value tells me if this is adding or update */
  const { firstId } = useParams();
  const [Update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (firstId) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  }, [firstId]);
  useEffect(() => {
    if (Update) {
      if (user) {
        axios({
          method: "GET",
          url: `${AddNewCategory}/firstById/${firstId}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            setbabyFirst(response.data.first.babyFirst);
            setnote(response.data.first.note);
            setreportDate(response.data.first.date);
            setfile(response.data.first.image);
            setimage(true);
          })
          .catch((error) => {
            if (error.response.status == "401") {
              setRefresh(!Refresh);
            }
          });
      }
    }
  }, [Update, user]);
  var nameVal = new RegExp("^[A-Za-z]*$");

  /* Dr Name  */
  const babyFirstVal = (e: any) => {
    // if (e.target.value == "") {
    //   setbabyFirst(e.target.value);
    //   setbabyFirstErrMsg("invalid data");
    // } else {
    //   setbabyFirst(e.target.value);
    //   setbabyFirstErrMsg("");
    // }
    setbabyFirst(e.target.value);
  };

  /* report Date  */
  const reportDateVal = (e: any) => {
    setreportDate(e.target.value);
  };

  /* note  */
  const noteVal = (e: any) => {
    if (e.target.value == "") {
      setnoteErrMsg("invalid data");
    } else {
      setnote(e.target.value);
      setnoteErrMsg("");
    }
  };
  /* File */
  const fileVal = (e: any) => {
    setfile(e.target.files[0]);
    setimage(false);
  };
  /* submit  */
  const formData = new FormData();
  const submitVal = async () => {
    formData.append("images", file);
    formData.append("date", reportDate);
    formData.append("babyFirst", babyFirst);
    formData.append("note", note);
    if (!Update) {
      await axios({
        method: "post",
        url: `${AddNewCategory}/addFirst/${user.baby[0].id}`,
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
            // navigator("/tracking");
          }, 3000);
        })
        .catch((err) => {
          if (err.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    } else {
      await axios({
        method: "PATCH",
        url: `${AddNewCategory}/updateFirst/${firstId}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },

        data: formData,
      })
        .then((res) => {
          setSuccessMessageVisible("successful added "); // Show success message
          // Redirect to main page after 3 seconds
          setTimeout(() => {
            // navigator("/tracking");
          }, 3000);
        })
        .catch((err) => {
          if (err.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  };

  let imageprev = image ? (
    <img src={file} width={"100px"} height={"100px"} alt="img" />
  ) : (
    ""
  );

  return (
    <div className="add-first">
      <div className="container">
        <div className="signup-block">
          <h2>{Update ? "Edit" : "Add"} First</h2>{" "}
          <div className="input__field">
            <label htmlFor="Date"> Date</label>
            <input
              onChange={(e) => {
                reportDateVal(e);
              }}
              type="date"
              className="the__input "
              name="reportDate"
              id="Date"
              min="2018-12-31"
              max={dateFormat}
              value={reportDate}
              required
            />
          </div>
          {/* Baby first */}
          <div className="input__field">
            <label htmlFor="babyfirst">Baby first</label>
            <input
              onChange={(e) => {
                babyFirstVal(e);
              }}
              type="text"
              className="the__input "
              placeholder="Baby first"
              name=" babyfirst"
              id="babyfirst"
              value={babyFirst}
            />
            <p>{babyFirstErrMsg}</p>
          </div>
          {/* note */}
          <div className="input__field">
            <label htmlFor="babyName">note</label>
            <input
              onChange={(e) => {
                noteVal(e);
              }}
              id="babyName"
              name="noteVal"
              type="email"
              className=" the__input"
              placeholder="note"
              value={note}
              required
            />
            <p>{noteErrMsg}</p>
          </div>
          <div></div>
          {/* file */}
          <div className="input__field">
            {imageprev}
            <label htmlFor="filename">Image</label>
            <input
              onChange={(e) => {
                fileVal(e);
              }}
              id="filename"
              name="file"
              type="file"
              className=" the__input"
              required
            />
            <p>{noteErrMsg}</p>
          </div>
          <div></div>
          {/* Submit */}
          <button
            onClick={() => {
              if (noteErrMsg == "" && babyFirstErrMsg == "") {
                setSubmiterrMsg("");
                submitVal();
              } else {
                setSubmiterrMsg("check data");
              }
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text">Save</span>
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
            <span className="button__text"> Cancel</span>
          </button>
        </div>
        <div className="msg">
          <p>{successMessageVisible}</p>
        </div>
      </div>
    </div>
  );
};
export default AddFirist;
