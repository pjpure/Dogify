import React from "react";
import PropTypes from "prop-types";

const Placeholder = ({ getInputProps, getRootProps, error, touched }) => (
  <div
    {...getRootProps()}
    className={`placeholder-preview ${error && touched ? "has-error" : ""}`}
  >
    <div className="border_pointer">
      <input {...getInputProps()} />
      <div>
        <h3 style={{ lineHeight: "20pt" }}>Drag & drop your</h3>
        <h3 style={{ lineHeight: "20pt" }}>
          <strong style={{ color: "#ff8c5a" }}>Dog image</strong> to{" "}
          <strong style={{ color: "#ff8c5a" }}>Dogify</strong>
        </h3>
        <h3 style={{ lineHeight: "20pt" }}>the dog breed</h3>
        <p style={{ marginTop: "20%" }}>
          or{" "}
          <u style={{ color: "#ff8c5a" }}>
            <strong>browse file</strong>
          </u>{" "}
          on your computer
        </p>
      </div>
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
