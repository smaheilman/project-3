import React, { useEffect, useState } from "react";
import * as LandingImage from "../../assets/images/landing-image.jpg";
import JobListings from "../JobListings";
//import Typography from "@mui/material/Typography";

const Landing = () => {
  return (
    <main style={{ backgroundImage: `url(${LandingImage})` }}>
      <JobListings/>
      <img src={LandingImage} />
    </main>
  );
};

export default Landing;
