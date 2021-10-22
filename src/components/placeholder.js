import React from "react";
import PropTypes from "prop-types";
import { MdCloudUpload } from "react-icons/md";

const Placeholder = ({ getInputProps, getRootProps, error, touched }) => (
  <div
    {...getRootProps()}
    className={`placeholder-preview ${error && touched ? "has-error" : ""}`}
  >
      <p style={{lineHeight:"0px",color:"white"}}> :</p>
    <div className="border_pointer">
      <input {...getInputProps()} />
      {/* <MdCloudUpload style={{ fontSize: 50, paddingTop: 40 }} /> */}
      <p style={{fontSize:"25px", lineHeight: "10pt", marginTop:"70px" }}>Drag & drop your</p>
      <p style={{fontSize:"25px", lineHeight: "5pt" }}>
        <strong style={{ color: "#ff8c5a" }}>Dog Image</strong> to{" "}
        <strong style={{ color: "#ff8c5a" }}>Dogify</strong>
      </p>
      <p style={{fontSize:"25px", lineHeight: "10pt" }}>the dog breed</p>
      <p style={{ lineHeight: "30pt" }}>
        or <u style={{ color: "#ff8c5a" }}>browse_file</u> on your computer
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
