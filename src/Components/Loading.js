import React from "react";
import BarLoader from "react-spinners/SyncLoader";
import "../stylesheet/Loading.css"
const Loading = () => {
  return (
    <div className="App d-flex flex-column">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <BarLoader color="#0077FE" />
      </div>
    </div>
  );
};
export default Loading;
