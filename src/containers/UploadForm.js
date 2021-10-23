import React, { Component, useState } from "react";
import { Form, Field, reduxForm } from "redux-form";
import DropZoneField from "../components/dropzoneField";
import { Button, Row, Col } from "react-bootstrap";

class UploadImageForm extends Component {
  state = { imageFile: [], result: "" };
  handleFormSubmit = (formProps) => {
    const fd = new FormData();
    console.log(fd);
    this.setState({ result: "Golden Retriever" });
    console.log(this.state.result);
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

  resetForm = () =>
    this.setState({ imageFile: [], result: "" }, () => this.props.reset());

  render = () => (
    <div className="setBackground">
      <div className="app-container">
        <Form
          style={{ paddingTop: "200px" }}
          onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
        >
          {/* <Row>
          <Col xs={6} className="app-container">
            <Field
              name="imageToUpload"
              component={DropZoneField}
              type="file"
              imagefile={this.state.imageFile}
              handleOnDrop={this.handleOnDrop}
            />
          </Col>
          <Col xs={6}></Col>
        </Row> */}
          <Field
            name="imageToUpload"
            component={DropZoneField}
            type="file"
            imagefile={this.state.imageFile}
            handleOnDrop={this.handleOnDrop}
          />

          {this.state.imageFile &&
          this.state.imageFile.length > 0 &&
          this.state.result == "" ? (
            <Row style={{ textAlign: "center" }}>
              <Col xs={12}>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={this.props.submitting}
                >
                  Let's Dogify
                </Button>
              </Col>
            </Row>
          ) : null}
          {this.state.result != "" ? (
            <Row style={{ textAlign: "center" }}>
              <Col xs={3}></Col>
              <Col className="result" xs={6}>
                {this.state.result}
              </Col>
              <Col xs={3}></Col>
              <Col xs={12}></Col>

              <Col xs={12}>
                <Button
                  variant="secondary"
                  disabled={this.props.pristine || this.props.submitting}
                  onClick={this.resetForm}
                >
                  Back
                </Button>
              </Col>
            </Row>
          ) : null}
        </Form>
        <div className="clear" />
      </div>
    </div>
  );
}

export default reduxForm({ form: "UploadImageForm" })(UploadImageForm);
