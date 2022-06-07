import React from 'react'; // 引入了React和PropTypes
import { Card } from 'antd';
import './style.less';


const handleCheck = ({ item, index }) => {
  console.log("--->>>item:", item);
}
/**
 * 子组件内容
 * @param title 标题
 * @param children 内容
 * @param restProps 传入的自定义属性
 * @returns {*}
 * @constructor
 */
const CheckItem = ({ title, dataList, children, ...restProps }) => {
  return (
    <div className="my-check-item">
      {
        dataList.map((item, index) => {
          return (
            <div
              className="componentsItem"
              onClick={() => handleCheck({ item, index })}
              key="index"
            >{item.name}</div>
          )
        })
      }
    </div>
  )
}
export default CheckItem;
