import React from "react";
import "./Predict.css";
function Predict({ predict, result }) {
  // console.log(predict);
  const sortPredict = predict.sort((a, b) => b.probability - a.probability);

  return (
    <div
      style={{
        textAlign: "left",
        background: "#ffffff",
        padding: "20px",
        borderRadius: "25px",
        marginTop: "32px",
        boxShadow: "-9px 15px 14px #ffd6c9",
      }}
    >
      <h2 style={{ color: "#ff8c5a", fontWeight: "bold" }}>Results</h2>
      <div>
        <h5
          className={
            sortPredict[0].label === result ? "correctText" : "inCorrectText"
          }
          style={{ float: "left", lineHeight: "40px" }}
        >
          {sortPredict[0].label}
        </h5>
        <h5
          className={
            sortPredict[0].label === result ? "correctNum" : "inCorrectNum"
          }
          style={{ float: "right", lineHeight: "40px" }}
        >
          {sortPredict[0].probability}%
        </h5>
        <div style={{ clear: "both" }}></div>
      </div>
      <div>
        <h5
          className={
            sortPredict[1].label === result ? "correctText" : "inCorrectText"
          }
          style={{ float: "left", lineHeight: "40px" }}
        >
          {sortPredict[1].label}
        </h5>
        <h5
          className={
            sortPredict[1].label === result ? "correctNum" : "inCorrectNum"
          }
          style={{ float: "right", lineHeight: "40px" }}
        >
          {sortPredict[1].probability}%
        </h5>
        <div style={{ clear: "both" }}></div>
      </div>
      <div>
        <h5
          className={
            sortPredict[2].label === result ? "correctText" : "inCorrectText"
          }
          style={{ float: "left", lineHeight: "40px" }}
        >
          {sortPredict[2].label}
        </h5>
        <h5
          className={
            sortPredict[2].label === result ? "correctNum" : "inCorrectNum"
          }
          style={{ float: "right", lineHeight: "40px" }}
        >
          {sortPredict[2].probability}%
        </h5>
        <div style={{ clear: "both" }}></div>
      </div>
    </div>
  );
}

export default Predict;

//predict: {"label":"Labrador Retriever","probability":"0.10"}
