import React, { Component } from "react";
import { Form, Field, reduxForm } from "redux-form";
import DropZoneField from "../components/dropzoneField";
import { Button, Row, Col, ProgressBar } from "react-bootstrap";
import axios from "axios";
class UploadImageForm extends Component {
  state = {
    imageFile: [],
    result: "",
    selected: "",
    isLoading: false,
    now: 0,
    timeOutLoad: 0,
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
        console.log(response.data.result);
        this.setState({ result: response.data.result });
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
    <div className="setBackground">
      {this.state.isLoading ? (
        <div>
          <Row>
            <Col xs={3} xl={4}></Col>
            <Col
              xs={6}
              xl={4}
              style={{
                marginTop: "25vh",
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              <img
                src="dog_swim.gif"
                alt="dog"
                style={{ width: "150px", height: "150px" }}
              />
              <p style={{ marginBottom: "20px" }}>{"Dogifying..."}</p>
              <ProgressBar
                style={{
                  height: "45px",
                  backgroundColor: "#ffffff",
                  borderRadius: "25px",
                  border: "7px solid #ffffff",
                }}
                now={this.state.now}
              />
            </Col>
            <Col xs={3} xl={4}></Col>
          </Row>
        </div>
      ) : (
        <Form
          onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
          style={{ marginTop: "20vh" }}
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
                {this.state.result === "" && this.state.selected !== "" ? (
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={this.props.submitting}
                  >
                    Let's Dogify
                  </Button>
                ) : null}
              </Col>
              {this.state.result === "" ? (
                <Col xs={12} sm={12} md={6} lg={4}>
                  <p
                    style={{
                      fontSize: "45px",
                      fontWeight: "600",
                      lineHeight: "2.5vh",
                      marginTop: "2vh",
                    }}
                  >
                    Guess who am i ?
                  </p>
                  <Row>
                    <Col xs={12}>
                      {this.state.selected === "Golden Retriever" ? (
                        <Button variant="warning">Golden Retriever</Button>
                      ) : (
                        <Button
                          name="Golden Retriever"
                          onClick={this.selectOnClick}
                          variant="outline-warning"
                        >
                          Golden Retriever
                        </Button>
                      )}
                    </Col>
                    <Col xs={12}>
                      {this.state.selected === "Labrador Retriever" ? (
                        <Button variant="warning">Labrador Retriever</Button>
                      ) : (
                        <Button
                          name="Labrador Retriever"
                          onClick={this.selectOnClick}
                          variant="outline-warning"
                        >
                          Labrador Retriever
                        </Button>
                      )}
                    </Col>
                    <Col xs={12}>
                      {this.state.selected === "Kuvasz" ? (
                        <Button variant="warning">Kuvasz</Button>
                      ) : (
                        <Button
                          name="Kuvasz"
                          onClick={this.selectOnClick}
                          variant="outline-warning"
                        >
                          Kuvasz
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Col>
              ) : (
                <Col xs={12} sm={12} md={6} lg={4}>
                  <Row>
                    <p
                      style={{
                        fontSize: "45px",
                        fontWeight: "600",
                        lineHeight: "5vh",
                      }}
                    >
                      I am
                    </p>
                  </Row>
                  <Row style={{ marginTop: "6vh" }}>
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
                  <Row style={{ marginTop: "6vh" }}>
                    {this.state.result === this.state.selected ? (
                      <p
                        style={{
                          fontSize: "45px",
                          fontWeight: "600",
                          color: "green",
                        }}
                      >
                        Correct !
                      </p>
                    ) : (
                      <p
                        style={{
                          fontSize: "45px",
                          fontWeight: "600",
                          color: "red",
                        }}
                      >
                        In Correct !
                      </p>
                    )}
                  </Row>
                </Col>
              )}

              <Col xs={12} sm={12} md={12} lg={2}></Col>
            </Row>
          ) : (
            <Row>
              <Col xs={12} sm={2} md={2} xl={4}></Col>
              <Col xs={12} sm={8} md={8} xl={4}>
                <Field
                  name="imageToUpload"
                  component={DropZoneField}
                  type="file"
                  imagefile={this.state.imageFile}
                  handleOnDrop={this.handleOnDrop}
                />
              </Col>
              <Col xs={12} sm={2} md={2} xl={4}></Col>
            </Row>
          )}
        </Form>
      )}

      <div className="clear" />
    </div>
  );
}

export default reduxForm({ form: "UploadImageForm" })(UploadImageForm);
