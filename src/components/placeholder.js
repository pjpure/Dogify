import React from "react";
import PropTypes from "prop-types";

const Placeholder = ({ getInputProps, getRootProps, error, touched }) => (
  <div
    {...getRootProps()}
    className={`placeholder-preview ${error && touched ? "has-error" : ""}`}
  >
    <div className="border_pointer">
      <input {...getInputProps()} />
      {/* <MdCloudUpload style={{ fontSize: 50, paddingTop: 40 }} /> */}
      <h3 style={{ lineHeight: "10pt", marginTop: "15%" }}>Drag & drop your</h3>
      <h3 style={{ lineHeight: "25pt" }}>
        <strong style={{ color: "#ff8c5a" }}>Dog image</strong> to{" "}
        <strong style={{ color: "#ff8c5a" }}>Dogify</strong>
      </h3>
      <h3 style={{ lineHeight: "15pt" }}>the dog breed</h3>
      <p style={{ marginTop: "5vh" }}>
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
