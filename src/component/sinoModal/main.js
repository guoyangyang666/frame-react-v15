import React from 'react'; // 引入了React和PropTypes
import { Modal, Button } from 'antd';
import './style.less';


/**
 * 子组件内容
 * @param {*} title 标题
 * @param {*} children 内容
 * @param {*} restProps 传入的自定义属性
 * @returns {*} 返回
 * @constructor
 */
const SinoModal = ({ title, children, ...restProps }) => (
  <div className="sino-modal">
    <Modal
      centered
      width={1100}
      destroyOnClose
      maskClosable={false}
      wrapClassName="statisticsModal2"
      title={title}
      {...restProps}
    >
      <div>
        {children}
      </div>
    </Modal>

  </div>
)
export default SinoModal;
