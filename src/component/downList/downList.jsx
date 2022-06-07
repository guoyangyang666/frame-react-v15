import React from 'react'; // 引入了React
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Select, Button, List, Spin, Table, DatePicker, Radio, Switch, Icon, Badge, Collapse, Checkbox, Tag, Modal, message } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const { Option } = Select;
const Panel = Collapse.Panel;
const { CheckableTag } = Tag;
const { Search } = Input;
const { confirm } = Modal;

import * as dateDisabled from '@/utils/commonMethod/dateDisabled.js';// 日期不可选
import * as staticData from '@/utils/commonMethod/static.js';// 引用静态数据
import * as commonMethod from '@/utils/commonMethod/index.js';// 公共方法
import * as exportServices from '@/services/common/export.js';// 导出相关服务

// 实时统计/报告统计/打包下载列表
class Index extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: false, //
      dataList: [],
      total: 0,
      pageSize: staticData.paginationProps.pageSize, // 默认的每页条数
      currentPage: 1, // 当前页数
      visibleModal: false, // 设为常用报表Modal是否显示
      selectedRowKeys: [],
      selectedRows: []
    };
  }

  // 页面渲染之后
  componentDidMount () {
  }

  // 离开页面时
  componentWillUnmount () {
  }

  // 获取当前用户已设置的常用报表
  getDownList = () => {
    let self = this;
    let values = this.props.form.getFieldsValue();
    let params = {
      loginName: sessionStorage.getItem('loginName'), // 登陆者用户名称
      'pager.pageSize': this.state.pageSize, // 默认的每页条数
      'pager.pageNo': this.state.currentPage, // 当前页数
      type: this.props.zipType, // adr 持有人个例 omed-more 医疗机构个例-初级 omed-simple 医疗机构个例-常规 adr-feedback 持有人反馈报告
      moduleType: this.props.moduleType,
      dtStart: values.dtStart && moment(values.dtStart).format('YYYY-MM-DD') + ' 00:00:00' || '', // 开始时间
      dtEnd: values.dtEnd && moment(values.dtEnd).format('YYYY-MM-DD') + ' 23:59:59' || '', // 结束时间
      taskState: values.taskState || '',
      downloadDesc: values.downloadDesc || ''
    }
    this.setState({ loading: true });
    exportServices.selectSDownloadZipMethod({ params, self }).then((res) => {
      console.log('服务返回res==>', res);
      this.setState({ loading: false });
      if (res.result) {
        this.setState({
          dataList: res.data || [],
          total: res.total || 0 // 总条数
        })
      } else {
        Modal.error({
          title: res.desc
        });
      }
    })
      .catch((err) => {
      // 根据实际需求，在catch中，对异常数据的处理
        console.log('服务异常');
      })
  }

  // modal框
  visibleModalHandle = ({ flag }) => {
    this.setState({
      visibleModal: flag
    }, () => {
      if (flag) {
        this.getDownList();
      }
    })
  }

  // 下载
  download = ({ record }) => {
    console.log('record----------', record);
    let obj = {
      fileName: record.downloadDesc,
      filePath: record.fileUrl,
      taskId: record.id
    }
    // this.updateStatusHandle({ id: record.id, status: 'P' }); // 状态改成“已下载”
    exportServices.downloadFileMethod({ params: obj, self });
    if (record.taskState && record.taskState === 'Y') { // 待下载
      this.getDownList();
    }
  }

  // 改变页面后的数据刷新
  changePagination = (obj = {}) => {
    this.getDownList({});// 查询个例报告列表
  }

  // 删除
  deleteHandle = ({ record }) => {
    let self = this;
    confirm({
      title: '提示',
      content: '是否确定删除对应的记录?',
      okText: '取消',
      okType: 'none',
      cancelButtonProps: { type: 'primary' },
      cancelText: '确定',
      onOk () {
      },
      onCancel () {
        console.log('Cancel');
        self.deleteStatusHandle({ id: record.id });
      }
    });
  }

  // 删除报告导出信息
  deleteStatusHandle = ({ id }) => {
    let self = this;
    let params = {
      loginName: sessionStorage.getItem('loginName'), // 登陆者用户名称
      id
    }
    this.setState({ loading: true });
    exportServices.deleteSDownloadZipMethod({ params, self }).then((res) => {
      console.log('服务返回res==>', res);
      this.setState({ loading: false });
      if (res.result) {
        Modal.success({
          title: res.desc
        });
        this.getDownList();
      } else {
        Modal.error({
          title: res.desc
        });
      }
    })
      .catch((err) => {
      // 根据实际需求，在catch中，对异常数据的处理
        console.log('服务异常', err);
      })
  }

  // 修改状态
  updateStatusHandle = ({ id, status }) => {
    let self = this;
    let params = {
      loginName: sessionStorage.getItem('loginName'), // 登陆者用户名称
      taskState: status,
      id
    }
    this.setState({ loading: true });
    exportServices.updateSDownloadZipMethod({ params, self }).then((res) => {
      console.log('服务返回res==>', res);
      this.setState({ loading: false });
      if (res.result) {
        if (status == 'D') { // 删除的时候提示返回信息
          message.success('删除成功');
        }
        this.getDownList();
      } else {
        Modal.error({
          title: res.desc
        });
      }
    })
      .catch((err) => {
      // 根据实际需求，在catch中，对异常数据的处理
        console.log('服务异常', err);
      })
  }

  // 表单查询
  searchHandle = (e) => {
    e.preventDefault();
    this.setState({
      currentPage: 1 // 重置当前页码
    }, () => {
      this.getDownList();
    })
  }

  // 重置表单
  resetHandle = () => {
    // this.props.form.resetFields();// 清空表单
    this.props.form.setFieldsValue({ downloadDesc: '', dtStart: null, dtEnd: null });
    this.setState({
      currentPage: 1 // 重置当前页码
    }, () => {
      this.getDownList();
    })
  }

  render () {
    const self = this;
    const { getFieldDecorator } = this.props.form;
    const { dataList, loading } = this.state;
    const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

    /**
     * 常用统计表列头
     */
    const columns = [
      {
        title: '序号',
        key: 'index',
        width: '7%',
        render: (text, record, index) => (<span>{index + 1}</span>)
      },
      {
        title: '任务名称',
        dataIndex: 'downloadDesc',
        width: '34%',
        key: 'downloadDesc'
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        width: '20%',
        key: 'createDate'
      },
      {
        title: '状态',
        dataIndex: 'taskState',
        width: '20%',
        key: 'taskState',
        render: (text, record) => {
          // N待导出，I导出中，D已删除，F导出失败，Y待下载，P已下载
          if (text == 'N') {
            return (<span><Badge status="default" text="待导出" /></span>);
          } else if (text == 'I') {
            return (<span><Badge status="processing" text="导出中" /></span>);
          } else if (text == 'F') {
            return (<span><Badge status="error" text="导出失败" /></span>);
          } else if (text == 'Y') {
            return (<span><Badge status="processing" text="待下载" /></span>);
          } else if (text == 'P') {
            return (<span><Badge status="success" text="已下载" /></span>);
          }
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '13%',
        key: 'action',
        ellipsis: true,
        render: (text, record) => {
          let temp = '';
          let temp1 = '';
          if (record.taskState == 'Y' || record.taskState == 'P') { // 待下载、已下载（可以重复下载）
            temp = <a href="javascript:void(0);" onClick={() => this.download({ record })}>下载</a>;
          }
          if ((record.taskState == 'Y' || record.taskState == 'P' || record.taskState == 'F')) { // 待下载、已下载、导出失败
            temp1 = <a style={{ marginLeft: '8px' }} href="javascript:void(0);" onClick={() => this.deleteHandle({ record })}>删除</a>;
          }
          return (<span>{temp}{temp1}</span>);
        }
      }
    ];

    const content = <div>
      <div className="searchBox adrSearchBox">
        <Form {...formItemLayout} onSubmit={this.searchHandle} >
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}
              xxl={12}>
              <FormItem label="任务名称">
                {getFieldDecorator('downloadDesc', {
                })(
                  <Input placeholder="请输入" type="text" />
                )}
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}
              xxl={12}>
              <FormItem label="创建时间">
                <FormItem style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                  {getFieldDecorator('dtStart', {
                    // initialValue: commonMethod.setDatePicker({ startDate: this.state.currentDate[1] })
                  })(
                    <DatePicker style={{ width: '100%' }} allowClear={false} disabledDate={(current) => dateDisabled.disabledDateMethod({ current })} />
                  )}
                </FormItem>
                <span style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}> -</span>
                <FormItem style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                  {getFieldDecorator('dtEnd', {
                    // initialValue: commonMethod.setDatePicker({ startDate: this.state.currentDate[0] })
                  })(
                    <DatePicker style={{ width: '100%' }} allowClear={false} disabledDate={(current) => dateDisabled.disabledDateMethod({ current })} />
                  )}
                </FormItem>
              </FormItem>
            </Col>
          </Row>
          {/* <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <FormItem label="导出状态">
                {getFieldDecorator('taskState', {
                })(
                  <Select style={{ width: '100%' }} placeholder="请选择">
                    <Option value="N">待导出</Option>
                    <Option value="I">导出中</Option>
                    <Option value="D">已删除</Option>
                    <Option value="F">导出失败</Option>
                    <Option value="Y">待下载</Option>
                    <Option value="P">已下载</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row> */}
          <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button onClick={this.resetHandle} style={{ marginLeft: 8 }}>重置</Button>
          </div>
        </Form>
      </div>
      <div>
        <div style={{ marginBottom: '5px', color: 'red' }}>提示：点击查询按钮可以刷新导出状态</div>
        <Table
          rowKey='id'
          bordered
          size="middle"
          columns={columns}
          dataSource={dataList}
          pagination={commonMethod.getPaginationProps({ self })}
        />
      </div>
    </div>

    return (
      <div style={{ padding: '10px' }}>
        <Modal
          centered
          wrapClassName="statisticsModal"
          width={800}
          destroyOnClose
          maskClosable={false}
          visible={this.state.visibleModal}
          title="任务列表"
          onCancel={() => this.visibleModalHandle({ flag: false })}
          footer={[
            <Button key="back" onClick={() => this.visibleModalHandle({ flag: false })}>取消</Button>
          ]}
        >
          <div>
            <Spin spinning={loading} tip="加载中">
              {content}
            </Spin>
          </div>
        </Modal>
      </div >
    );
  }
}

const TrackComponent = Form.create()(Index);
export default TrackComponent;
