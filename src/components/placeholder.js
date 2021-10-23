import React from "react";
import PropTypes from "prop-types";

const Placeholder = ({ getInputProps, getRootProps, error, touched }) => (
  <div
    {...getRootProps()}
    className={`placeholder-preview ${error && touched ? "has-error" : ""}`}
  >
    <p style={{ lineHeight: "0px", color: "white" }}> :</p>
    <div className="border_pointer">
      <input {...getInputProps()} />
      {/* <MdCloudUpload style={{ fontSize: 50, paddingTop: 40 }} /> */}
      <p style={{ fontSize: "30px", lineHeight: "10pt", marginTop: "100px" }}>
        Drag & drop your
      </p>
      <p style={{ fontSize: "30px", lineHeight: "15pt" }}>
        <strong style={{ color: "#ff8c5a" }}>Dog image</strong> to{" "}
        <strong style={{ color: "#ff8c5a" }}>Dogify</strong>
      </p>
      <p style={{ fontSize: "30px", lineHeight: "15pt" }}>the dog breed</p>
      <p style={{ fontSize: "18px", lineHeight: "30pt" }}>
        or{" "}
        <u style={{ color: "#ff8c5a" }}>
          <strong>browse file</strong>
        </u>{" "}
        on your computer
      </p>
    </div>
  </div>
);

Placeholder.propTypes = {
  error: PropTypes.string,
  getInputProps: PropTypes.func.isRequired,
  getRootProps: PropTypes.func.isRequired,
  touched: PropTypes.bool,
};

export default Placeholder;
