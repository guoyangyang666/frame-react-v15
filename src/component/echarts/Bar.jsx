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

// 随机数
function randomData() {
  return Math.round(Math.random() * 500);
}

// 中国地图
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getMapChart({dataXList, dataYList}) {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById(this.props.id));
    // 绘制图表
    myChart.setOption({
      title: {
        text: '',
      },
      color: ['#2D86DF'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },

      grid: {
        left: '3%',
        right: '4%',
        top: '5%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        axisLabel: {
          interval: 0,
          formatter: function (value) {
            var str = "";
            var num = 12; //每行显示字数 
            var valLength = value.length; //该项x轴字数  
            var rowNum = Math.ceil(valLength / num); // 行数  

            if (rowNum > 1) {
              for (var i = 0; i < rowNum; i++) {
                var temp = "";
                var start = i * num;
                var end = start + num;

                temp = value.substring(start, end) + "\n";
                str += temp;
              }
              return str;
            } else {
              return value;
            }
          }
        },
        data: dataYList
      },
      series: [
        {
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: dataXList
        }
      ]
    });
    myChart.resize();
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
