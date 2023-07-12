import "./styles.css";
import doc from "./../../../assets/images/baby-moon.png";

function MedicalHistory() {
  return (
    <>
      <div className="medicals">
        <div className="conainer">
          <div className="last-view">
            <h1>Last Visits</h1>
            <div className="visit">
              <div className="nameAndAge">
                <p className="drname">Dr. Name: Ahmed ali</p>
                <p className="age">Age: 6 months</p>
              </div>
              <div className="diagAndDate">
                <p className="diagnosis">Diagnosis: Flu</p>
                <p className="date">Date: 31/12/2023</p>
              </div>
            </div>
          </div>
          <div className="decuments">
            <h1>Documents</h1>
            <div className="document">
              <img src={doc} alt="docs" />
              <div className="docInfo">
                <p className="docName">Blood picture Analyses</p>
                <div className="dateAndSize">
                  <span className="date">23 May </span>
                  <span className="size">42.65 KB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MedicalHistory;
