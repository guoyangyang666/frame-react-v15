import React from 'react'; // 引入了React和PropTypes
import { Card } from 'antd';
import './style.less';


/**
 * 去除头部左侧菜单,并增加样式.用于详情页战死
 * @param {*} title 标题
 * @param {*} children 内容
 * @param {*} restProps 传入的自定义属性
 * @returns {*} 返回
 * @constructor
 */
const webOpen = ({ children, ...restProps }) => (
  <div>
    {children}
  </div>
)
export default webOpen;
