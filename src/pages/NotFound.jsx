import React from "react";
import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
//   console.error(error);

  return (
    <div id="not-found-page">
      <h1 style={{color: 'red'}}>404 Not Found!</h1>
    </div>
  );
};

export default NotFound;
