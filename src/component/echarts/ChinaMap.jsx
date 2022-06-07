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
class ChinaMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getMapChart({dataList, nameList}) {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("myMapChart"));
    // 绘制图表
    myChart.setOption({
      backgroundColor: '#FFFFFF',
      title: {
        text: '',
        subtext: '',
        x: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      grid: {
        left: "3%",
        right: "4%",
        top: "-10%",
        //bottom: "15%",
        containLabel: true
      },

      //左侧小导航图标
      visualMap: {
        show: true,
        x: 'left',
        y: 'bottom',
        splitList: [
          { start: 2700, label: '>=2700' },
          { start: 2000, end: 2700, label: '>=2000' },
          { start: 1000, end: 2000, label: '>=1000' },
          { start: 500, end: 1000, label: '>=500' },
          { start: 300, end: 500, label: '>=300' },
          { start: 100, end: 250, label: '>=100' },
          { start: 0, end: 100, label: '0-100' }
        ],
        color: ['#3399FF', '#66A1D2', '#88C5E7', '#AAD7F9', '#AAD7F9', '#DFF0FD', '#F5F5F3' ]
      },

      //配置属性
      series: [{
        name: '数据',
        type: 'map',
        mapType: 'china',
        roam: true,
        zoom: 1.2,
        label: {
          normal: {
            show: true  //省份名称  
          },
          emphasis: {
            show: false
          }
        },
        data: dataList,  //数据
        nameMap: nameList
      }]
    }, true);
    myChart.resize();
  }

  render() {
    return (
      <div>
        <div style={{ width: '100%', height: '400px' }} className="total-class" id="myMapChart"></div>
      </div>
    );
  }
}

const ChinaMapComponent = Form.create()(ChinaMap);
export default ChinaMapComponent;
