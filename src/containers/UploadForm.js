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
      <Form
        style={{ paddingTop: "200px" }}
        onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
      >
        {this.state.imageFile && this.state.imageFile.length > 0 ? (
          <Row style={{ textAlign: "center" }}>
            <Col xs={12} sm={12} md={12} lg={2}></Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <Field
                name="imageToUpload"
                component={DropZoneField}
                type="file"
                imagefile={this.state.imageFile}
                handleOnDrop={this.handleOnDrop}
              />
              {this.state.result == "" ? (
                <Button
                  variant="primary"
                  type="submit"
                  disabled={this.props.submitting}
                >
                  Let's Dogify
                </Button>
              ) : null}
            </Col>
            {this.state.result == "" ? (
              <Col xs={12} sm={12} md={6} lg={4}>
                <p style={{ fontSize: "50px", fontWeight: "600" }}>
                  Guess who am i ?
                </p>
              </Col>
            ) : (
              <Col xs={12} sm={12} md={6} lg={4}>
                <Row>
                  <p
                    style={{
                      marginTop: "20px",
                      fontSize: "50px",
                      fontWeight: "600",
                    }}
                  >
                    I am
                  </p>
                </Row>
                <Row style={{ marginTop: "50px" }}>
                  <Col xs={2}></Col>
                  <Col className="result" xs={8}>
                    {this.state.result}
                  </Col>
                  <Col xs={2}></Col>
                  <Col xs={2}></Col>
                  <Col xs={8} style={{ textAlign: "right" }}>
                    <Button
                      variant="secondary"
                      disabled={this.props.pristine || this.props.submitting}
                      onClick={this.resetForm}
                    >
                      Back
                    </Button>
                  </Col>
                  <Col xs={2}></Col>
                </Row>
                <Row style={{ marginTop: "50px" }}>
                  <p
                    style={{
                      marginTop: "20px",
                      fontSize: "50px",
                      fontWeight: "600",
                      color: "green",
                    }}
                  >
                    Correct !
                  </p>
                </Row>
              </Col>
            )}

            <Col xs={12} sm={12} md={12} lg={2}></Col>
          </Row>
        ) : (
          <Row>
            <Col xs={12} sm={2} md={3} xl={4}></Col>
            <Col xs={12} sm={8} md={6} xl={4} className="app-container">
              <Field
                name="imageToUpload"
                component={DropZoneField}
                type="file"
                imagefile={this.state.imageFile}
                handleOnDrop={this.handleOnDrop}
              />
            </Col>
            <Col xs={1} sm={2} md={3} xl={4}></Col>
          </Row>
        )}
      </Form>
      <div className="clear" />
    </div>
  );
}

export default reduxForm({ form: "UploadImageForm" })(UploadImageForm);
