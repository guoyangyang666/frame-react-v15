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
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getMapChart({ legendList, dataList, color }) {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById(this.props.id));
    // 绘制图表
    myChart.setOption({
      title: {
        text: ""
      },
      tooltip: {
        trigger: "item",
        formatter: function (data) {// 饼图鼠标悬浮百分比保留以为小数
          // console.log(data)
          return data.seriesName + "<br/>" + data.name + " : " + data.value + " (" + data.percent.toFixed(1) + "%)";
        }
        // formatter: "{a}{b} : {c} ({d}%)"
      },
      color: color,
      legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 0,
        left: "center",
        data: legendList
      },
      toolbox: {
        x: "left", //水平安放位置，默认为全图右对齐，可选为：'center' ¦ 'left' ¦ 'right'
        feature: {
          // saveAsImage: {} // 下载图标
        }
      },
      series: [
        {
          name: "",
          type: "pie",
          label: {
            normal: {
              formatter: '{b}：{c}\n占比：{d}%',
              // position: 'outside'
            }
          },
          radius: "70%",
          center: ["50%", "45%"],
          selectedMode: "single",
          data: dataList,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          itemStyle: {
            normal: {
              // color: function (params) {
              //   //自定义颜色
              //   var colorList = [
              //     "#4E80BB",
              //     "#BD4E4C",
              //     "#99B958",
              //     "#7F619E",
              //   ];
              //   return colorList[params.dataIndex];
              // }
            }
          }
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
