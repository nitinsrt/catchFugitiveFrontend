import React from "react";
import "../component-css/Results.css";

const Results = (props) => {
  return (
    <div className="resultContainer">
      <img src="criminal.png" style={{width: "25vw", height: "25vh"}} />
      <ul>
        {props.captureResults.map((result, index) => (
          <div className="resultLine">
            <li key={index} className="line">
              {result.copName + " " + result.result}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Results;
