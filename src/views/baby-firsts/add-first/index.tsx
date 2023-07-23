import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import AuthContext from "../../../conrext/AuthProvider";
import { AddNewCategory } from "../../../api";

const AddFirist = () => {
  const navigator = useNavigate();

  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);

  let currentDate: Date = new Date();
  let dateFormat = currentDate.toJSON().slice(0, 10);
  const [babyFirst, setbabyFirst] = useState<string>("");
  const [note, setnote] = useState<string>("");
  const [reportDate, setreportDate] = useState<string>(dateFormat);
  const [babyFirstErrMsg, setbabyFirstErrMsg] = useState<string>("");
  const [noteErrMsg, setnoteErrMsg] = useState<string>("");
  const [SubmiterrMsg, setSubmiterrMsg] = useState<string>("");
  const [successMessageVisible, setSuccessMessageVisible] =
    useState<string>("");
  /* validate function */

  var nameVal = new RegExp("^[A-Za-z]*$");

  /* Dr Name  */
  const babyFirstVal = (e: any) => {
    if (!nameVal.test(e.target.value)) {
      setbabyFirstErrMsg("invalid data");
    } else {
      setbabyFirst(e.target.value);
      setbabyFirstErrMsg("");
    }
  };

  /* report Date  */
  const reportDateVal = (e: any) => {
    setreportDate(e.target.value);
  };

  /* note  */
  const noteVal = (e: any) => {
    if (!nameVal.test(e.target.value)) {
      setnoteErrMsg("invalid data");
    } else {
      setnote(e.target.value);
      setnoteErrMsg("");
    }
  };

  /* submit  */

  const submitVal = async () => {
    await axios({
      method: "post",
      url: `${AddNewCategory}/addFirst/${user.baby[0].id}`,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },

      data: {
        date: reportDate,
        babyFirst: babyFirst,
        note: note,
      },
    })
      .then((res) => {
        console.log(res);

        setSuccessMessageVisible("successful added "); // Show success message

        // Redirect to main page after 3 seconds
        setTimeout(() => {
          navigator("/main");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="add-first">
      <div className="container">
        <div className="signup-block">
          {/*Date */}
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
          {/*skip now */}
          <button
            onClick={() => {
              navigator("/main");
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text"> skip now</span>
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
