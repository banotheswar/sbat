import React, { Component } from "react";
import "antd/dist/antd.css";
import * as constant from "../../constants";
import { Image } from "antd";

class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo1: "",
      photo2: "",
      isViewerSelf: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.photo1 !== prevProps.photo1 ||
      this.props.photo2 !== prevProps.photo2
    ) {
      if (this.state.photo1 === "" || this.state.photo2 === "") {
        this.setState({
          photo1: this.props.photo1,
          photo2: this.props.photo2,
          isViewerSelf: this.props.isViewerSelf,
        });
      }
    }
  }

  render() {
    let output;
    output =
      this.state.photo1 !== constant.PHOTO1_PATH ? (
        <Image.PreviewGroup>
          <Image
            width={110}
            src={this.state.photo1}
            fallback={constant.FALLBACK_IMAGE}
          />
          {this.state.photo2 !== constant.PHOTO2_PATH ? (
            <Image
              width={110}
              src={this.state.photo2}
              fallback={constant.FALLBACK_IMAGE}
            />
          ) : (
            <></>
          )}
        </Image.PreviewGroup>
      ) : this.state.photo2 !== constant.PHOTO2_PATH ? (
        <Image
          width={110}
          src={this.state.photo2}
          fallback={constant.FALLBACK_IMAGE}
        />
      ) : this.state.isViewerSelf ? (
        <Image.PreviewGroup>
          <Image width={110} src="" fallback={constant.FALLBACK_IMAGE} />
          <Image width={110} src="" fallback={constant.FALLBACK_IMAGE} />
        </Image.PreviewGroup>
      ) : (
        <></>
      );
    return output;
  }
}

export default Thumbnail;
