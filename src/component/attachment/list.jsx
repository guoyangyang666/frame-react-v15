import React from "react";
import { Modal, Button, Table, Upload, Icon, Divider, Popconfirm } from "antd";
import * as attachmentServices from "@/services/common/attachment.js";// 附件相关服务

class AttachmentList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dataList: [], // 列表数据
      newFiles: [],
      deleteIds: []
    };
  }

    // 下载附件
    downloadHandle = ({ record }) => {
      let self = this;
      attachmentServices.ddownloadAttchByIdMethod({ params: record, self })
    }

    columns = [
      {
        title: "附件类型",
        dataIndex: "fileType",
        key: "fileType",
        width: "15%"
      },
      {
        title: "附件名称",
        dataIndex: "fileName",
        key: "fileName",
        width: "20%"
      },
      {
        title: "附件摘要",
        dataIndex: "fileSummary",
        key: "fileSummary",
        width: "15%"
      },
      {
        title: "上传单位",
        dataIndex: "uploadUnit",
        key: "uploadUnit",
        width: "20%"
      },
      {
        title: "上传时间",
        dataIndex: "uploadDate",
        key: "uploadDate",
        width: "15%"
      },
      {
        title: "操作",
        width: "15%",
        render: (text, record, index) => {
          let operation;
          if (record.id) {
            operation = (
              <span className="buttonOption">
                <a className="editButton" onClick={() => this.downloadHandle({ record })}><Icon type="download" />下载</a>
                <a className="deleteButton">
                  <Popconfirm title="确定删除？" okText="确定" cancelText="取消" onConfirm={(e) => this.deleteHandle(index, record)}>
                    <Icon type="delete" />删除
                  </Popconfirm>
                </a>
              </span>
            );
          } else {
            operation = (
              <span className="buttonOption">
                <a className="deleteButton">
                  <Popconfirm title="确定删除？" okText="确定" cancelText="取消" onConfirm={(e) => this.deleteHandle(index, record)}>
                    <Icon type="delete" />删除
                  </Popconfirm>
                </a>
              </span>
            );
          }
          return (
            <span>
              {operation}
            </span>
          );
        }
      }
    ];

    deleteHandle = (index, record) => {
      console.log("record---------", record);
      if (record.id) {
        let deleteIds = [...this.state.deleteIds];
        deleteIds.push({ id: record.id });
        this.setState({
          deleteIds
        });
        this.deleteFiles({ record });
      } else {
        let newFiles = this.state.newFiles.filter((file, index) => file.uid != record.uid);
        this.setState({
          newFiles
        });
      }
      let dataList = [...this.state.dataList];
      dataList.splice(index, 1);
      this.setState({
        dataList
      });

    }


    // 删除附件
    deleteFiles = ({ record }) => {
      let self = this;
      let params = {
        loginName: sessionStorage.getItem("loginName"),
        id: record.id
      }
      this.setState({ loading: true });
      attachmentServices.deleteSysAttachmentMethod({ params, self }).then((res) => {
        console.log("服务返回res==>", res);
        this.setState({ loading: false });// 加载结束
        if (res.result) {
        } else {
          Modal.error({
            title: res.desc
          });
        }
      })
    }

    render () {
      const uploadProps = {
        listType: "picture",
        showUploadList: false, // 是否展示文件列表
        beforeUpload: (file) => {
          let newFiles = [...this.state.newFiles, file];
          this.setState({
            newFiles
          });
          return false;
        },
        onChange: (data) => {
          let dataList = [...this.state.dataList];
          dataList.push({
            fileName: data.file.name,
            fileType: data.file.type,
            uid: data.file.uid
          });

          this.setState({
            dataList
          });
        }
      }
      return (
        <div>
          <Upload {...uploadProps}>
            <Button>
              <Icon type="upload" />上传
            </Button>
          </Upload>
          <Table
            bordered
            pagination={false}
            columns={this.columns}
            size="middle"
            dataSource={this.state.dataList}
          />
        </div>
      );
    }
}

export default AttachmentList;
