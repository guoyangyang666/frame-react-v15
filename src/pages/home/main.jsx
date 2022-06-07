import React from "react"; // 引入了React
import { connect } from "react-redux";
import { Form, Row, Col, Card, Empty, Table, Modal, Icon, Spin, Skeleton, Tag, Divider, Radio, DatePicker, Select, Button } from "antd";
import ModalDrag from "@/component/dragableModal/main.js";
const FormItem = Form.Item;
const { Option } = Select;
const { Meta } = Card;

import config from "@/config/index";

import "./style.less";

import * as commonMethod from "@/utils/commonMethod/index.js";// 公共方法
import * as dateDisabled from "@/utils/commonMethod/dateDisabled.js";// 日期不可选

import u1033 from "./images/u1033.png";
import u853 from "./images/u853.png";

class Detail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      locationState: {}, // 传递的参数
      loading: false, // 加载状态
      noticeLoading: false, // 公告加载状态

      dataList: [],
      noticeList: [], // 通知公告列表
      dealtList: [], // 待办工作列表

      visibleModal: false, // 公告

      millionLoading: false,
      spreadLoading: false,
      dealLoading: false,
      evaluatedLoading: false,
      monitorLoading: false,

      evaluatedList: [],
      monitorList: [],


      reportSourceLoading: false, // 报告来源分布
      reportSourceList: [] // 报告来源分布

    };
  }

  componentDidMount () {
    this.sumSourceReportCaseNumFunc(); // 报告来源分布
    const noticeList = [
      {
        id: "1",
        title: "222关于及时修改国家相关业务系统登录密码的通知2",
        issuedate: "2021-06-04"
      },
      {
        id: "2",
        title: "关于上市许可持有人功能调整的通知",
        issuedate: "2021-06-04"
      },
      {
        id: "3",
        title: "关于做好四川省药物警戒相关工作的通知",
        issuedate: "2021-06-04"
      },
      {
        id: "4",
        title: "关于举办第七届中国药物警戒大会的通知",
        issuedate: "2021-06-04"
      }
    ]

    const dealtList = [
      {
        id: "1",
        noticeType: "信息报送",
        title: "请相关单位填写XX调研问卷",
        from: "自贡市",
        issuedate: "2021-06-04"
      },
      {
        id: "2",
        noticeType: "信息报送",
        title: "请相关单位填写XX调研问卷",
        from: "绵阳市",
        issuedate: "2021-06-04"
      },
      {
        id: "3",
        noticeType: "数据规整",
        title: "阿莫西林胶囊不良反应",
        from: "张三",
        issuedate: "2021-06-04"
      },
      {
        id: "4",
        noticeType: "信息报送",
        title: "请提交药品安全性评价工作后面省略省略省略省略了",
        from: "绵阳市",
        issuedate: "2021-06-04"
      }
    ]

    const monitorList = [
      {
        "1": "本日",
        "2": "2400",
        "3": "2400",
        "4": "2400",
        "5": "240"
      },
      {
        "1": "本周",
        "2": "2400",
        "3": "2400",
        "4": "2400",
        "5": "240"
      },
      {
        "1": "本月",
        "2": "2400",
        "3": "2400",
        "4": "2400",
        "5": "240"
      },
      {
        "1": "本年",
        "2": "2400",
        "3": "2400",
        "4": "2400",
        "5": "240"
      }
    ]

    const evaluatedList = [
      {
        "1": "严重",
        "2": "768"
      },
      {
        "1": "死亡",
        "2": "67"
      }
    ]

    this.setState({
      noticeList,
      dealtList,
      monitorList,
      evaluatedList
    })

  }


  // 查看公告详情
  viewNoticeHandle = ({ flag, noticeId }) => {
    this.setState({
      visibleModal: flag,
      noticeId
    })
  }

  // 切换日期
  timeRangeChange = ({ value, columns }) => {
    console.log("value-------", value);
    let range = [];
    if (value) {
      if (value == "0") {
        this.setState({
          [`${columns}ShowButton`]: true
        }, () => {
          return;
        })
      } else {
        this.setState({
          [`${columns}ShowButton`]: false
        })
        if (value != 20) {
          if (value == 12) {
            range = commonMethod.getRangeTime({ timeFlag: value, n: 6 });
          } else {
            range = commonMethod.getRangeTime({ timeFlag: value });
          }
          this.props.form.setFieldsValue({
            [`${columns}BeginDate`]: commonMethod.setDatePicker({ startDate: range[1] }),
            [`${columns}EndDate`]: commonMethod.setDatePicker({ startDate: range[0] })
          })
        } else {
          this.props.form.setFieldsValue({
            [`${columns}BeginDate`]: null,
            [`${columns}EndDate`]: null
          })
        }
        if (columns == "reportSource") {
          this.sumSourceReportCaseNumFunc(); // 报告来源分布
        }
        // if (columns == 'drug') {
        //   this.sumClassDrugCaseNumFunc(); // 药品类别报告数分布
        // }
        // if (columns == 'basicTop10') { // 基层单位报告数量(top10)
        //   this.sumBasicDeptReportCaseNumFunc();
        // }
        // if (columns == 'socPage') {
        //   this.sumWhoArtSocCaseNumFunc(); //药品不良反应累及系统（SOC）分布
        // }
      }
    }
  }

  // 报告来源分布
  sumSourceReportCaseNumFunc = () => {
    let self = this;
    let values = this.props.form.getFieldsValue();
    let beginDate = "";
    let endDate = "";
    if (values.reportSourceBeginDate) {
      beginDate = moment(values.reportSourceBeginDate).format("YYYY-MM-DD");// 开始时间
      endDate = moment(values.reportSourceEndDate).format("YYYY-MM-DD");// 开始时间
    }
    let params = {
      loginName: sessionStorage.getItem("loginName"),
      beginDate,
      endDate
    }
    params = commonMethod.delNullData({ value: params });
    let res = {"result": true, "data": {"legendCaption": ["医疗机构", "持有人自主报告", "经营企业"], "pie": [{"code": "1", "name": "医疗机构", "value": 15706659}, {"code": "4", "name": "持有人自主报告", "value": 509659}, {"code": "5", "name": "经营企业", "value": 2193038}]}, "desc": "查询成功"}
    if (res.result) {
      let countList = res.data.pie || [];
      let count = 0;
      countList.map((item, index) => {
        count += parseInt(item.value);
      })
      let reportSourceList = [];
      let list = res.data.legendCaption || [];
      list.map((item, index) => {
        let obj = {
          index,
          type: item,
          count: res.data.pie[index].value,
          percentage: (res.data.pie[index].value / count * 100).toFixed(2) + "%"
        }
        reportSourceList.push(obj);
      })
      console.log("reportSourceList------", reportSourceList);
      this.setState({
        reportSourceList
      }, () => {
        this.reportSourcePiePage.getMapChart({
          legendList: res.data.legendCaption,
          dataList: res.data.pie,
          color: ["#2D86DF", "#AAD7F9", "#88C5E7"]
        })
      })
    } else {
      Modal.error({
        title: res.desc
      });
    }

    return;
    // this.setState({ reportSourceLoading: true });// 加载结束
    // homeServices.sumSourceReportCaseNumMethod({ params, self }).then(res => {
    //   this.setState({ reportSourceLoading: false });// 加载结束
    //   if (res.result) {
    //     let countList = res.data.pie || [];
    //     let count = 0;
    //     countList.map((item, index) => {
    //       count += parseInt(item.value);
    //     })
    //     let reportSourceList = [];
    //     let list = res.data.legendCaption || [];
    //     list.map((item, index) => {
    //       let obj = {
    //         index,
    //         type: item,
    //         count: res.data.pie[index].value,
    //         percentage: (res.data.pie[index].value / count * 100).toFixed(2) + "%"
    //       }
    //       reportSourceList.push(obj);
    //     })
    //     console.log("reportSourceList------", reportSourceList);
    //     this.setState({
    //       reportSourceList
    //     }, () => {
    //       this.reportSourcePiePage.getMapChart({
    //         legendList: res.data.legendCaption,
    //         dataList: res.data.pie,
    //         color: ["#2D86DF", "#AAD7F9", "#88C5E7"]
    //       })
    //     })
    //   } else {
    //     Modal.error({
    //       title: res.desc,
    //     });
    //   }
    // })
  }


  render () {
    const { getFieldDecorator } = this.props.form;
    const self = this;

    const title = <ModalDrag title="查看通知公告" />

    let searchPage1 = (columns) => (
      <div className="searchCss">
        <FormItem style={{ float: "right" }}>
          <FormItem style={{ display: "inline-block" }}>
            {getFieldDecorator(`${columns}BeginDate`, {
              // initialValue: commonMethod.setDatePicker({ startDate: this.state.currentDate[1] })
            })(
              <DatePicker disabled={!this.state[`${columns}ShowButton`]} allowClear={false} disabledDate={(current) => dateDisabled.disabledDateMethod({ current })} />
            )}
          </FormItem>
          <span style={{ display: "inline-block", width: "10px", textAlign: "center" }}> -</span>
          <FormItem style={{ display: "inline-block" }}>
            {getFieldDecorator(`${columns}EndDate`, {
              // initialValue: commonMethod.setDatePicker({ startDate: this.state.currentDate[0] })
            })(
              <DatePicker disabled={!this.state[`${columns}ShowButton`]} allowClear={false} disabledDate={(current) => dateDisabled.disabledDateMethod({ current })} />
            )}
          </FormItem>
          {this.state[`${columns}ShowButton`] == true
            ? <Button style={{ marginLeft: "8px" }} type="primary" onClick={() => this.searchTime({ columns })}>查询</Button>
            : ""
          }
        </FormItem>
        <FormItem style={{ float: "right", marginRight: "10px" }}>
          {getFieldDecorator(`${columns}timeRange`, {
            initialValue: 5
          })(
            <Select
              style={{ width: "100%" }}
              placeholder="请选择"
              dropdownMatchSelectWidth={false}
              onChange={(value) => this.timeRangeChange({ value, columns })}
              // getPopupContainer={() => document.querySelector("#timeRange1")}
            >
              <Option value={20} key={20}>全部</Option>
              <Option value={"0"} key={"0"}>自定义</Option>
              <Option value={1} key={1}>本周</Option>
              <Option value={10} key={10}>上周</Option>
              <Option value={2} key={2}>本月</Option>
              <Option value={6} key={6}>上月</Option>
              <Option value={3} key={3}>本季度</Option>
              <Option value={12} key={12}>近半年</Option>
              <Option value={5} key={5}>本年</Option>
            </Select>
          )}
        </FormItem>
      </div>
    )
    const columns = [
      {
        title: "地区",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "报告数",
        dataIndex: "value",
        key: "value"
      }
    ]

    const evaluatedColumns = [
      {
        title: "报告类型",
        dataIndex: "1",
        key: "1",
        align: "center"
      },
      {
        title: "报告数量",
        dataIndex: "2",
        key: "2",
        align: "center",
        render: (text) => <a>{text}</a>
      }
    ]

    const monitorColumns = [
      {
        title: "时间",
        dataIndex: "1",
        key: "1",
        align: "center",
        width: "20%"
      },
      {
        title: "一般",
        dataIndex: "2",
        key: "2",
        align: "center",
        width: "20%"
      },
      {
        title: "严重",
        dataIndex: "3",
        key: "3",
        align: "center",
        width: "20%"
      },
      {
        title: "死亡",
        dataIndex: "4",
        key: "4",
        align: "center",
        width: "20%"
      },
      {
        title: "报告总数",
        dataIndex: "5",
        key: "5",
        align: "center",
        width: "20%"
      }
    ]
    return (
      <div className="adr_home">
        {/* --------------------通知公告、待办工作----------------- */}
        <Row>
          <div className="moudle">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Card bordered={false}>
                <div className="moudle_title moudle_title_icon">
                  <img src={u1033} /><span>通知公告</span>
                  <span className="moreList" onClick={() => this.jumpClick({ type: "notice" })}>更多</span>
                </div>
                <Spin spinning={this.state.noticeLoading}>
                  <div style={{ minHeight: "216px" }}>
                    {
                      this.state.noticeLoading ? <Skeleton />
                        : this.state.noticeList.length == 0 ? <div><Empty /></div>
                          : <div className="noticeCss">
                            {this.state.noticeList.map((item) => (
                              <div key={item.id}>
                                <div className="noticeContent" onClick={() => this.viewNoticeHandle({ flag: true, noticeId: item.id })}>
                                  {item.title}
                                </div>
                                <span className="noticeDate">{item.issuedate}</span>
                                <Divider dashed style={{ margin: "8px 0" }} />
                              </div>
                            ))}
                          </div>
                    }
                  </div>
                </Spin>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Card bordered={false}>
                <div className="moudle_title moudle_title_icon">
                  <img src={u853} /><span>待办工作</span>
                  <span className="moreList" onClick={() => this.jumpClick({ type: "warnEventRisk" })}>更多</span>
                </div>
                <Spin spinning={this.state.dealLoading}>
                  <div style={{ minHeight: "216px" }}>
                    {
                      this.state.noticeLoading ? <Skeleton />
                        : this.state.dealtList.length == 0 ? <div><Empty /></div>
                          : <div className="dealCss">
                            {this.state.dealtList.map((item) => (
                              <div key={item.id}>
                                <div className="dealContent" onClick={() => this.viewNoticeHandle({ flag: true, noticeId: item.id })}>
                                  <span className="dealType">【{item.noticeType}】</span><span className='dealTitle'>{item.title}</span>
                                </div>
                                <span className="dealDate"><span>{item.from}</span>{item.issuedate}</span>
                                <Divider dashed style={{ margin: "8px 0" }} />
                              </div>
                            ))}
                          </div>
                    }
                  </div>
                </Spin>
              </Card>
            </Col>
          </div>
        </Row>

        {/* <Modal
          centered
          wrapClassName="statisticsModal"
          width="1000"
          destroyOnClose={true}
          maskClosable={false}
          visible={this.state.visibleModal}
          title={title}
          onCancel={() => this.viewNoticeHandle({ flag: false })}
          footer={false}
        >
          <div>
            <DetailPage
              wrappedComponentRef={(form) => this.DetailPage = form}
              noticeId={this.state.noticeId}
            />
          </div>
        </Modal> */}
      </div>
    );
  }
}

const DetailComponent = Form.create()(Detail);
export default DetailComponent;
