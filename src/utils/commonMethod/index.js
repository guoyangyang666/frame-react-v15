import React from "react";
import  * as staticData from "./static.js";// 引用静态数据
import $ from "jquery";
import moment from "moment";
import { Modal, Tooltip } from "antd";
import crypto from "crypto";
import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";
import { Resizable } from "react-resizable";
// --------------------维护公共方法
/**
 * 分页参数
 * @param {*} self 实例化对象
 * @returns {*} 返回
 */
export const getPaginationProps = ({ self }) => {
  let total = self.state.total || 0;// 总条数
  let pageSize = self.state.pageSize || staticData.paginationProps.pageSize;// 默认的每页条数
  let current = self.state.currentPage || 1;// 当前页数
  let paginationProps = {
    size: "middle", // 大小
    total, // 总条数
    pageSize, // 默认的每页条数
    current, // 当前页数
    showTotal: (total, range) => `共有${total}条`, // 用于显示数据总量和当前数据顺序
    showSizeChanger: true, // 是否可以改变 pageSize
    showQuickJumper: true, // 是否可以快速跳转至某页
    hideOnSinglePage: false, // 只有一页时是否隐藏分页器
    onChange: (page, pageSize) => {// 页码改变的回调，参数是改变后的页码及每页条数
      self.setState({ currentPage: page, pageSize }, () => {
        if (self.changePagination) {
          self.changePagination({});// 刷新数据
        }
      })
    },
    onShowSizeChange: (current, size) => {// pageSize 变化的回调
      self.setState({ currentPage: 1, pageSize: size }, () => {
        if (self.changePagination) {
          self.changePagination({});// 刷新数据
        }
      })
    }
  };
  return paginationProps;
}

/**
 * 根据常量编码获取常量对应的汉字
 * @param {*} source 常量编码
 * @param {*} target 常量列表
 * @param {*} key 默认key
 * @param {*} value 默认value
 * @returns {*} 返回
 */
export const getTargetText = ({ source, target, key, value }) => {
  key = key || "key" || "id";
  value = value || "value" || "name";
  if (source && target && target.length > 0) {
    let text = target.filter((item) => item[key] == source);

    if (text != "" && text) {
      return text[0][value];
    }
  }

  return "";
}
export const getTargetTextIsArray = ({ source, target, key, value }) => {
  key = key || "id";
  value = value || "name";
  let content = "";
  if (source && target && target.length > 0) {
    source.forEach((obj, index) => {
      let end = ", ";
      if (index + 1 == source.length) {
        end = "";
      }
      content =  content + getTargetText({source: obj, target, key, value}) + end;
    });
  }

  return content;
}

/**
 * 根据常量编码获取常量对应的汉字
 * @param {*} source 常量编码
 * @param {*} target 常量列表
 * @param {*} id id
 * @param {*} name name
 * @returns {*} 返回
 */
export const getTargetTextByConst = ({ source, target, id, name }) => {
  id = id || "id";
  name = name || "name";
  if (source && target && target.length > 0) {
    let text = target.filter((item) => item[id] == source);
    if (text.length > 0) {
      return text[0][name];
    }
  }

  return "";
}

/**
 * 错误原因
 * @param {*} resData 接口返回的错误原因
 * @returns {*} 返回
 */
export const getJsonDesc = ({ resData }) => {
  let json1 = JSON.parse(resData);
  let json2 = json1.data;
  let string = "";
  let count = 1;
  if (json2) {
    for (let k of Object.keys(json2)) {
      string = string + count + "." + json2[k] + ";";
      count = count + 1;
    }
  }

  return string;
}

/**
 * 根据div的id，动态设置该div的高度
 * @param {*} id div的id
 * @param {*} type 类型：最低高度:min-height;高度(默认):height
 * @param {*} inside true:内部，false默认外部
 * @returns {*} 返回
 */
export const setPageHeight = ({ id, type, inside }) => {
  if (!$(id)) {
    return;
  }
  setTimeout(function () {
    let h = type || "height";
    let insideH = inside ? "15" : "0";
    if (!$(id)) {
      return;
    }

    if ($(id).offset()) {
      let topH = $(id).offset().top;// 当前div距离顶部距离
      console.log("div距离顶部距离：", topH);

      $(id).css({
        [h]: `calc(100vh - ${topH}px - 10px - ${insideH}px)`,
        "overflow": "auto"
      })
    }
  }, 200);
}


