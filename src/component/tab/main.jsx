import React, { Component } from 'react';
import { Form, Badge } from 'antd';
import './style.less';

// 中国地图
class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      titleKey: 'all',
    }
  }

  setKey = (key) => {
    console.log("参数：", key);
    if (key && key != "") {
      this.props.changeTab(key);
      this.setState({
        titleKey: key
      })
    }
  }

  render() {
    const { type, titleKey } = this.state;
    return (
      <div className="my-tab">
        {
          type.map((item, index) => {
            return <div id={item.id} className="title">
              <p className={titleKey == item.id ? "title_p_click" : "title_p"} onClick={() => this.setKey(item.id)}>
                <Badge count={item.count}>
                  <span style={{ padding: '0px 15px' }}>{item.name}</span>
                </Badge>
              </p>
            </div>
          })
        }
      </div>
    );
  }
}

const TabComponent = Form.create()(Tab);
export default TabComponent;