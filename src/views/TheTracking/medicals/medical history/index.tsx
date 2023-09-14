import docddd from "./../../../../assets/images/baby-moon.png";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./styles.css";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../../../context/AuthProvider";
import Loading from "../../../../components/Loading";
import { AddNewCategory } from "../../../../api";
import BabyAge from "../../../../services/babyAge";
function MedicalHistory() {
  const { user } = useContext<any>(AuthContext);
  const { auth } = useContext<any>(AuthContext);
  const [medicals, setmedicals] = useState([]);
  const [update, setupdate] = useState(false);
  const { setRefresh } = useContext<any>(AuthContext);
  const { Refresh } = useContext<any>(AuthContext);
  const [docs, setdocs] = useState([]);
  /* Get All Items */
  useEffect(() => {
    if (user) {
      const config = {
        method: "get",
        url: `${AddNewCategory}/allDocuments/${user.baby[0].id}`,
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
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
        });
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      const config = {
        method: "get",
        url: `${AddNewCategory}/medicalHistory/${user.baby[0].id}`,
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
          if (error.response.status == "401") {
            setRefresh(!Refresh);
          }
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
          url: `${AddNewCategory}/medicalRecord/${itemid}`,
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
          .then((response) => {
            // //console.log(response.data);
            setupdate(!update);
          })
          .catch((error) => {
            if (error.response.status == "401") {
              setRefresh(!Refresh);
            }
          });
        Swal.fire("Deleted!", ` has been deleted.`, "success");
      }
    });
  };
  let medicalsreturned: any;
  let docsreturned: any;
  if (user) {
    medicalsreturned = medicals.map((medical: any) => {
      console.log(medical);
      return (
        <div key={medical.id} className="medical">
          <span className="edit-medical">
            <Link to={`/addmedical/${medical.id}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </span>
          <div>
            Date: <span> {medical.date}</span>
          </div>
          <div>
            Age: <span>{BabyAge(`${medical.date}`).slice(0, 17)}</span>
          </div>
          <div>
            doctorName: <span> {medical.doctorName}</span>
          </div>
          <div>
            diagnosis: <span> {medical.diagnosis}</span>
          </div>
          <section className="delete-growh-btn">
            <button
              onClick={() => {
                handleDelete(medical.id);
              }}
            >
              Delete medical
            </button>
          </section>
        </div>
      );
    });
    docsreturned = docs.map((doc: any) => {
      // console.log(doc);
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
            <div className="medicals">
              <h1> Last Visits</h1>
              <Link to={"/addMedical"} className="addmedicalbtn">
                Add new Medical
              </Link>
              <div className="all-medicals">{medicalsreturned}</div>
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