/**
* 中国标注日期转字符串日期（YYYY-MM-DD）时间格式转日期（date
* @param {*} value 要修改的数据
* @param {*} type 类型：month, year, date-slash
* @returns {*} 返回
*/
export const formatDateTime = ({ value, type }) => {
  if (value == "" || value == undefined || value == null) {
    return;
  }
  let date = new Date(value);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? ("0" + m) : m;
  let d = date.getDate();
  d = d < 10 ? ("0" + d) : d;
  let h = date.getHours();
  h = h < 10 ? ("0" + h) : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? ("0" + minute) : minute;
  second = second < 10 ? ("0" + second) : second;
  if (type == "year") {
    return y
  }
  if (type == "month") {
    return y + "-" + m
  }
  if (type == "date-slash") {// 年月日斜杠
    return y + "/" + m + "/" + d;
  }
  if (type == "minute") {
    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
  }
  return y + "-" + m + "-" + d; // +' '+h+':'+minute+':'+second
}

/**
 * 获得两个日期之间相差的天数
 * @param {*} param0 startDate:开始日期 endDate：结束日期 startDateDetail：1上午，2下午 endDateDetail：1上午，2下午
 * @returns {*} 返回
 */
export const getTwoDaysCount = ({ startDate, endDate, startDateDetail, endDateDetail }) => {
  let date1Str = startDate.split("-");// 将日期字符串分隔为数组,数组元素分别为年.月.日
  // 根据年 . 月 . 日的值创建Date对象
  let date1Obj = new Date(date1Str[0], (date1Str[1] - 1), date1Str[2]);
  let date2Str = endDate.split("-");
  let date2Obj = new Date(date2Str[0], (date2Str[1] - 1), date2Str[2]);
  let t1 = date1Obj.getTime();
  let t2 = date2Obj.getTime();
  let dateTime = 1000 * 60 * 60 * 24; // 每一天的毫秒数
  let minusDays = Math.floor(((t2 - t1) / dateTime));// 计算出两个日期的天数差
  let days = Math.abs(minusDays);// 取绝对值
  let endNum = parseInt(endDateDetail);
  let startNum = parseInt(startDateDetail);
  if (days == 0) {
    if (endNum - startNum == 1) {
      days = days + 1;
    } else {
      days = days + 0.5;
    }
  } else {
    if (endNum - startNum == 1) {
      days = days + 1;
    } else {
      days = days + 0.5;
    }
  }

  return JSON.stringify(days);
}

/**
 * 获取当前日期
 * @param {*} type 类型
 * @param {*} AddDayCount 增加
 * @returns {*} 返回
 */
export const getCurrentDate = ({ type, AddDayCount }) => {
  let now = new Date();
  if (AddDayCount) {
    now.setDate(now.getDate() + AddDayCount);   // 获取AddDayCount天后的日期
  }
  let year = now.getFullYear(); // 得到年份
  let month = now.getMonth();// 得到月份
  let date = now.getDate();// 得到日期
  let day = now.getDay();// 得到周几
  let hour = now.getHours();// 得到小时
  let minu = now.getMinutes();// 得到分钟
  let sec = now.getSeconds();// 得到秒
  month = month + 1;
  if (month < 10) month = "0" + month;
  if (date < 10) date = "0" + date;
  if (hour < 10) hour = "0" + hour;
  if (minu < 10) minu = "0" + minu;
  if (sec < 10) sec = "0" + sec;
  let time = "";
  // 精确到天
  if (type == "1") {
    time = year + "-" + month + "-" + date;
  } else if (type == "2") {// 精确到分
    time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
  } else if (type == "year") {
    time = year;
  } else if (type == "month") {
    time = year + "-" + month;
  } else {
    time = year + "-" + month + "-" + date;

  }
  return time;
}

/**
 * 获取本日0，本周1，本月2，本季度3,本半年度4,本年度5,上周10,上月6,上季度7,上半年度8,上一年度9
 * 当前往前一个月11，往前n个月  2020-12-01日至今日13
 * @returns {*} 返回
 */
