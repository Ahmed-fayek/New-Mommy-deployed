import { IframeHTMLAttributes, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Learning = () => {
  const Navigate = useNavigate();
  let returnedcomp = [];
  const data = {
    name: [
      "Baby talk",
      "Growth baby",
      "2 Month Old Baby",
      "Baby Hates",
      "Baby Monthly Milestones",
      "Activities for Babies 3-6 Months",
      "Essentials We Use Every Day!",
      "Food Ideas 6 Months",
      "BABY FOOD MEAL",
    ],
    video: [
      "https://www.youtube.com/embed/P89gIMp9E90",
      "https://www.youtube.com/embed/hNZs8D5Eo34",
      "https://www.youtube.com/embed/_0cErYu3A8Q",
      "https://www.youtube.com/embed/377j05F4edY",
      "https://www.youtube.com/embed/DTIz2D0K_EE",
      "https://www.youtube.com/embed/Y_8nlwkioLw",
      "https://www.youtube.com/embed/sW7eORkf9ZI",
      "https://www.youtube.com/embed/MvxU0870z8Q",
      "https://www.youtube.com/embed/9HieGFk57cA",
    ],
    images: [
      "https://images.unsplash.com/photo-1554684765-8f7175aeaf81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80",
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
      "https://images.unsplash.com/photo-1589758443446-ff61c5fd21b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      "https://plus.unsplash.com/premium_photo-1676158155946-509445b82989?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      "https://images.unsplash.com/photo-1509676468933-c98e51205cef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1504484656217-38f8ffc617f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1561567131-f7d83083aee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      "https://images.unsplash.com/photo-1548289227-b7d966b70003?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      "https://images.unsplash.com/photo-1544829832-c8047d6b9d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
  };
  for (let i = 0; i < 9; i++) {
    returnedcomp.push(
      <div key={i} className="learning">
        {/* <a href={data.video[i]}>
          <img src={data.images[i]} alt="learning" />
        </a> */}
        <div className="group-data">
          <div className="group-info">
            <h3>{data.name[i]}</h3>
          </div>
        </div>
        <iframe src={data.video[i]} allowFullScreen />
      </div>
    );
  }

  return (
    <>
      <h1>Learning</h1>
      <div className="learnings">
        {returnedcomp.map((ele) => {
          return ele;
        })}
        <div>
          <iframe
            src={`https://www.youtube.com/embed/P89gIMp9E90`}
            frameBorder="0"
            allowFullScreen
          />
        </div>{" "}
      </div>
    </>
  );
};
export default Learning;
