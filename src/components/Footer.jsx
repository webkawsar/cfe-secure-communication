import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Developed by "}
      <Link color="inherit" href="https://facebook.com/webkawsar">
        Kawsar Ahmed
      </Link>
      {"@"}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