export const getRangeTime = ({ timeFlag, n, currentDay }) => {
  console.log("测试：", timeFlag);
  let arr = new Array();
  let date = new Date();
  if (currentDay) {
    date = new Date(currentDay);
  }
  console.log("测试date：", date);
  if (timeFlag == 0) {
    arr[0] = getFormatTime(date); arr[1] = getFormatTime(date);
  } else if (timeFlag == 1) {
    arr[0] = getFormatTime(date);
    var weekday = [7, 0, 1, 2, 3, 4, 5, 6];
    var weekNum = date.getDay();
    var d2 = date.getTime() - (weekday[weekNum] * 24 * 60 * 60 * 1000);
    arr[1] = getFormatTime(d2);
  } else if (timeFlag == 2) {
    arr[0] = getFormatTime(date);
    let monthNum = date.getDate();
    var d2 = date.getTime() - ((monthNum - 1) * 24 * 60 * 60 * 1000);
    arr[1] = getFormatTime(d2);
  } else if (timeFlag == 3 || timeFlag == 4 || timeFlag == 5) {
    arr[0] = getFormatTime(date);
    var month = date.getMonth();
    var flag = 3;
    if (timeFlag == 4) flag = 6;
    else if (timeFlag == 5) flag = 12;

    var quarter = (Math.floor((month / flag)) + 1);
    var date2 = new Date();

    date2.setMonth((quarter - 1) * flag, 1);
    date2.setDate(1);


    arr[1] = getFormatTime(date2);
  } else if (timeFlag == 6) {
    var month = date.getMonth() - 1;
    date.setMonth(month, 1);
    arr[1] = getFormatTime(date);
    var date2 = new Date();
    date2.setDate(0);
    arr[0] = getFormatTime(date2);
  } else if (timeFlag == 7 || timeFlag == 8 || timeFlag == 9) {
    var month = date.getMonth();
    var flag = 3;
    if (timeFlag == 8) flag = 6;
    else if (timeFlag == 9) flag = 12;
    var quarter = (Math.floor((month / flag)) + 1);

    date.setMonth((quarter - 1) * flag - flag, 1);
    date.setDate(1);
    arr[1] = getFormatTime(date);
    var date2 = new Date();
    date2.setMonth((quarter - 1) * flag, 1);
    date2.setDate(0);
    arr[0] = getFormatTime(date2);
  } else if (timeFlag == 10) {
    arr[0] = getFormatTime(date);
    var weekday = [0, 1, 2, 3, 4, 5, 6];
    var weekNum = date.getDay();
    var d2 = date.getTime() - (weekday[weekNum] * 24 * 60 * 60 * 1000);
    let d1 = date.getTime() - ((weekday[weekNum] + 6) * 24 * 60 * 60 * 1000);
    arr[0] = getFormatTime(d2);
    arr[1] = getFormatTime(d1);
  } else if (timeFlag == 11) {

    arr[0] = getFormatTime(date);
    arr[1] = getDate(30);
  } else if (timeFlag == 12) {// 获取当前日期的第n个月
    arr[0] = getFormatTime(date);
    let day = date.getDate();
    date.setMonth(date.getMonth() - n);
    let year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" + month : month);
    day = (day < 10 ? "0" + day : day);
    let sDate = (year.toString() + "-" + month.toString() + "-" + day);
    arr[1] = sDate;
  } else if (timeFlag == 13) { // 获取自2020-12-01 日至今
    arr[1] = "2020-12-01";
    arr[0] = getFormatTime(date); // 今日
  }
  return arr;

}

export const getYearBetween = ({start, end}) => {
  let result = [];
  let startTime = new Date(start);
  let endTime = new Date(end);
  while (endTime - startTime >= 0) {
    let year = startTime.getFullYear();
    result.push(JSON.stringify(year));
    startTime.setFullYear(startTime.getFullYear() + 1);
  }
  return result;
}

// 获取当前时间前7天的日期
export const getDate = (date) => {
  date = date || 30;
  let timer = new Date(new Date() - date * 24 * 3600 * 1000);

  let month = timer.getMonth() + 1;
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  let d = timer.getDate();
  if (d >= 1 && d <= 9) {
    d = "0" + d;
  }
  timer = timer.getFullYear() + "-" + month + "-" + d
  return timer;
}
export const getFormatTime = (NZRTime) => {

  /* 例时间类型:Fri Dec 12 1980 00:00:00 GMT+0800*/
  let date = new Date(NZRTime);
  let month = date.getMonth() + 1;
  if ((month + "").length == 1) month = "0" + month;
  let day = date.getDate();
  if ((day + "").length == 1) day = "0" + day;
  return date.getFullYear() + "-" + month + "-" + day;
}

