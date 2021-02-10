import React from "react";
import err from "../imgs/error.svg";

function Error() {
  return (
    <>
      <img className="errImg m-auto" src={err} alt="Not Found" />
    </>
  );
}

export default Error;
