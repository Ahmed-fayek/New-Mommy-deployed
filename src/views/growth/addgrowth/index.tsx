import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import AuthContext from "../../../conrext/AuthProvider";

const AddGrowth = () => {
  const navigator = useNavigate();

  const { auth } = useContext<any>(AuthContext);
  const { user } = useContext<any>(AuthContext);

  let currentDate: Date = new Date();
  let dateFormat = currentDate.toJSON().slice(0, 10);
  const [weight, setweight] = useState<number>();
  const [height, setheight] = useState<number>();
  const [reportDate, setreportDate] = useState<string>(dateFormat);
  const [weightErrMsg, setweightErrMsg] = useState<string>("");
  const [heightErrMsg, setheightErrMsg] = useState<string>("");
  const [SubmiterrMsg, setSubmiterrMsg] = useState<string>("");
  const [successMessageVisible, setSuccessMessageVisible] =
    useState<string>("");
  /* validate function */

  var nameVal = new RegExp("^[A-Za-z]*$");

  /* Weight  */
  const WeightVal = (e: any) => {
    if (!nameVal.test(e.target.value)) {
      setweightErrMsg("invalid data");
    } else {
      setweight(+e.target.value);
      setweightErrMsg("");
    }
  };

  /* report Date  */
  const reportDateVal = (e: any) => {
    setreportDate(e.target.value);
  };

  /* height  */
  const heightVal = (e: any) => {
    if (!nameVal.test(e.target.value)) {
      setheightErrMsg("invalid data");
    } else {
      setheight(+e.target.value);
      setheightErrMsg("");
    }
  };

  /* submit  */

  const submitVal = async () => {
    await axios({
      method: "post",
      url: `https://13.51.206.195:3002/api/users/addActivity/${user.id}`,
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },

      data: {},
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
    <div className="add-growth">
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

          {/* weight */}
          <div className="input__field">
            <label htmlFor="weight">weight</label>
            <input
              onChange={(e) => {
                WeightVal(e);
              }}
              type="number"
              className="the__input "
              placeholder="Weight"
              name=" weight"
              id="weight"
            />
            <p>{weightErrMsg}</p>
          </div>
          {/* height */}
          <div className="input__field">
            <label htmlFor="height">height</label>
            <input
              onChange={(e) => {
                heightVal(e);
              }}
              id="height"
              name="height"
              type="number"
              className=" the__input"
              placeholder="height"
              required
            />
            <p>{heightErrMsg}</p>
          </div>
          <div></div>
          {/* Submit */}
          <button
            onClick={() => {
              if (heightErrMsg == "" && weightErrMsg == "") {
                setSubmiterrMsg("");
                submitVal();
              } else {
                setSubmiterrMsg("check data");
              }
            }}
            className="button addbaby__submit"
            type="submit"
          >
            <span className="button__text"> Save</span>
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
export default AddGrowth;
