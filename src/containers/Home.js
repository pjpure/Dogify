import React, { Component } from "react";
import { Form, Field, reduxForm } from "redux-form";
import DropZoneField from "../components/dropzoneField";
import Predict from "../components/Predict";
import { Button, Row, Col, ProgressBar } from "react-bootstrap";
import axios from "axios";
import "./Home.css";
import { IoArrowBack } from "react-icons/io5";
import Info from "../components/Info";

class UploadImageForm extends Component {
  state = {
    imageFile: [],
    result: "",
    selected: "",
    isLoading: false,
    now: 0,
    timeOutLoad: 0,
    predictions: [],
  };
  handleFormSubmit = (formProps) => {
    this.setState({ isLoading: true });
    let timeOutLoad = setInterval(() => {
      this.setState({ now: this.state.now + 5 });
      if (this.state.now >= 95) {
        clearInterval(this.state.timeOutLoad);
        if (this.state.result !== "") {
          this.setState({ isLoading: false });
        }
      }
    }, 150);
    this.setState({ timeOutLoad: timeOutLoad });
    const data = new FormData();
    data.append("file", this.state.imageFile[0]["file"]);
    data.append("filename", this.state.imageFile[0]["fname"]);
    axios
      .post("https://dogify-backend.herokuapp.com/predict", data)
      .then((response) => {
        this.setState({ result: response.data.result });
        this.setState({ predictions: response.data.predictions });
        if (this.state.now >= 95 && this.state.result !== "") {
          clearInterval(this.state.timeOutLoad);
          this.setState({ isLoading: false });
        }
      });
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

  selectOnClick = (event) => {
    this.setState({ selected: event.target.name });
  };

  resetForm = () =>
    this.setState(
      {
        imageFile: [],
        result: "",
        selected: "",
        isLoading: false,
        now: 0,
        timeOutLoad: 0,
      },
      () => this.props.reset()
    );

  render = () => (
    <div>
      {this.state.isLoading ? (
        <div className="setBackground" style={{ paddingBottom: "100px" }}>
          <div
            style={{
              textAlign: "center",
              fontSize: "30px",
              width: "23vw",
              minWidth: "230px",
            }}
          >
            <img
              src="dog_swim.gif"
              alt="dog"
              style={{ width: "150px", height: "150px" }}
            />
            <h3 style={{ marginBottom: "20px" }}>{"Dogifying..."}</h3>
            <ProgressBar
              style={{
                height: "50px",
                backgroundColor: "#ffffff",
                borderRadius: "25px",
                border: "7px solid #ffffff",
              }}
              now={this.state.now}
            />
          </div>
        </div>
      ) : (
        <div className="setBackground">
          {this.state.result === "" ? (
            <div className="dropField">
              <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                <Field
                  name="imageToUpload"
                  component={DropZoneField}
                  type="file"
                  imagefile={this.state.imageFile}
                  handleOnDrop={this.handleOnDrop}
                />
                {this.state.imageFile && this.state.imageFile.length > 0 ? (
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={this.props.submitting}
                  >
                    Let's Dogify
                  </Button>
                ) : null}
              </Form>
            </div>
          ) : (
            <div className="resultPage">
              <Row>
                <Col
                  md={12}
                  lg={6}
                  className="d-flex justify-content-center align-items-center"
                >
                  <div className="comleft">
                    <Field
                      name="imageToUpload"
                      component={DropZoneField}
                      type="file"
                      imagefile={this.state.imageFile}
                      handleOnDrop={this.handleOnDrop}
                    />
                  </div>
                </Col>
                <Col md={12} lg={6}>
                  <div className="comright">
                    <h1>I am</h1>
                    <div className="result">{this.state.result}</div>
                    <Predict
                      predict={this.state.predictions}
                      result={this.state.result}
                    />
                    <div style={{ textAlign: "right" }}>
                      <Button
                        variant="secondary"
                        disabled={this.props.pristine || this.props.submitting}
                        onClick={this.resetForm}
                      >
                        <div style={{ display: "inline" }}>
                          <IoArrowBack
                            style={{ fontWeight: "600", color: "#ff8c5a" }}
                          />
                        </div>

                        <div style={{ display: "inline" }}>&nbsp;Back</div>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="info mt-3">
                  <Info result={this.state.result} />
                </div>
              </Row>
            </div>
          )}
        </div>
      )}
      <div className="clear" />
    </div>
  );
}

export default reduxForm({ form: "UploadImageForm" })(UploadImageForm);
