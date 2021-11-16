import React, { Component } from "react";
import "antd/dist/antd.css";
import { Carousel, Modal, Button } from "antd";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";

class Carousell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentStyle: {
        height: "400px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
      },
      visible: false,
    };
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;
    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      img.onerror = () => {
        callback(false);
      };
    }
  }

  render() {
    const carouselRef = React.createRef();
    return (
      <>
        <Button type="text" onClick={this.showModal}>
          Photos
        </Button>
        <Modal
          title="View Photo(s)"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <div className="row">
            <LeftCircleFilled
              style={{
                position: "relative",
                top: "180px",
                fontSize: "25px",
                color: "darkgray",
              }}
              onClick={() => carouselRef.current.prev()}
              className="col-md-1"
            />
            <Carousel dotPosition="top" ref={carouselRef} className="col-md-10">
              <div>
                {this.props.firstImageUrl.indexOf("null") == -1 ? (
                  <img
                    width="500"
                    height="400"
                    src={this.props.firstImageUrl}
                  />
                ) : (
                  <h3 style={this.state.contentStyle}>No Image</h3>
                )}
              </div>
              <div>
                {this.props.secondImageUrl.indexOf("null") == -1 ? (
                  <img
                    width="500"
                    height="400"
                    src={this.props.secondImageUrl}
                  />
                ) : (
                  <h3 style={this.state.contentStyle}>No Image</h3>
                )}
              </div>
            </Carousel>
            <RightCircleFilled
              style={{
                position: "relative",
                top: "180px",
                left: "-12px",
                fontSize: "25px",
                color: "darkgray",
              }}
              onClick={() => carouselRef.current.next()}
              className="col-md-1 pull-right"
            />
          </div>
        </Modal>
      </>
    );
  }
}

export default Carousell;