/**
 * 获取多少天前的日期
 * day  天数
 * value 从哪一天开始往前算
 * @returns {*} 返回
 */
export const getNewDay = ({ day, value }) => {
  let date = day || 30;
  let timer = new Date(new Date(value) - date * 24 * 3600 * 1000);

  let month = timer.getMonth() + 1;
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  let d = timer.getDate();
  if (d >= 1 && d <= 9) {
    d = "0" + d;
  }
  timer = timer.getFullYear() + "-" + month + "-" + d;
  return timer;
}

/**
 * 赋值时间（2020-6-6）给日期格式
 * @param {*} type 类型: 默认是单个日期,range: 日期范围
 * @param {*} startDate 开始时间
 * @param {*} endDate 结束时间
 * @returns {*} 返回
 */
export const setDatePicker = ({ type, startDate, endDate }) => {
  if (type == "range") {
    if (startDate && endDate) {
      return [moment(startDate, "YYYY-MM-DD"), moment(endDate, "YYYY-MM-DD")];
    } else {
      return [undefined, undefined];
    }
    return;
  }
  if (startDate) {
    return moment(startDate, "YYYY-MM-DD");
  } else {
    return undefined;
  }
}

/**
 * 多行提示错误
 * @returns {*} 返回
 */
export const modalErrorFunc = ({ res }) => {
  let messageArr = "";
  if (res.data) {
    if (Array.isArray(res.data)) {
      res.data.forEach((item, index) => {
        if (messageArr == "") {
          messageArr = <div>{item}</div>
        } else {
          messageArr = <div>{messageArr}<br />{item}</div>
        }
      });
    }
  }
  Modal.error({
    title: res.desc,
    content: messageArr
  });
}


export const getChildValue = ({ dataList, value }) => {
  let category = [];
  for (let i = 0; i < dataList.length; i++) {
    var index = i;
    if (dataList[i].value == value) {
      category.push(dataList[i].value);
      break                                                 // 判断第一层有没有一样的
    } else {
      if (dataList[i].children) {
        var arr = dataList[i].children;
        for (let t = 0; t < arr.length; t++) {
          var index2 = t;
          if (arr[t].value == value) {
            let data1 = dataList[index].value
            category = [data1, arr[t].value]
            break
          } else {
            if (arr[t].children) {
              let arr2 = arr[t].children
              arr2.find((item, p) => {
                if (item.value == value) {
                  category = [dataList[index].value, arr[index2].value, item.value]
                }
              })
            }
          }
        }
      }
    }
  }
  return category;
}

// 获取地址栏参数
export const getUrlParams = (paramsObj) => {
  paramsObj = paramsObj || {};
  let self = paramsObj.self;
  let url = window.location.href;
  console.log("-----window.location:", window.location);
  let urlList = url.split("?");
  let params = {};
  let obj = urlList[1];
  if (obj) {
    // 获取参数对象
    let list = obj.split("&");
    for (let i = 0; i < list.length; i++) {
      if (list[i].split("=")[0] !== "_k") {
        params[list[i].split("=")[0]] = list[i].split("=")[1]
      }
    }
  }
  if (urlList.length == 3) {
    if (params.pageUrl) {
      let obj = urlList[2];
      let stringParams = obj.split("&_k")[0];
      if (stringParams) {
        params.pageUrl = params.pageUrl + "?" + stringParams + "&" + "external=" + params.external;
      } else {
        params.pageUrl = params.pageUrl + "?" + "external=" + params.external;
      }
    }
  }

  return params;
}

// 获取地址栏参数,字符串
export const getStringParams = (paramsObj) => {
  let type = "?";
  if (paramsObj) {
    if (paramsObj.type) {
      type = paramsObj.type
    }
  }
  let url = window.location.href;
  console.log("-----window.location:", window.location);
  let obj = url.split(type)[1];
  let stringParams = "";
  if (obj) {
    // 获取url
    if (obj.indexOf("&_k") > -1) {
      stringParams = obj.split("&_k")[0];
    } else {
      if (obj.indexOf("_k") > -1) {
        stringParams = obj.split("_k")[0];
      }
    }
  }

  return stringParams;
}

