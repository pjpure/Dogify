import React, { Component } from "react";
import { Form, Field, reduxForm } from "redux-form";
import DropZoneField from "../components/dropzoneField";

const imageIsRequired = value => (!value ? "Required" : undefined);

class UploadImageForm extends Component {
  state = { imageFile: [] };

  handleFormSubmit = formProps => {
    const fd = new FormData();
    fd.append("imageFile", formProps.imageToUpload.file);
    // append any additional Redux form fields
    // create an AJAX request here with the created formData

    alert(JSON.stringify(formProps, null, 4));
  };

  handleOnDrop = (newImageFile, onChange) => {
    const imageFile = {
      file: newImageFile[0],
      name: newImageFile[0].name,
      preview: URL.createObjectURL(newImageFile[0]),
      size: newImageFile[0].size
    };

    this.setState({ imageFile: [imageFile] }, () => onChange(imageFile));
  };

  resetForm = () => this.setState({ imageFile: [] }, () => this.props.reset());

  render = () => (
    <div className="app-container">
      <h1 className="title">Upload An Image</h1>
      <hr />
      <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
        <Field
          name="imageToUpload"
          component={DropZoneField}
          type="file"
          imagefile={this.state.imageFile}
          handleOnDrop={this.handleOnDrop}
          validate={[imageIsRequired]}
        />
        <button
          type="submit"
          className="uk-button uk-button-primary uk-button-large submit"
          disabled={this.props.submitting}
        >
          Submit
        </button>
        <button
          type="button"
          className="uk-button uk-button-default uk-button-large clear"
          disabled={this.props.pristine || this.props.submitting}
          onClick={this.resetForm}
          style={{ float: "right" }}
        >
          Clear
        </button>
      </Form>
      <div className="clear" />
    </div>
  );
}

export default reduxForm({ form: "UploadImageForm" })(UploadImageForm);

