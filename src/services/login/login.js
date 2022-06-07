import { request } from "@/utils/request";
import config from "@/config/index";
import md5 from "crypto-js/md5";
import {
  setInfoSession,
  getInfoSession,
  toStringFunc
} from "@/utils/commonMethod/index.js";
import { Modal } from "antd";

// -----------------------登录相关接口--------------------------

// 获取验证码
export const getImagecodeMethod = ({ params, self }) => {
  console.log("---params:", params);
  let opt = {
    url: config.url + "/pms/ac/imagecode", // 接口
    self, // 调用实例
    data: params // 入参
  };
  return request({ opt });
};

// 登录
export const loginMethod = ({ params, self }) => {
  console.log("---params:", params);
  let passwordEn = md5(params.password).toString()
    .toLocaleUpperCase(); // 需要加密的密码
  params.password = passwordEn;
  let opt = {
    url: config.url + "/pms/ac/login", // 接口
    self, // 调用实例
    data: params // 入参
  };
  return request({ opt }).then((res) => {
    self.setState({ visible: false, loading: false });
    if (res.result) {
      let dataObj = res.data || {};
      sessionStorage.setItem("meddraFlag", "0"); // 默认是0，不是meddra用户
      // 储存session
      for (const key in dataObj) {
        sessionStorage.setItem(key, toStringFunc(dataObj[key]));
      }

      // orgCategory 改成了 orgType, direct_org改成了orgLevel
      sessionStorage.setItem("userToken", dataObj.token);

      // 获取用户信息等接口
      getUserAppMethod({ self }); // 获取用户应用
    } else {
      errorModal({ self, title: "登录失败", desc: res.desc });
    }
  });
};

// 获取用户应用
export const getUserAppMethod = ({ self }) => {
  let opt = {
    url: config.url + "/pms/ac/getUserApp", // 接口
    self, // 调用实例
    data: {
      loginName: sessionStorage.getItem("loginName")
    } // 入参
  };
  request({ opt }).then((res) => {
    console.log("----res123:", res);
    if (res.result) {
      let data = res.data || [];
      if (data.length == 0) {
        errorModal({ self, title: "获取用户应用失败, 请联系管理员", desc: "" });
        return;
      } else if (data.length == 1) {
        getUserMenuMethod({ self, appId: data[0].appId });
      } else {
        self.setState({
          selectSysVisible: true,
          appId: data
        });
      }
    } else {
      errorModal({ self, title: "获取用户应用失败", desc: res.desc });
    }
  });
};

// 获取菜单
export const getUserMenuMethod = ({ self, appId }) => {
  let opt = {
    url: config.url + "/pms/ac/getUserMenu", // 接口
    self, // 调用实例
    data: {
      loginName: sessionStorage.getItem("loginName"),
      appId: appId // getInfoSession({}).appId    ADR医疗机构报告 MAH持有人
    } // 入参
  };
  request({ opt }).then((res) => {
    console.log("----res123:", res);
    if (res.result) {
      sessionStorage.setItem("appId", appId);
      let menus = JSON.stringify(res.data);
      sessionStorage.setItem("menu", menus);
      // global.$history.push("/adr/main");
      getFirstPage({ menus: res.data || [], self });
    } else {
      errorModal({ self, title: "初始化菜单失败", desc: res.desc });
    }
  });
};

// 获取第一个菜单的第一个子节点进行展示
// eslint-disable-next-line consistent-this
function getFirstPage ({ menus, self }) {
  console.log("--menus---:", menus);
  if (menus.length > 0) {
    let firstMenus = menus[0]; // 获取第一个菜单
    if (firstMenus.path && !firstMenus.children) {
      sessionStorage.setItem("currentPageUrl", firstMenus.mfLinkUrl);
      sessionStorage.setItem("defaultSelectedKey", firstMenus.mfCode);
      global.$history.push(firstMenus.path);
      return;
    } else {
      getFirstPage({ menus: firstMenus.children, self });
    }
  } else {
    errorModal({ self, title: "请联系管理员分配菜单", desc: "" });
  }
}

// eslint-disable-next-line consistent-this
function errorModal ({ self, title, desc }) {
  self.getImage();
  self.setState({ visible: false, loading: false });
  global.userP = undefined;
  Modal.error({
    title: title,
    content: desc
  });
  return;
}
