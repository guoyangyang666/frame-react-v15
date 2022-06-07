// --------------------表单校验-----------------------------

/**
 * 校验密码输入是否过于简单
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} callback 回调
 * @returns {*} 结果
 */
export const validatePassword = (rule, value, callback) => {
  let reg = /((?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-zA-Z\d#@!~%^&*]{8,16}/;
  if (!reg.test(value)) {
    if (value == "" || value == undefined) {
      callback();
    } else {
      callback("密码长度8~16位,且必须包含字母和数字");
    }
  } else {
    callback();
  }
}

/**
 * 登录名只能是字母和数字
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} callback 回调
 * @returns {*} 结果
 */
export const validateIsnumberorword = (rule, value, callback) => {
  if (value == undefined || value == null || value == "") {
    callback();
  } else {
    if (!value.match(/^[A-Za-z0-9]+$/)) {
      callback("请输入数字或英文字母");
    } else {
      callback();
    }
  }
}

/**
 * 用户名称是否为汉字或英文字母
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} callback 回调
 * @returns {*} 结果
 */
export const validateIsUserNameChinese = (rule, value, callback) => {
  if (value == undefined || value == null || value == "") {
    callback();
  } else {
    if (!value.match(/^[\u4E00-\u9FA5A-Za-z]+$/)) {
      callback("请输入汉字或英文字母");
    } else {
      callback();
    }
  }
}

/**
 * 手机号码验证
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} callback 回调
 * @returns {*} 结果
 */
export const validatePhone = (rule, value, callback) => {
  let phone = /^((\+)?86|((\+)?86)?)0?1\d{10}$/;
  if (value == undefined || value == null || value == "") {
    callback();
  } else {
    if (phone.test(value)) {
      callback();
    } else {
      callback("请输入正确的联系方式！");
    }
  }
}