// 获取湾区九市地址栏参数
export const getUrlParamsbyWqus = ({ self, type }) => {
  let urlParam = getUrlParams({ self }) || {};
  let params = {};
  if (type == "list" && urlParam.dataSource) { // 列表
    params["isNineCity"] = urlParam.dataSource;
  } else if (type == "form" && urlParam.dataSource) { // form表单
    params["dataSource"] = urlParam.dataSource;
  }
  return params;
}

/**
 * 将对象转成url后面的字符串
 * @param {Object} paramsObj 参数
 * @returns {String} 返回
 */
export const objToUrlFunc = (paramsObj) => {
  let dataObj = paramsObj.dataObj || {};
  let tempObj = "";
  for (const obj in dataObj) {
    tempObj = tempObj + obj + "=" + dataObj[obj] + "&";
  }
  return tempObj.slice(0, -1);
}

// 获取地址栏参数且者路由的参数
export const getParamsFunc = ({self}) => {
  let obj = {};
  let state = {};
  if (self) {
    state = self.props.location.state || {};
  }
  let queryObj = getUrlParams();
  obj = { ...state, ...queryObj };
  console.log("---obj:", obj);
  return obj;
}

// 防抖
export const deBounce = (fn, wait = 1000) => {
  let timeOut = null;
  return function () {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  }
}

// 转base64
export const toBase64Func = ({value}) => Base64.stringify(Utf8.parse(value))

/**
 * 验证文件是否是自定义格式（如['.doc','.pdf']）和大小
 * @param {File} file 上传的附件
 * @param {Array} formatRequire 格式限制，['.doc','.docx']
 * @param {Number} sizeLimit 大小限制，50
 * @returns {*} 返回
 */
