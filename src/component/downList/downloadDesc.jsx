import React from 'react'; // 引入了React和PropTypes
import { Form, Input, Row, Col, Modal, Button, Spin } from 'antd';
import ModalDrag from '@/component/dragableModal/main.js';

import * as omedServices from '@/services/deliver/omed.js';// 个例相关服务

const FormItem = Form.Item;
const { TextArea } = Input;


/**
 * 个例报告>>办理>>申请修改
 */
class DownloadDesc extends React.Component {
  constructor (props) {
    super(props);// 后才能用this获取实例化对象
    this.state = {
      loading: false,
      visibleModal: false // modal显隐
    };
  }

  /**
   * modal显隐
   * @param {Object} paramsObj 入参对象
   * @param {*} flag true false
   * @param {*} reportId 报告id
   * @param {*} newFlag 是否新报告
   * @param {*} adrResult 不良反应结果
   * @returns {*} 返回
   */
  visibleModalHandle = (paramsObj) => {
    this.setState({
      visibleModal: paramsObj.flag
    })
  }

  // 申请修改>>确定
  handleOk = () => {
    let self = this;
    console.log(' this.props----', this.props);
    let values = this.props.form.getFieldsValue();
    console.log('self.props-------', values);
    if (!values.downloadDesc || values.downloadDesc == undefined || values.downloadDesc == null || values.downloadDesc == '') {
      Modal.error({
        title: '请输入导出任务名称！'
      });
      return;
    }
    if (self.props.zipType === 'adr-feedback') { // 反馈数据导出
      self.props.setStates({ type: 'downloadDesc', value: values.downloadDesc, func: (res) => {
        if (res) {
          self.props.exportReport();
        }
      } });
    } else {
      self.props.setStates({ type: 'downloadDesc', value: values.downloadDesc });
      self.props.openEditColumnFunc();
    }
  }


  render () {
    const self = this;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };
    let _title = this.props.title || '填写导出任务名称';
    const title = <ModalDrag title={_title} />
    let content = (
      <Form>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <FormItem label="任务名称" {...formItemLayout}>
              {getFieldDecorator('downloadDesc', {
                rules: [
                  { required: true, message: '请输入导出任务名称' }
                ]
              })(
                <Input placeholder="请输入..." />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )

    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Modal
            centered
            // wrapClassName="statisticsModal"
            width="600"
            destroyOnClose
            maskClosable={false}
            visible={this.state.visibleModal}
            title={title}
            onOk={this.handleOk}
            onCancel={() => this.visibleModalHandle({ flag: false })}
            footer={[
              <Button key="submit" type="primary" onClick={this.handleOk} loading={this.state.loading}>确定</Button>,
              <Button key="back" onClick={() => this.visibleModalHandle({ flag: false })}>取消</Button>
            ]}
          >
            <div>
              {content}
            </div>
          </Modal>
        </Spin>
      </div>
    )
  }
}
const IndexComponent = Form.create()(DownloadDesc);
export default IndexComponent
