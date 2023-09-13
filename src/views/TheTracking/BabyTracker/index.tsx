import trackingbaby from "./../../../trackingbaby.json";
import "./styles.css";
import { useContext, useEffect, useState } from "react";

const BabyTrack = () => {
  const [currobj, setcurrobj] = useState<any>(trackingbaby[0]["0-1 months"]);
  const [currmonth, setcurrmonth] = useState("0");
  const [returnedcomp, setreturnedcomp] = useState<any>();
  //   console.log(currobj.important_info.sleep_patterns);
  console.log();

  useEffect(() => {
    switch (currmonth) {
      case "0":
        setreturnedcomp(
          <div className="Track">
            <h1>Your baby is in his First Month</h1>
            <div className="meals">
              <h3>Meals </h3>
              {currobj.meals.map((meal: any) => {
                return <p key={meal}>{meal}</p>;
              })}
            </div>
            <div className="important-info">
              <div className="sleep-patters">
                <h3>sleeping discription:</h3>
                <p className="description">
                  {" " + currobj.important_info.sleep_patterns.description}
                </p>
                <div className="tips">
                  <h3>Tips For better Sleep:</h3>
                  {currobj.important_info.sleep_patterns.tips.map(
                    (tip: string) => {
                      return (
                        <p key={tip} className="tip">
                          {tip}
                        </p>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="baby_crying">
                <div className="reasons">
                  <h3> Reasons of crying</h3>
                  <p>
                    {currobj.important_info.baby_crying.reasons.needing_food}
                  </p>
                  <p>
                    {
                      currobj.important_info.baby_crying.reasons
                        .boredom_or_loneliness
                    }
                  </p>
                </div>
                <div className="soothing-techniques">
                  <h3>to sooth your baby</h3>
                  {currobj.important_info.baby_crying.soothing_techniques.map(
                    (sooth: string) => {
                      return <p key={sooth}>{sooth}</p>;
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */
      case "1":
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "2":
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "3":
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "4":
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "5":
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "6":
        setcurrobj(trackingbaby[+currmonth]["6-7 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "7":
        setcurrobj(trackingbaby[+currmonth]["7-8 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "8":
        setcurrobj(trackingbaby[+currmonth]["8-9 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "9":
        setcurrobj(trackingbaby[+currmonth]["9-10 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "10":
        setcurrobj(trackingbaby[+currmonth]["10-11 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "11":
        setcurrobj(trackingbaby[+currmonth]["11-12 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "12":
        setcurrobj(trackingbaby[+currmonth]["12-13 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "13":
        setcurrobj(trackingbaby[+currmonth]["13-14 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "14":
        setcurrobj(trackingbaby[+currmonth]["14-15 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "15":
        setcurrobj(trackingbaby[+currmonth]["15-16 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "16":
        setcurrobj(trackingbaby[+currmonth]["16-17 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "17":
        setcurrobj(trackingbaby[+currmonth]["17-18 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "18":
        setcurrobj(trackingbaby[+currmonth]["18-19 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "19":
        setcurrobj(trackingbaby[+currmonth]["19-20 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "20":
        setcurrobj(trackingbaby[+currmonth]["20-21 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "21":
        setcurrobj(trackingbaby[+currmonth]["21-22 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "22":
        setcurrobj(trackingbaby[+currmonth]["22-23 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      case "23":
        setcurrobj(trackingbaby[+currmonth]["23-24 months"]);
        setreturnedcomp(<h1>Mohammed</h1>);
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */

      default:
        break;
      // /*/*/*/*/*/*/*/*//******************************************************* */
    }
  }, [currmonth]);
  return (
    <div className="BabyTrack">
      <button
        onClick={() => {
          setcurrmonth("0");
          setcurrobj(trackingbaby[0]["0-1 months"]);
        }}
      >
        0
      </button>
      <button
        onClick={() => {
          setcurrmonth("1");
          setcurrobj(trackingbaby[1]["1-2 months"]);
        }}
      >
        1
      </button>
      <button
        onClick={() => {
          setcurrmonth("2");
          setcurrobj(trackingbaby[2]["2-3 months"]);
        }}
      >
        2
      </button>
      <button
        onClick={() => {
          setcurrmonth("3");
          setcurrobj(trackingbaby[3]["3-4 months"]);
        }}
      >
        3
      </button>
      <button
        onClick={() => {
          setcurrmonth("4");
          setcurrobj(trackingbaby[4]["4-5 months"]);
        }}
      >
        4
      </button>
      <button
        onClick={() => {
          setcurrmonth("5");
          setcurrobj(trackingbaby[5]["5-6 months"]);
        }}
      >
        5
      </button>

      {returnedcomp}
    </div>
  );
};
export default BabyTrack;
