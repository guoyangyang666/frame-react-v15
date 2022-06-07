import moment from "moment";
// --------------------日期时间不可选----------------------------

/**
 * 不可选未来时间
 * @returns {*} 结果
 */
export const disabledDateMethod = ({current}) =>
  // 不可选未来时间
  current && current > moment().endOf("day")