export const fileVerifyFunc = ({file, formatRequire, sizeLimit}) => {
  let formatList = [
    {
      id: ".doc",
      typeName: "application/msword"
    },
    {
      id: ".docx",
      typeName: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    },
    {
      id: ".pdf",
      typeName: "application/pdf"
    },
    {
      id: ".xls",
      typeName: "application/vnd.ms-excel"
    },
    {
      id: ".xlsx",
      typeName: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    {
      id: ".jpg",
      typeName: "image/jpeg"
    },

    {
      id: ".jpeg",
      typeName: "image/jpeg"
    },
    {
      id: ".rar",
      typeName: "rc-upload-1604566182130-79"
    },
    {
      id: ".bmp",
      typeName: "image/bmp"
    },
    {
      id: ".gif",
      typeName: "image/gif"
    },
    {
      id: ".png",
      typeName: "image/png"
    },
    {
      id: ".csv",
      typeName: "application/vnd.ms-excel"
    },
    {
      id: ".xml",
      typeName: "text/xml"
    },
    {
      id: ".txt",
      typeName: "text/plain"
    }
  ]
  console.log("---file:", file);
  let result = formatList.filter((item) => item.typeName === file.type)
  console.log(result.length);
  // 获取文件(如：application/pdf)对应的id名(.pdf)
  if (result.length > 0) {
    let resType = result[0].id
    if (formatRequire.indexOf(resType) === -1) {
      Modal.error({
        title: `请上传格式为${formatRequire.join(" ")}的附件`
      });
      return false;
    }
  } else {
    Modal.error({
      title: `请上传格式为${formatRequire.join(" ")}的附件`
    });
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < sizeLimit;
  if (!isLt2M) {
    Modal.error({
      title: `请上传不超过${sizeLimit}M的附件`
    });
    return false;
  }

  if (file.size == 0) {
    Modal.error({
      title: `${file.name}是一个空文件，无法上传，请重新选择`
    });
    return false;
  }
  return true;
}

export const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export const components = {
  header: {
    cell: ResizableTitle
  }
};

export const handleResize = ({width, index, columns}) => {
  const res = columns.map((item, i) => {
    if (i == index) {
      item.width = width
    }
    return item
  })

  return res
};

/**
 * 对象数组中按某个字段进行排序
 * @param {*} orderType 排序方式：'desc':'降序'; 'asc':'升序'
 * @param {*} sortCode 排序字段
 * @returns {*} 返回
 */
export const sortListByCode = ({ orderType, sortCode}) => {
  let ordAlpah = (orderType == "asc") ? ">" : "<";
  let sortFun = new Function("a", "b", "return a." + sortCode + ordAlpah + "b." + sortCode + "?1:-1");
  return sortFun;
};

export const formatJson = (filterVal, jsonData) =>  jsonData.map((v) => filterVal.map((j) => {
  if (j === "timestamp") {
    return parseTime(v[j])
  } else {
    return v[j]
  }
}))
// 修改日志查看详情显示原始数据
export const differ = ({ name, hisName, isHis }) => {
  console.log("----isHis:", isHis);
  if (isHis && name != hisName) {
    let str = <div style={{backgroundColor: "#FFFFFF", color: "black", padding: "8px"}}>{`原始数据：${hisName}`}</div>
    return (
      <Tooltip title={str}>
        <span style={{padding: "5px", border: "1px solid red"}}>{name || ""}</span>
      </Tooltip>)
  } else {
    console.log("----name:", name)
    return (<span>{name || ""}</span>);
  }
}

// 转字符串
export const toStringFunc = (str) => {
  if (str == 0) {
    return str.toString();
  }
  if (str == undefined || str == "" || str == null) {
    return ""
  }
  return str.toString();
}

/**
 * 页面跳转
 * @param {Boolean} browser 默认true在新页签中打开
 * @param {String} url 跳转路径
 * @param {Object} dataObj 跳转参数
 * @param {String} freshName 刷新的方法名
 * @param {Function} freshFunc 刷新的方法
 * @returns {Object} 增强扩展性，返回对象
 */
export const globalJump = ({browser = true, url, page, dataObj, freshName, freshFunc }) => {
  if (browser) {// 打开新页签
    if (freshName) {
      window[freshName] = freshFunc; // 刷新时用
    }
    dataObj = {...dataObj, webOpen: "1"};
    let str = objToUrlFunc({dataObj});
    console.log("----str:", str)
    if (str) {
      url = url + "?" + str;
    }
    window.open(`/#${url}`, "_blank").focus();
    // window.open(`/#/common/jumpPage?url=${url}`, '_blank').focus();
  } else {// 正常路由跳转
    global.$history.push({
      pathname: url,
      state: dataObj
    });
  }
}

/**
 * 关闭窗口
 * @param {Function} freshName 刷新的方法名
 * @returns {*} 返回
 */
export const closeWindow = ({ freshName, url, dataObj}) => {
  console.log("----dataObj>>>:", dataObj)
  let allObj = getParamsFunc({})
  if (allObj.webOpen == "1") {// 新打开的窗口
    // 刷新父页面数据
    if (window.opener && !window.opener.closed) {
      try {
        if (freshName) {
          window.opener.parent.frames[freshName].call();
        }
      } catch (err) {
        console.log("刷新父页面失败")
      }
    }
    // 关闭当前窗口
    window.open("about:blank", "_self").close();
  } else {
    global.$history.push({
      pathname: url,
      state: dataObj
    });
  }

}

// select框的下拉搜索
export const filterOption = ({ input, option }) => {
  if (option && option.props && option.props.title) {
    return option.props.title === input || option.props.title.indexOf(input) !== -1
  } else {
    return true
  }
}

// 获取字符串里括号里的值,meddra的code值
export const getMeddraCode = ({ value }) => {
  let text = "";
  if (value) {
    let Index = value.lastIndexOf(")")
    let lastIndex = value.lastIndexOf("(")
    text = value.substring(lastIndex + 1, Index)
  }
  return text;
}

// 不可选日期
export const disabledDateFunc = ({ current, type }) => {
  if (type == "1") {// 不可选以后的日期
    return current && current < moment().endOf("day");
  } else {// 不可选以前的日期
    return current && current > moment().endOf("day")
  }
  // current && current > moment().endOf('day') || current < moment().subtract(150, 'years')
}

// 去掉对象中为空的属性
export const delNullData = ({ value }) => {
  let obj = {};
  for (let key in value) {
    if (value[key] != undefined && value[key] != "") {
      obj[`${key}`] = value[key];
    }
  }
  return obj;
}
