import React, { Component } from "react";
import { Form, Field, reduxForm } from "redux-form";
import DropZoneField from "../components/dropzoneField";
import { Button, Row, Col } from "react-bootstrap";
const imageIsRequired = (value) => (!value ? "Required" : undefined);

class UploadImageForm extends Component {
  state = { imageFile: [] };

  handleFormSubmit = (formProps) => {
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
      size: newImageFile[0].size,
    };

    this.setState({ imageFile: [imageFile] }, () => onChange(imageFile));
  };

  resetForm = () => this.setState({ imageFile: [] }, () => this.props.reset());

  render = () => (
    <div className="setBackground">
      <div className="app-container">
        {/* <h1 className="title">Dogify</h1> */}
        <Form
          style={{ paddingTop: "200px" }}
          onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
        >
          <Field
            name="imageToUpload"
            component={DropZoneField}
            type="file"
            imagefile={this.state.imageFile}
            handleOnDrop={this.handleOnDrop}
            validate={[imageIsRequired]}
          />
          <Row style={{ textAlign: "center" }}>
            <Col>
              <Button
                className="custom-btn"
                type="submit"
                disabled={this.props.submitting}
              >
                Let's Dogify
              </Button>
            </Col>
            {/* <Col>
              <Button
                disabled={this.props.pristine || this.props.submitting}
                onClick={this.resetForm}
                style={{ float: "left" }}
              >
                Clear
              </Button>
            </Col> */}
          </Row>
        </Form>
        <div className="clear" />
      </div>
    </div>
  );
}

export default reduxForm({ form: "UploadImageForm" })(UploadImageForm);
