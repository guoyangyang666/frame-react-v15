import React, { Component } from 'react';
import { Form } from 'antd';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入echarts中国地图
require('echarts/map/js/china');
// 引入echarts相关的提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/title");
require("echarts/lib/component/toolbox");

// 中国地图
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getMapChart({ legendList, dataYList, dataXList }) {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById(this.props.id));
    // 绘制图表
    myChart.setOption({
      title: {
        text: ""
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        bottom: 0,
        data: legendList
      },
      grid: {
        left: "5%",
        right: "5%",
        top: "5%",
        bottom: "10%",
        containLabel: true
      },
      toolbox: {
        x: "right", //水平安放位置，默认为全图右对齐，可选为：'center' ¦ 'left' ¦ 'right'
        feature: {
          saveAsImage: {} // 下载图标
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: dataYList
      },
      yAxis: {
        type: "value"
      },
      series: dataXList
    });
    myChart.resize();
    //监听页面的尺寸变化，动态改变echarts的尺寸
    window.onresize = function () {
      myChart.resize();
    }
  }



  render() {
    return (
      <div>
        <div style={{ width: '100%', height: '400px' }} className="total-class" id={this.props.id}></div>
      </div>
    );
  }
}

const IndexComponent = Form.create()(Index);
export default IndexComponent;
