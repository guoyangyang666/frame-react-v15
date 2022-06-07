import React, { Component } from "react"; // 引入了React
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { is, fromJS } from "immutable";
import configs from "@/config/index";


import { Spin, Form, Input, Button, Icon, Row, Col, Modal, Tabs } from "antd";
import ModalDrag from "@/component/dragableModal/main.js";

const FormItem = Form.Item;
const { TabPane } = Tabs;

import { getImagecodeMethod, loginMethod, getUserMenuMethod } from "@/services/login/login.js";

import "./style/style.less";


/* 以类的方式创建一个组件 */
class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      passwordDirty: false,
      loading: false,
      visible: false, // error提示
      imageValue: "", // 图片验证码值
      imageId: "",
      imageBase64: "",
      goTimeVisible: false,
      rPassVisible: false,
      basicVisible: false, // 基层注册弹窗
      holderVisible: false, // 持有人注册弹窗

      selectSysVisible: false, // 选择系统进入的弹窗
      appId: [],

      imageValueLoading: false, // 验证码loading
      retreveLoading: false,

      tabsKey: "omed"
    };
  }

  /**
   * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
   * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
   * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
   */

  componentDidMount () {

    const { actions } = this.props;
    // 清理数据
    sessionStorage.clear();
    this.getImage();
  }
  // 获取验证码
  getImage = () => {
    this.props.form.setFieldsValue({
      imageValue: "" // 清空验证码
    })
    let self = this;
    this.setState({
      imageValueLoading: true
    });
    getImagecodeMethod({ params: {}, self }).then((res) => {
      this.setState({ imageValueLoading: false })
      if (res.result) {
        this.setState({ imageBase64: res.data.verCode, imageId: res.data.verKey, imageValueLoading: false })
      } else {
        this.setState({ imageBase64: "", imageId: "" })
      }
    })
  }

  // 登录
  handleSubmit = (e) => {
    console.log("登录", e);
    e.preventDefault();

    const { actions, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let loginParams = { // 登录参数
          loginName: values.username,
          password: values.password,
          imageValue: values.imageValue,
          imageId: this.state.imageId
        };
        let self = this;
        this.setState({ visible: true, loading: true });
        loginMethod({ params: loginParams, self })
      }
    });
  }

  callback (key) {
    console.log("ss", key);
  }
  handleOk = () => {
    this.RetrievePasswordPage.submitHandle();
  }
  handleCancel = () => {
    this.setState({ goTimeVisible: false })
  }
  rPassVisible = ({ flag }) => {
    this.setState({ rPassVisible: flag })
  }
  retreveLoading = ({ flag }) => {
    this.setState({ retreveLoading: flag })
  }
  // 注册
  registerHandle = (type) => {
    let url = "";
    if (type == "1") {// 基层注册
      url = configs.regBaseUrl + "/PF/cdr/regBase/baseReg.jsp";
    } else if (type == "2") {// 持有人注册
      url = configs.cyrUrl + "/#/Registered";
    }
    window.open(url);
  }
  changeBasicVisible = ({ flag }) => {
    this.setState({
      basicVisible: flag
    })
  }
  handleBasicOk = () => {
    this.registerHandle("1")
  }
  changeHolderVisible = ({ flag }) => {
    this.setState({
      holderVisible: flag
    })
  }
  handleHolderOk = () => {
    this.registerHandle("2")
  }
  // 切换列表
  editPwdcallback = (key) => {
    this.setState({ tabsKey: key })
  }

  clickFunc = (name) => {
    let self = this;
    sessionStorage.setItem("appId", name);
    getUserMenuMethod({self, appId: name});
  }

  render () {
    const { form } = this.props;
    let { loading } = this.state;
    const getFieldDecorator = form.getFieldDecorator;
    const title = <ModalDrag title="找回密码" />;
    const title1 = <ModalDrag title="基层用户注册" />;
    const title2 = <ModalDrag title="药品上市许可持有人用户注册" />;

    return (
      <div className="my-login">
        <div className="login-form">
          <div className="login-title">数据采集系统</div>
          <div className="login-form-submit">
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "请填写登录名称!", whitespace: true }]
                })(
                  <Input
                    style={{ marginTop: 0, outline: "none" }}
                    prefix={<div className="userImg" ></div>}
                    placeholder="用户名" maxLength={40}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请填写密码!", whitespace: true }]
                })(
                  <Input
                    type="password"
                    prefix={<div className="pwdImg" ></div>}
                    placeholder="密码"
                    maxLength={40}
                  />
                )}
              </FormItem>
              <FormItem>
                <Row className="sss">
                  <Col xs={17} sm={17} md={17} lg={17} xl={17}>
                    {getFieldDecorator("imageValue", {
                      rules: [{ required: true, max: 5, message: "请正确填写五位验证码!", whitespace: true }]
                    })(
                      <Input
                        maxLength={5}
                        prefix={<div className="codeImg" ></div>}
                        placeholder="验证码"
                      />
                    )}
                  </Col>
                  <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                    <div className="codeImgs">
                      <Spin spinning={this.state.imageValueLoading}>
                        <img style={{ height: "30px", borderRadius: "5px" }} onClick={() => {this.getImage()}} src={this.state.imageBase64} />
                      </Spin>
                    </div>
                  </Col>
                </Row>
              </FormItem>
              <FormItem>
                <Button size="large" className="clsString" type="primary" htmlType="submit" loading={loading}>
                  {this.state.loading ? "登录中..." : "登录"}
                </Button>
              </FormItem>
            </Form>
            {/* 忘记密码弹窗 */}
            <Modal
              visible={this.state.rPassVisible}
              destroyOnClose
              maskClosable={false}
              centered
              width="800"
              title={title}
              onCancel={() => this.rPassVisible({ flag: false })}
              footer={[
                <Button key="back" onClick={() => this.rPassVisible({ flag: false })}>
                  返回
                </Button>
                // <Button key="submit" type="primary" loading={this.state.retreveLoading} onClick={this.handleOk}>
                //   找回密码
                // </Button>,
              ]}
            >
              忘记密码
              {/* <RetrievePassword
                wrappedComponentRef={(form) => this.RetrievePasswordPage = form}
                rPassVisible={this.rPassVisible}
                retreveLoading={this.retreveLoading}
              /> */}
            </Modal>
            {/* 基层注册弹窗 */}
            <Modal
              visible={this.state.basicVisible}
              destroyOnClose
              maskClosable={false}
              centered
              width="800"
              title={title1}
              onCancel={() => this.changeBasicVisible({ flag: false })}
              footer={[
                <Button key="submit" type="primary" loading={this.state.retreveLoading} onClick={this.handleBasicOk}>
                  我没有国家系统账号，继续注册
                </Button>,
                <Button key="back" onClick={() => this.changeBasicVisible({ flag: false })}>
                  返回
                </Button>
              ]}
            >
              <div style={{ minHeight: "300px", fontSize: "16px" }}>
                基层用户请使用国家不良反应监测系统的账号密码登录，如已有国家系统账号的机构请直接登录。
              </div>
            </Modal>
            {/* 持有人注册弹窗 */}
            <Modal
              visible={this.state.holderVisible}
              destroyOnClose
              maskClosable={false}
              centered
              width="800"
              title={title2}
              onCancel={() => this.changeHolderVisible({ flag: false })}
              footer={[
                <Button key="submit" type="primary" loading={this.state.retreveLoading} onClick={this.handleHolderOk}>
                  我没有国家系统账号，继续注册
                </Button>,
                <Button key="back" onClick={() => this.changeHolderVisible({ flag: false })}>
                  返回
                </Button>
              ]}
            >
              <div style={{ minHeight: "300px", fontSize: "16px" }}>
                药品上市许可持有人请使用国家药品上市许可持有人药品不良反应直接报告系统的“报告管理”账号密码登录，如已有国家系统账号的企业请直接登录。
              </div>
            </Modal>
            <div className="register-other">
              <a href="javascript:;" style={{ color: "red", float: "left" }} onClick={() => this.rPassVisible({ flag: true })}>忘记密码？</a>
            </div>
            {/* 忘记密码弹窗 */}
            <Modal
              visible={this.state.selectSysVisible}
              destroyOnClose
              maskClosable={false}
              centered
              title='请选择进入的系统'
              onCancel={() => this.setState({selectSysVisible: false})}
              footer={[
                <Button key="back" onClick={() => this.setState({selectSysVisible: false})}>
                  取消
                </Button>
              ]}
            >
              <div style={{fontSize: "18px", textAlign: "center"}}>
                <div style={{marginBottom: "20px"}}><a onClick={() => this.clickFunc("MAH")}>持有人报告</a></div>
                <div><a onClick={() => this.clickFunc("ADR")}>医疗机构报告</a></div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

const LoginForm = Form.create()(Login);
export default LoginForm;
