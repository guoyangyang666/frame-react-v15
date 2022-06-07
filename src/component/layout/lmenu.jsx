import React, { Component } from "react";
import { Menu, Icon, Badge } from "antd";
import config from "@/config/index";
const SubMenu = Menu.SubMenu;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: config.iconFontUrl, // 在 iconfont.cn 上生成
  extraCommonProps: {}
});

// 公共菜单
export class Lmenu extends Component {
  constructor (props, context) {
    super(props, context); // 后才能用this获取实例化对象
    //
    this.state = {
      defaultSelectedKey: [sessionStorage.getItem("defaultSelectedKey")], // 首页  一级菜单
      openKeysList: [] // 二级默认展开
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount () {
    this.initMethod();// 进行初始化
  }

  // 初始化
  initMethod = () => {
    let openKeys = sessionStorage.getItem("openKeys");
    let openKeysList = [];
    if (openKeys) {
      openKeysList = JSON.parse(openKeys);
    }

    this.setState({
      openKeysList
    })
  }


  // 第一级菜单
  recursionFirst = (firstMenuList) => (
    firstMenuList.map((item) => {
      if (item.code == "adr-main") {// 首页
        return (
          <Menu.Item key={item.code} onClick={() => this.handleClick({ item })}>
            {/* <Badge count={9}> */}
            <a style={{ marginRight: "10px", lineHeight: "58px" }}>
              {item.img ? <IconFont type={item.img}></IconFont> : ""}
              {item.name}
            </a>
            {/* </Badge> */}

          </Menu.Item>
        )
      } else {
        return (
          <Menu.Item key={item.code} onClick={() => this.handleClick({ item })}>
            <a>
              {item.img ? <IconFont type={item.img}></IconFont> : ""}
              {item.name}
            </a>
          </Menu.Item>
        )
      }
    })
  )

  // 获得菜单子节点
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter((item) => item.name)
      .map((item, index) => this.getSubMenuOrItem(item, index))
      .filter((item) => item);
  }

  getSubMenuOrItem = (item, index) => {
    if (item.leaf == false) {
      const { name } = item;
      return (
        <SubMenu
          title={
            item.img ? (
              <span>
                <IconFont type={item.img} style={{ color: "#ffffff", fontSize: 16 }}></IconFont>
                <span title={name}>{name}</span>
              </span>
            ) : (
              <span title={name}>{name}</span>
            )
          }
          key={item.code}
        >
          {this.getNavMenuItems(item.children || [])}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.code} onClick={() => this.jumpClick({ menu: item })}   title={item.name}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  conversionPath = (path) => {
    if (path && path.indexOf("http") === 0) {
      return path;
    }
    return `/${path || ""}`.replace(/\/+/g, "/");
  };

  // 判断是否是http链接.返回 Link 或 a
  getMenuItemPath = (item) => {
    let flag = false;
    let count = "";
    // if (item.code == '1001') {// 个例报告
    //   flag = true;
    //   count = "8";
    // } else if (item.code == '1002') {// 群体报告
    //   flag = true;
    //   count = "1";
    // }
    if (flag) {
      return (
        <span>
          {item.img ? <IconFont type={item.img}></IconFont> : ""}
          <Badge count={count}>
            <span style={{ marginRight: "10px" }}>{item.name}</span>
          </Badge>
        </span>
      )
    } else {
      return (
        <span>
          {item.img ? <IconFont type={item.img}></IconFont> : ""}
          <span>{item.name}</span>
        </span>
      )
    }
  }

  jumpClick = ({ menu }) => {
    let self = this;
    // 清除数据
    global.pageStateList = {};
    const itemPath = this.conversionPath(menu.path);
    // 是否是外部菜单
    if (/^https?:\/\//.test(itemPath) || /^http?:\/\//.test(itemPath)) {
      let jumpUrl = menu.path;
      if (config.develop && menu.mf_id == "80") {// 自助报告
        jumpUrl = `${jumpUrl}?loginname=${sessionStorage.getItem("loginName")}&token=${sessionStorage.getItem("userToken")}`
      }
      window.open(jumpUrl);
      return;
    }
    if (menu.path.indexOf("openBrowser") > -1) {// 打开新页签
      let pageUrl = menu.path;
      if (pageUrl.indexOf("?") > -1) {
        pageUrl = pageUrl + "&external=1"
      } else {
        pageUrl = pageUrl + "?external=1"
      }
      window.open(`/#${pageUrl}`);
      return;
    }
    // 一级菜单
    let namUrl = menu.name;
    let key = menu.code;
    if (menu.path == "/adr/maint") {// 首页
      namUrl = "首页";
    }
    console.log("---menu:", menu);
    sessionStorage.setItem("namUrl", namUrl);
    sessionStorage.setItem("currentPageUrl", menu.path);
    if (menu.pid == "0") {// 一级菜单
      sessionStorage.setItem("defaultSelectedKey", menu.code);
      sessionStorage.setItem("currentPageKey", "");
    } else {
      sessionStorage.setItem("currentPageKey", menu.code);
    }

    this.props.setBreadcrumb({ item: menu });// 设置面包屑
    global.$history.push(menu.path);
  }

  handleClick = ({ item, first }) => {
    console.log("---item:", item);
    // 一级菜单,并且有二级菜单
    if (item.pid == "0" && item.leaf == false) {
      let oldUrl = sessionStorage.getItem("currentPageUrl");
      item = this.getLastMenu({ menuList: item, path: item.path });
      // if (first) {// 刷新，第一次访问
      //   if (oldUrl) {
      //     if (oldUrl == item.path) {
      //       this.jumpClick({ menu: item })
      //     }
      //   } else {
      //     if (item.path) {// 有链接
      //       this.jumpClick({ menu: item })
      //     }
      //   }
      // } else {
      //   if (item.path) {// 有链接
      //     this.jumpClick({ menu: item })
      //   }
      // }
      this.props.getChildMenu({ menuList: item.children || [] });
    } else {
      // 一级
      if (item.pid == "0") {
        this.jumpClick({ menu: item })
      }
    }
  }

  // 如果一级菜单子节点不包含一级菜单的path,就默认跳转到末级节点的第一个菜单
  getLastMenu = ({ menuList, path }) => {
    let menuJson = JSON.stringify(menuList.children || []);
    if (menuJson.indexOf(path) > -1) {
      return menuList;
    } else {
      let lists = {};
      this.getFirstLastMenuUrl({
        menuList,
        func: ({ path }) => {
          lists = menuList;
          lists.path = path;
        }
      });
      return lists;
    }
  }

  getFirstLastMenuUrl = ({ menuList, func }) => {
    if (menuList.path && menuList.children.length == 0) {
      func({ path: menuList.path });
    } else {
      this.getFirstLastMenuUrl({ menuList: menuList.children[0], func });
    }
    return null;
  }

  // 点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁
  onOpenChange = (openKeys) => {
    const { menuChildList } = this.props;
    let rootSubmenuKeys = menuChildList.map((item) => item.code);
    const latestOpenKey = openKeys.find((key) => this.state.openKeysList.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      sessionStorage.setItem("openKeys", JSON.stringify(openKeys));// 子级菜单
      this.setState({ openKeysList: openKeys });
    } else {
      let keys = latestOpenKey ? [latestOpenKey] : [];
      sessionStorage.setItem("openKeys", JSON.stringify(keys));// 子级菜单
      this.setState({
        openKeysList: keys
      });
    }
  };

  render () {
    let contentRender = "";
    // 头部
    if (this.props.type == "top") {
      contentRender = (
        <div className="ant-pro-top-nav-header-main wide topMenu">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={this.state.defaultSelectedKey}
            style={{ lineHeight: "64px" }}
          >
            {
              this.recursionFirst(this.props.menuAllList)
            }
          </Menu>
        </div>
      )
    }
    // 左侧菜单
    if (this.props.type == "left") {
      contentRender = (
        <div className="leftMenu">
          <Menu
            theme="dark"
            mode="inline"
            onOpenChange={this.onOpenChange}
            openKeys={this.state.openKeysList}
            selectedKeys={this.props.defaultSelectedKeyChild}
          >
            {this.getNavMenuItems(this.props.menuChildList)}
          </Menu>
        </div>
      )
    }
    return (
      <div>{contentRender}</div>
    )
  }
}
