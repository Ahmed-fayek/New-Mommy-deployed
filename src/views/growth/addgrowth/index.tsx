import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import AuthContext from "../../../context/AuthProvider";
import { AddNewCategory } from "../../../api";

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

  /* Update value tells me if this is adding or update */
  const { growthId } = useParams();
  const [Update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (growthId) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  }, [growthId]);

  useEffect(() => {
    if (Update) {
      if (user) {
        axios({
          method: "GET",
          url: `${AddNewCategory}/growthMilestoneById/${user.baby[0].id}/${growthId}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            console.log(response);
            setweight(response.data.growthMilestone.weight);
            setheight(response.data.growthMilestone.height);
            setreportDate(response.data.growthMilestone.date);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [Update, user]);
  var nameVal = new RegExp("^[A-Za-z]*$");

  /* Weight  */
  const WeightVal = (e: any) => {
    setweight(+e.target.value);
  };

  /* report Date  */
  const reportDateVal = (e: any) => {
    setreportDate(e.target.value);
  };

  /* height  */
  const heightVal = (e: any) => {
    setheight(+e.target.value);
  };

  /* submit  */

  const submitVal = async () => {
    if (!Update) {
      await axios({
        method: "post",
        url: `${AddNewCategory}/addGrowthMilestone/${user.baby[0].id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },

        data: {
          date: reportDate,
          height: `${height}`,
          weight: `${weight}`,
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
    } else {
      await axios({
        method: "PATCH",
        url: `${AddNewCategory}/updateGrowthMilestone/${growthId}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },

        data: {
          date: reportDate,
          height: `${height}`,
          weight: `${weight}`,
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
    }
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
              value={weight}
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
              value={height}
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
