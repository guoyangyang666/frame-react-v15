import React, { Component } from "react"; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import ModalDrag from "@/component/dragableModal/main.js";
import $ from "jquery";

// 公共菜单
import { Lmenu } from "./lmenu";
import * as commonMethod from "@/utils/commonMethod/index.js";// 公共方法

import { Layout, Dropdown, Menu, Icon, Button, Modal } from "antd";

const { Content, Sider, Header } = Layout;

import "./style/layout.less";// 引入样式
import proviceLogoSrc from "./image/proviceLogo.png";// 省级logo

import PageStyle1 from "./pageStyle/webOpen";
import iconFontUrl from "../../iconfont/iconfont";
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: iconFontUrl // 在 iconfont.cn 上生成
});


class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      layout: sessionStorage.getItem("layoutType") || "topBottom", // topBottom:上下结构;topSider:顶部+侧边
      crumbs: true, // 是否显示面包屑
      crumbsUrl: sessionStorage.getItem("namUrl") || "", // 面包屑
      menuFirstList: [], // 顶部菜单
      leftMenu: [], // 左侧菜单
      menuAllList: [], // 菜单
      menuChildList: sessionStorage.getItem("menuChildList") || [], // 子级菜单

      menuShow: true, // 是否显示菜单
      pathname: sessionStorage.getItem("currentPageUrl") || "",

      passwordModal: false, // 修改密码

      rangeValue: "1", // 范围
      openKeys: [],
      collapsed: false,

      defaultSelectedKeyChild: [],
      ssoLoading: false,

      homeUrl: ["/adr/main", "/mah/main"]
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount = () => {
    console.log("------------新的集成123-----------111111111111111111:")
    let self = this;
    let urlParam = commonMethod.getUrlParams({ self });// 获取地址栏参数
    let pathname = this.props.location.pathname;
    // 外部链接（去除头部和菜单）
    if (urlParam.webOpen == "1" || urlParam.external == "1" || pathname == "/page/identity" || pathname == "/page/provide") {
      this.setState({
        menuShow: false
      })
    } else {
      if (sessionStorage.getItem("userToken")) {
        this.setState({
          pathname: this.props.location.pathname,
          menuShow: true
        })
        this.initMethod();// 进行初始化
      } else {
        // 其他网站访问某个页面
        if (urlParam.external == "3") {
          this.setState({
            menuShow: false
          })
        } else {
          global.$history.push("/login");
        }
      }
    }
  }

  // 初始化
  initMethod = () => {
    let menusList = sessionStorage.getItem("menu");
    menusList = JSON.parse(menusList);

    let menuChild = sessionStorage.getItem("menuChildList");
    let menuChildList = [];
    if (menuChild) {
      menuChildList = JSON.parse(menuChild);
    }

    console.log("---menuAllList:", menusList);

    let currentPageKey = sessionStorage.getItem("currentPageKey");
    let defaultSelectedKeyChild = [];
    if (currentPageKey) {
      defaultSelectedKeyChild.push(currentPageKey);
    }

    this.setState({
      menuAllList: menusList,
      menuChildList,
      defaultSelectedKeyChild
    })
    console.log("打印一下！");
    this.setLayout({ pathname: this.props.location.pathname });
  }

  // 检测路由变化更新页面
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps (nextProps) {
    console.log("当前路由:", this.props);
    console.log("当前路由:", this.props.location.pathname);
    console.log("跳转路由:", nextProps.location.pathname);
  }

  // 在父页面里加入该行代码即可
  // eslint-disable-next-line react/no-deprecated
  componentWillUpdate () {
    console.log("-----在父页面里加入该行代码即可")
    if (document.getElementById("root")) {
      try {
        console.log("scrollIntoView------layout");
        document.getElementById("root").scrollIntoView(true);// 为ture返回顶部，false为底部
      } catch (error) {
        console.log("layout--scrollIntoView-------", error);
      }
    }
  }

  setLayout ({ pathname }) {
    console.log("---pathname>>>:", pathname);
    // 首页
    if (this.state.homeUrl.indexOf(pathname) > -1 || pathname == "/knowledge") {
      this.setState({
        crumbs: false
      })
    }
  }

  // 退出
  exitHandle = () => {
    sessionStorage.clear();
    global.$history.push("/login");
  }

  // 子级菜单
  getChildMenu = ({ menuList }) => {
    let menusData = menuList || [];
    if (sessionStorage.getItem("pKey")) {
      this.setState({
        openKeys: JSON.parse(sessionStorage.getItem("pKey")) || []
      });
    } else {
      menusData.map((temp, index) => {
        if (index == 0) {
          let openKeysList = [];
          openKeysList.push(temp.code);
          this.setState({
            openKeys: openKeysList || []
          });
        }
      })
    }

    sessionStorage.setItem("layoutType", "topSider");// 保存方式
    sessionStorage.setItem("menuChildList", JSON.stringify(menuList));// 子级菜单
    console.log("---首页menuList:", menuList);
    this.setState({
      layout: "topSider",
      menuChildList: menuList
    })
  }

  // 设置面包屑
  setBreadcrumb = ({ item }) => {
    let crumbs = true;// 显示面包屑
    let layout = this.state.layout;// 上下结构
    let menuChildList = this.state.menuChildList || [];// 子菜单
    // 首页
    if (item.mf_id == "00" || item.mf_id == "10") {
      crumbs = false;// 不显示显示面包屑
    } else {
      crumbs = true;// 显示面包屑
    }
    // 一级菜单
    if (item.mfpId == "0") {
      menuChildList = [];
      layout = "topBottom"
      this.setState({
        defaultSelectedKeyChild: []
      })
    } else {
      this.setState({
        defaultSelectedKeyChild: [item.code]
      })
    }
    sessionStorage.setItem("layoutType", layout);// 保存方式
    sessionStorage.setItem("menuChildList", JSON.stringify(menuChildList));// 子级菜单

    this.setState({
      crumbs,
      crumbsUrl: sessionStorage.getItem("namUrl"),
      menuChildList,
      layout
    })
  }

  // 跳转知识库
  jumpKnowledge = () => {
    console.log("跳转知识库：");
    sessionStorage.setItem("layoutType", "topBottom");
    this.setState({
      layout: "topBottom"
    })
    global.$history.push("/knowledge");
  }


  // 打开一个子菜单关闭别的子菜单
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find((key) => this.state.openKeys.indexOf(key) === -1);
    this.setState({
      openKeys: latestOpenKey ? [latestOpenKey] : []
    });
  }
  onCollapse = (collapsed) => {
    console.log("---collapsed>>>>:", collapsed);
    if (collapsed) {// 关闭
      $("#layout-left-menu").css({
        width: "80px"
      })
      $("#layout-content").css({
        width: "calc(100% - 80px)"
      })
    } else {// 展开
      $("#layout-left-menu").css({
        width: "200px"
      })
      $("#layout-content").css({
        width: "calc(100% - 200px)"
      })
    }
    this.setState({
      collapsed
    });
  };


  render () {
    let self = this;

    // 右侧个人中心
    const menu = (
      <Menu>
        <Menu.Item onClick={() => this.exitHandle()}>
          <span style={{ color: "red", fontSize: 14 }}>
            <Icon type="poweroff" style={{ marginRight: 5 }} />退出系统
          </span>
        </Menu.Item>
      </Menu>
    )

    let background = "#ffffff";
    if (this.props.location.pathname == "/work/workbench/list" || this.state.homeUrl.indexOf(this.props.location.pathname) > -1) {// 工作台
      background = "#F0F2F5";

    }
    let colloseWidth = "0px"
    if (this.state.menuChildList.length > 0) {
      colloseWidth = "200px"
    }
    let contentHeight = "calc(100vh - 50px - 35px - 16px)";
    if (!this.state.crumbs) {
      contentHeight = "calc(100vh - 65px)";
    }

    let layoutContent = (
      <div>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%", backgroundColor: "#0072E7" }}>
          <img className="logo-img-provice" src={proviceLogoSrc} />
          <div
            style={{
              maxWidth: "calc(100% - 450px)"
            }}
          >
            <Lmenu
              ref="Lmenu"
              type="top"
              menuAllList={this.state.menuAllList}
              getChildMenu={this.getChildMenu}
              setBreadcrumb={this.setBreadcrumb}
              pathname={this.state.pathname}
              openKeys={this.state.openKeys}
              inlineCollapsed={this.state.collapsed}
            />
            <div className="header-right">
              {/* <Icon type="question-circle" style={{ color: '#1890ff', marginRight: '20px', fontSize: '16px', cursor: 'pointer' }} onClick={() => this.jumpKnowledge()} />
              <Popover content={messageContent}>
                <span style={{ marginRight: '40px' }}>
                  <Badge count={9}>
                    <Icon type="bell" style={{ color: '#1890ff', marginRight: '10px', fontSize: '16px', cursor: 'pointer' }} />
                  </Badge>
                </span>
              </Popover> */}
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link anmini" style={{ position: "relative", color: "#FFFFFF" }}>
                  <Icon type="user" style={{ fontSize: 16, marginRight: 5 }} />{sessionStorage.getItem("realName") || "中心领导"}  <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>
        <div className="layout-content-gd">
          {this.state.menuChildList.length > 0
            ? <div className="layout-left-menu" id="layout-left-menu" style={{width: colloseWidth}}>
              <Sider style={{ marginTop: 64, padding: "0px 0px" }} width={200} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <Lmenu
                  ref="Lmenu"
                  type="left"
                  menuChildList={this.state.menuChildList}
                  getChildMenu={this.getChildMenu}
                  setBreadcrumb={this.setBreadcrumb}
                  pathname={this.state.pathname}
                  openKeys={this.state.openKeys}
                  onOpenChange={this.onOpenChange}
                  inlineCollapsed={this.state.collapsed}
                  defaultSelectedKeyChild={this.state.defaultSelectedKeyChild}
                />
              </Sider>
            </div>
            : ""}
          <div className="layout-content" id="layout-content" style={{width: `calc( 100% - ${colloseWidth})`}}>
            <Layout style={{ padding: "65px 0px 0px" }}>
              {
                this.state.crumbs
                  ? <div className="title-menu">
                    <p className="title-menu-text">
                      <span>{this.state.crumbsUrl}</span>
                    </p>
                  </div> : ""
              }
              <Content style={{ height: contentHeight, overflow: "auto", background }}>
                <div style={{ background, padding: 10 }} id="root">
                  {this.props.children}
                </div>
              </Content>
            </Layout>
          </div>
        </div>
      </div>
    )

    let urlParam = commonMethod.getUrlParams({ self });// 获取地址栏参数
    if (urlParam.webOpen == "1" || urlParam.external == "2" || !this.state.menuShow || urlParam.external == "3") {
      layoutContent = (
        <PageStyle1>{this.props.children}</PageStyle1>
      )
    }
    const title = <ModalDrag title="修改登陆密码"/>
    return (
      <div className="gd statistics">
        {layoutContent}
      </div>
    );
  }
}

export default Main;
