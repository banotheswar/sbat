import React, { Component } from "react";
import "antd/dist/antd.css";
import ImgCrop from "antd-img-crop";
import { message, Upload, Modal, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as constant from "../../constants";
import ProfileService from "../../services/ProfileService";

class UploadPic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarModalVisible: false,
      horoscopeModalVisible: false,
      photosModalVisible: false,
      type: props.type,
      image: null,
      uploadedPhotosPath: null,
      horoscope: props.horoscope,
      photos: this.props.photos,
      defaultFileListProps: [],
      fileListPropsCopy: [],
    };
  }

  showAvatarModal = () => {
    this.setState({ avatarModalVisible: true });
  };

  showHoroscopeModal = () => {
    this.setState({ horoscopeModalVisible: true });
  };

  showPhotosModal = () => {
    this.setState({ photosModalVisible: true });
  };

  handleOk = () => {
    this.setState({
      avatarModalVisible: false,
      horoscopeModalVisible: false,
      photosModalVisible: false,
    });
    if (this.state.type === "avatar") {
      this.props.handleImageChange(constant.AVATAR_PATH + this.state.image);
    } else if (this.state.type === "horoscope") {
      this.props.handleImageChange(constant.HOROSCOPE_PATH + this.state.image);
    } else {
      this.props.handleImageChange(this.state.uploadedPhotosPath);
    }
  };

  handleCancel = () => {
    this.setState({
      avatarModalVisible: false,
      horoscopeModalVisible: false,
    });
  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      this.handleCancel();
      message.error("You can only upload JPG/PNG file!");
    }
    /* const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    } */
    return isJpgOrPng /* && isLt2M */;
  };

  onChange = (info) => {
    if (info.file.status === "done") {
      this.setState({ image: info.file.response.name });
      this.handleOk();
      message.success("Uploaded!");
    }
  };

  photosUpload = ({ fileList }) => {
    this.setState({ defaultFileListProps: fileList });
  };

  photosRemove = (file) => {
    if (file.uid.toString().indexOf("rc-upload") !== -1) {
      return;
    }
    ProfileService.deletePhoto({
      id: sessionStorage.getItem("userId"),
      fileNumber: Math.abs(file.uid),
    })
      .then(() => {
        localStorage.setItem("refresh", true);
        message.success("Photo Removed!");
      })
      .catch(() => {
        localStorage.setItem("reload", true);
        window.location.reload();
      });
  };

  photoCancel = () => {
    this.setState({
      photosModalVisible: false,
    });
    if (localStorage.getItem("refresh")) {
      localStorage.removeItem("refresh");
      window.location.reload();
    }
  };

  componentDidMount() {
    if (localStorage.getItem("reload")) {
      message.error("Something went wrong! Please try again!");
      localStorage.removeItem("reload");
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.photos !== prevProps.photos) {
      const photosArray = this.props.photos;
      let photosList = [];
      photosArray.forEach((item, index) => {
        if (item !== "" && item !== constant["PHOTO" + (index + 1) + "_PATH"]) {
          const fullPath = item;
          const fileName = fullPath.substr(fullPath.lastIndexOf("/") + 1);
          photosList.push({
            uid: -(index + 1),
            url: fullPath,
            name: fileName,
            status: "done",
          });
        }
      });
      if (this.state.defaultFileListProps.length === 0) {
        this.setState({
          defaultFileListProps: photosList,
          fileListPropsCopy: photosList,
        });
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    let fileList = this.state.defaultFileListProps;
    console.log(fileList);
    if (
      fileList.length === 0 ||
      fileList === this.state.fileListPropsCopy ||
      (fileList.length === 1 && fileList[0].url !== undefined)
    ) {
      this.photoCancel();
    } else {
      if (fileList.length > 1 && fileList[0].url !== undefined) {
        formData.append("file1", fileList[0].name);
        formData.append("fileNumber", Math.abs(fileList[0].uid));
      } else {
        formData.append("file1", fileList[0].originFileObj);
      }
      if (fileList?.[1]) {
        formData.append("file2", fileList[1].originFileObj);
      }
      formData.append("id", sessionStorage.getItem("userId"));
      formData.append("userName", sessionStorage.getItem("userName"));
      ProfileService.uploadPhotos(formData)
        .then((response) => {
          let photosArray = [constant.PHOTO1_PATH + response.data.file1];
          if (response.data.file2) {
            photosArray.push(constant.PHOTO2_PATH + response.data.file2);
          }
          this.setState({ uploadedPhotosPath: photosArray });
          this.handleOk();
          message.success("Uploaded!");
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  render() {
    if (this.state.type === "avatar") {
      return (
        <>
          <Button
            type="warning"
            className="profilePic"
            onClick={this.showAvatarModal}
          >
            Change Photo
          </Button>
          <Modal
            title="Change Photo"
            visible={this.state.avatarModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okButtonProps={{ style: { display: "none" } }}
          >
            <ImgCrop grid>
              <Upload
                name="avatar"
                data={{
                  id: sessionStorage.getItem("userId"),
                  userName: sessionStorage.getItem("userName"),
                }}
                headers={{
                  authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }}
                beforeUpload={this.beforeUpload}
                listType="picture"
                action={constant.PROFILE_API_URL + "/avatar"}
                maxCount={1}
                accept=".jpg,.jpeg,.png,.gif"
                multiple={false}
                onChange={this.onChange}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </ImgCrop>
          </Modal>
        </>
      );
    } else if (this.state.type === "horoscope") {
      return (
        <>
          <Button
            type="text"
            className="horoscope"
            onClick={this.showHoroscopeModal}
          >
            Update
          </Button>
          <Modal
            title="Update Horoscope"
            visible={this.state.horoscopeModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okButtonProps={{ style: { display: "none" } }}
          >
            <ImgCrop shape="rect">
              <Upload
                name="horoscope"
                data={{
                  id: sessionStorage.getItem("userId"),
                  userName: sessionStorage.getItem("userName"),
                }}
                headers={{
                  authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }}
                beforeUpload={this.beforeUpload}
                listType="text"
                action={constant.PROFILE_API_URL + "/horoscope"}
                maxCount={1}
                accept=".jpg,.jpeg,.png,.gif"
                multiple={false}
                onChange={this.onChange}
              >
                <Button>Upload</Button>
              </Upload>
            </ImgCrop>
          </Modal>
        </>
      );
    } else {
      const uploadButton = <div className="ant-upload-text">Upload</div>;
      return (
        <>
          <Button
            type="warning"
            className="fullSizePic"
            onClick={this.showPhotosModal}
          >
            Update Photos
          </Button>
          <div>
            <Modal
              title="Full Size Photos"
              visible={this.state.photosModalVisible}
              onCancel={this.photoCancel}
              okButtonProps={{ style: { display: "none" } }}
              footer={[
                <Button type="primary" onClick={this.handleSubmit}>
                  Submit
                </Button>,
              ]}
            >
              <ImgCrop shape="rect">
                <Upload
                  fileList={this.state.defaultFileListProps}
                  showUploadList={{ showPreviewIcon: false, removeIcon: false }}
                  beforeUpload={() => false}
                  listType="picture-card"
                  maxCount={2}
                  multiple
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={this.photosUpload}
                  onRemove={this.photosRemove}
                >
                  {this.state.defaultFileListProps.length >= 2
                    ? null
                    : uploadButton}
                </Upload>
              </ImgCrop>
            </Modal>
          </div>
        </>
      );
    }
  }
}

export default UploadPic;
