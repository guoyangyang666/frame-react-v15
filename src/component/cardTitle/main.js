import React from 'react'; // 引入了React和PropTypes
import { Card } from 'antd';
import './style.less';


/**
 * 子组件内容
 * @param {*} title 标题
 * @param {*} children 内容
 * @param {*} restProps 传入的自定义属性
 * @returns {*} 返回
 * @constructor
 */
const CardTitle = ({ title, card, children, ...restProps }) => (
  <div className="my-card-title">
    {
      card == false
        ? <div>
          <div className="title-menu" style={{marginBottom: 5}}>
            <p className="title-menu-text">
              <span>{title}</span>
            </p>
          </div>
          {children}
        </div>

        : <Card
          {...restProps}
          hoverable
          size="small"
          title={
            <div className="title-menu">
              <p className="title-menu-text">
                <span>{title}</span>
              </p>
            </div>
          }
        >
          {children}
        </Card>
    }

  </div>
)
export default CardTitle;
