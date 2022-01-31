import React, { useEffect, useState } from "react";
import * as LandingImage from "../../assets/images/landing-image.jpg";
//import Typography from "@mui/material/Typography";

const Landing = () => {
  return (
    <main style={{ backgroundImage: `url(${LandingImage})` }}>
      
      <img src={LandingImage} />
    </main>
  );
};

export default Landing;
