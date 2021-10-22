import React from "react";
import PropTypes from "prop-types";
import DropZone from "react-dropzone";
import ImagePreview from "./imagePreview";
import Placeholder from "./placeholder";
import ShowError from "./showError";

const DropZoneField = ({
  handleOnDrop,
  input: { onChange },
  imagefile,
  meta: { error, touched },
}) => (
  <div className="preview-container">
    <DropZone
      accept="image/jpeg, image/png"
      className="upload-container"
      onDrop={(file) => handleOnDrop(file, onChange)}
      multiple={false}
    >
      {(props) =>
        imagefile && imagefile.length > 0 ? (
          <ImagePreview
            imagefile={imagefile}
            {...props}
            error={error}
            touched={touched}
          />
        ) : (
          <Placeholder {...props} error={error} touched={touched} />
        )
      }
    </DropZone>
    <ShowError error={error} touched={touched} />
  </div>
);

DropZoneField.propTypes = {
  error: PropTypes.string,
  handleOnDrop: PropTypes.func.isRequired,
  imagefile: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.file,
      name: PropTypes.string,
      preview: PropTypes.string,
      size: PropTypes.number,
    })
  ),
  onChange: PropTypes.func,
  touched: PropTypes.bool,
};

export default DropZoneField;
