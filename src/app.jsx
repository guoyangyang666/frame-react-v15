
import React from "react"; // react核心，用到jsx的地方，都需要这个
// babel本身只能转换ES6语法，但ES6新增的Map、Set、Generator等新功能不会转换，所以需要此插件

import ReactDOM, { render } from "react-dom"; // 渲染组件时需要
import { Provider } from "react-redux"; // react和redux连接的桥梁，就是这个Provider
import store from "./store/store.jsx"; // 引入sotre
import "babel-polyfill";
import route from "./router/route"; // 所有定义好的路由

import { Pagination, LocaleProvider, ConfigProvider } from "antd";
// 公共样式
import "./style/common.less";

// import zhCN from 'antd/lib/locale-provider/zh_CN';
import zhCN from "antd/es/locale/zh_CN";

global.$codeTable = [];// 存放码表


// import 'babel-polyfill';


store.subscribe(() => { // 监听state变化
  // console.log(store.getState());
});

// 开发环境
if (process.env.NODE_ENV !== "development") {
  console.log = function () {}
}

// 创建根组件
render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store} style={{
      overflow: "inherit"
    }}>
      {route}
    </Provider>
  </ConfigProvider>,
  document.body.appendChild(document.createElement("div"))
);
