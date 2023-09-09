import docddd from "./../../../../assets/images/baby-moon.png";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./styles.css";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../../../context/AuthProvider";
import Loading from "../../../../components/Loading";
function MedicalHistory() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [medicals, setmedicals] = useState([]);
  const [update, setupdate] = useState(false);
  const [docs, setdocs] = useState([]);
  /* Get All Items */
  useEffect(() => {
    if (user) {
      const config = {
        method: "get",
        url: `https://newMommy.mooo.com:3002/api/users/allDocuments/${user.baby[0].id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      };
      axios(config)
        .then((response) => {
          // //console.log(response.data.allDocuments);

          setdocs(response.data.allDocuments);
        })
        .catch((error) => {
          // //console.log(error);
        });
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      const config = {
        method: "get",
        url: `https://newMommy.mooo.com:3002/api/users/medicalHistory/${user.baby[0].id}`,
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      };
      axios(config)
        .then((response) => {
          // //console.log(response.data.medicalHistory);

          setmedicals(response.data.medicalHistory);
        })
        .catch((error) => {
          // //console.log(error);
        });
    }
  }, [user, update]);
  /* Handle Delete Item */
  const handleDelete = async (itemid: string) => {
    await Swal.fire({
      title: `Are you sure you want to delete ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "delete",
          url: `https:newMommy.mooo.com:3002/api/users/medicalRecord/${itemid}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
          .then((response) => {
            // //console.log(response.data);
            setupdate(!update);
          })
          .catch((error) => {
            // //console.log(error);
          });
        Swal.fire("Deleted!", ` has been deleted.`, "success");
      }
    });
  };
  let medicalsreturned: any;
  let docsreturned: any;
  if (user) {
    medicalsreturned = medicals.map((medical: any) => {
      // //console.log(medical);
      return (
        <div key={medical.id} className="visit">
          <div className="nameAndAge">
            <p className="drname">Dr / {medical.doctorName}</p>
            <p className="age">Age: {medical.age.slice(0, 18)}</p>
          </div>
          <div className="diagAndDate">
            <p className="diagnosis">Diagnosis: {medical.diagnosis}</p>
            <p className="date">Date: {medical.date}</p>
            <Link to={`/addMedical/${medical.id}`}>Update</Link>
            <button
              onClick={() => {
                handleDelete(medical.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
    docsreturned = docs.map((doc: any) => {
      // //console.log(doc);
      return (
        <div key={doc.id} className="document">
          <img src={doc.document} alt="docs" />
          <div className="docInfo">
            <p className="docName">Blood picture Analyses</p>
            <div className="dateAndSize">
              <span className="date">23 May </span>
              <span className="size">42.65 KB</span>
            </div>
          </div>
        </div>
      );
    });
  } else {
    medicalsreturned = <Loading />;
  }

  return (
    <div>
      <>
        <div className="medicals">
          <div className="conainer">
            <div className="last-view">
              <h1>Last Visits</h1>
              <Link to={"/addMedical"}>addMedical</Link> <br></br>
              {medicalsreturned}
            </div>
            <div className="decuments">
              <h1>Documents</h1>
              <Link to={"/addMedicalDocs"}>addMedicalDocs</Link> <br></br>
              {docsreturned}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default MedicalHistory;
