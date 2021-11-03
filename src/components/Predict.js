import React from "react";
import "./Predict.css";
function Predict({ predict, result }) {
  return (
    <div
      style={{
        textAlign: "left",
        background: "#ffffff",
        padding: "20px",
        borderRadius: "25px",
        marginTop: "32px",
      }}
    >
      <h2 style={{ color: "#ff8c5a" }}>Results</h2>
      <div>
        <h5
          className={
            predict[0].label === result ? "correctText" : "inCorrectText"
          }
          style={{ float: "left", lineHeight: "40px" }}
        >
          {predict[0].label}
        </h5>
        <h5
          className={
            predict[0].label === result ? "correctNum" : "inCorrectNum"
          }
          style={{ float: "right", lineHeight: "40px" }}
        >
          {predict[0].probability * 100}%
        </h5>
        <div style={{ clear: "both" }}></div>
      </div>
      <div>
        <h5
          className={
            predict[1].label === result ? "correctText" : "inCorrectText"
          }
          style={{ float: "left", lineHeight: "40px" }}
        >
          {predict[1].label}
        </h5>
        <h5
          className={
            predict[1].label === result ? "correctNum" : "inCorrectNum"
          }
          style={{ float: "right", lineHeight: "40px" }}
        >
          {predict[1].probability * 100}%
        </h5>
        <div style={{ clear: "both" }}></div>
      </div>
      <div>
        <h5
          className={
            predict[2].label === result ? "correctText" : "inCorrectText"
          }
          style={{ float: "left", lineHeight: "40px" }}
        >
          {predict[2].label}
        </h5>
        <h5
          className={
            predict[2].label === result ? "correctNum" : "inCorrectNum"
          }
          style={{ float: "right", lineHeight: "40px" }}
        >
          {predict[2].probability * 100}%
        </h5>
        <div style={{ clear: "both" }}></div>
      </div>
    </div>
  );
}

export default Predict;

//predict: {"label":"Labrador Retriever","probability":"0.10"}
