import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import { Modal, Message } from 'antd';
import {getUrlParams} from '@/utils/commonMethod/index.js'

// 封装ajax+promise
export const request = ({ opt }) => new Promise((resovle, reject) => {
  console.log('---入参>>', opt)
  let contentType = 'application/x-www-form-urlencoded;charset=utf-8';
  let processData = true;
  let traditional = opt.traditional || false;// 数组：指定参数序列化时，不做深度序列化

  let params = opt.data || {};
  if (opt.isFormData) {// 带有附件
    processData = false;
    contentType = false;
    const formData = new FormData();
    for (let key in params) {
      let obj = params[key];
      if (obj instanceof Array) {// 数组
        obj.forEach((item, index) => {
          formData.append(`${key}`, item);
        });
      } else {
        if (params[key] == 0 || params[key] == '0') {
          formData.append(`${key}`, params[key]);
        } else if (params[key] != '' && params[key] != undefined && params[key] != null) {
          formData.append(`${key}`, params[key]);
        }
      }
    }
    params = formData
  } else {
    let newParames = {};
    for (let key in params) {
      if (params[key] === 0 || params[key] === '0') {
        newParames[key] = params[key];
      } else if (params[key] != '' && params[key] != undefined && params[key] != null) {
        newParames[key] = params[key];
      }

    }
    params = newParames
  }
  console.log('----params入参2>>>:', params)

  if (sessionStorage.getItem('userToken')) {
    opt.headers = {
      ...opt.headers,
      'Authorization': sessionStorage.getItem('userToken')
    }
  }
  if (sessionStorage.getItem('loginName')) {
    opt.headers = {
      ...opt.headers,
      'uid': sessionStorage.getItem('loginName')
    }
  }

  let url = opt.url;
  if (process.env.NODE_ENV == 'development') {
    url =  `/api${url}`;
  }
  console.log('----url:', url)

  $.ajax({
    type: opt.type || 'POST', // 默认post请求
    async: opt.async || true, // 默认异步
    url: url, // 接口地址
    dataType: opt.dataType || 'json', // 设置服务器接收的数据格式
    // 允许携带证书
    xhrFields: {
      withCredentials: false
    },
    crossDomain: true, // 允许跨域
    contentType,
    processData,
    traditional,
    headers: {
      ...opt.headers
    },
    data: params, // 参数
    success: (res, textStatus, request) => {
      console.log('----res:', res);
      errorHandle({jqXHR: request, func: (result) => {
        if (result) {
          resovle(res);
        }
      }});// 错误处理
    },
    error: (jqXHR, textStatus, errorThrown) => {
      console.log('---报错了')
      let res = {result: false, desc: '调用服务报错'}
      // reject(res);
      if (opt.self) {// 存在调用实例
        opt.self.setState({ loading: false });// 将调用实例里的loading状态改为false
      }

      // 调用接口异常
      Modal.destroyAll();// 先销毁其他弹框提示
      Modal.error({
        title: '调用服务异常'
      })
    }
  })
})

// 下载二进制流附件
export const downBlobFileRequest = ({ opt }) => new Promise((resovle, reject) => {
  let params = opt.data || {};
  if (sessionStorage.getItem('userToken')) {
    opt.headers = {
      ...opt.headers,
      'Authorization': sessionStorage.getItem('userToken')
    }
  }
  if (sessionStorage.getItem('loginName')) {
    opt.headers = {
      ...opt.headers,
      'uid': sessionStorage.getItem('loginName')
    }
  }

  let url = opt.url;
  if (process.env.NODE_ENV == 'development') {
    url =  `/api${url}`;
  }

  $.ajax({
    url: url,
    type: 'POST',
    headers: {
      ...opt.headers
    },
    xhrFields: {
      responseType: 'blob'
    },
    data: params,
    success: function (res, textStatus, request) {
      let att = request.getResponseHeader('content-disposition');
      let obj = {};
      if (att) {
        let list = att.split(';');
        list.forEach((item) => {
          item = item.replace(/\s*/g, '');
          obj[item.split('=')[0]] = item.split('=')[1];
        });
      }
      // 处理返回的文件流
      const blob = res;
      if (blob && blob.size === 0) {
        Modal.error({
          title: '内容为空，无法下载！'
        })
        resovle(res);
        return;
      }
      if (!obj.filename) {
        Modal.error({
          title: '文件类型未知，无法下载！'
        })
        resovle(res);
        return;
      }
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = decodeURIComponent(obj.filename);
      document.body.appendChild(link);
      link.click();
      window.setTimeout(function () {
        URL.revokeObjectURL(blob);
        document.body.removeChild(link);
      }, 0);
      resovle(res);
    },
    error: function () {
      let res = {result: false, desc: '下载附件失败'}
      reject(res);
      // 调用接口异常
      Modal.destroyAll();// 先销毁其他弹框提示
      Modal.error({
        title: '下载失败'
      })
    }
  });
})

// 错误处理
function errorHandle ({jqXHR, func}) {
  console.log('处理>>', jqXHR);
  let sessionStatus = jqXHR.getResponseHeader('sessionstatus');
  console.log('处理sessionStatus>>', sessionStatus);
  // seesion失效
  if (sessionStatus == 'timeout') {
    Modal.destroyAll();// 先销毁其他弹框提示
    Modal.info({
      title: '过期, 请重新登录.',
      okText: '立即重新登录',
      content: (
        <div>
          <p>5秒后自动跳转至登录页面</p>
        </div>
      ),
      onOk () {
        backFunc();
      }
    });
    setTimeout(() => {
      backFunc();
    }, 5000)
    func(false);
  } else {
    func(true);
  }
}

function backFunc () {
  Modal.destroyAll();// 先销毁其他弹框提示
  let allObj = getUrlParams();
  if (allObj.webOpen == '1') {// 新打开的窗口
    window.open('about:blank', '_self').close();
  } else {
    global.$history.push('/');
  }
}
