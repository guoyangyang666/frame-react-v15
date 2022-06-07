import React, { Component } from "react"; // react核心
import { Router, Route, Redirect, IndexRoute, hashHistory } from "react-router"; // 创建route所需
import $ from "jquery";
import layout from "@/component/layout/layout.jsx"; // 布局界面
import login from "../pages/login/login"; // 登录界面

import "../style/reset.less";// 引入公共css文件
import "../style/common.less";// 引入公共css文件

// import routesHome from '../pages/home/router.js';

function banBackSpace (e) {
  let ev = e || window.event;
  // 各种浏览器下获取事件对象
  let obj = ev.relatedTarget || ev.srcElement || ev.target || ev.currentTarget;
  // 按下Backspace键
  if (ev.keyCode == 8) {
    let tagName = obj.nodeName // 标签名称
    // 如果标签不是input或者textarea则阻止Backspace
    if (tagName != "INPUT" && tagName != "TEXTAREA") {
      return stopIt(ev);
    }
    let tagType = obj.type.toUpperCase();// 标签类型
    // input标签除了下面几种类型，全部阻止Backspace
    if (tagName == "INPUT" && (tagType != "TEXT" && tagType != "TEXTAREA" && tagType != "PASSWORD")) {
      return stopIt(ev);
    }
    // input或者textarea输入框如果不可编辑则阻止Backspace
    if ((tagName == "INPUT" || tagName == "TEXTAREA") && (obj.readOnly == true || obj.disabled == true)) {
      return stopIt(ev);
    }
  }
}
function stopIt (ev) {
  if (ev.preventDefault) {
    // preventDefault()方法阻止元素发生默认的行为
    ev.preventDefault();
  }
  if (ev.returnValue) {
    // IE浏览器下用window.event.returnValue = false;实现阻止元素发生默认的行为
    ev.returnValue = false;
  }
  return false;
}

$(function () {
  // 实现对字符码的截获，keypress中屏蔽了这些功能按键
  document.onkeypress = banBackSpace;
  // 对功能按键的获取
  document.onkeydown = banBackSpace;
})

/**
 * (路由根目录组件，显示当前符合条件的组件)
 *
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
  render () {
    // 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
    return (
      <div style={{}}>{this.props.children}</div>
    );
  }
}

// let routes = [];
const context = require.context("../pages", true, /\.js$/);
let routes = context.keys().reduce((rt, k) => {
  rt = rt.concat(context(k).default)
  return rt
}, [])


let allRoutes = routes.filter((item) => item !== undefined)
let commonRoutes = []

global.constantData = {};
// 页面切换，存储参数
global.pageStateList = {};// filter: {},// 筛选条件，即查询条件 state: {},// 存储的state

global.$history = hashHistory;
const RouteConfig = (
  <Router history={hashHistory}>
    <Route component={layout}>
      {
        allRoutes.map((item) => <Route path={item.path} key={`${item.path}_${item.key}`} name={item.name} getComponent={item.getComponent} />)
      }
    </Route>
    <Route path="/login" component={Roots}>
      // 所有的访问，都跳转到Roots
      <IndexRoute component={login} />
    </Route>
    <Route path="/login" component={login}></Route>
    <Redirect from="*" to="/login" />
  </Router>
);

export default RouteConfig;
