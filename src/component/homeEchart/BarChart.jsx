import React from 'react'; // 引入了React
import { Form } from 'antd';
import './style/ChartStyle';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/grid';
import LoginService from '../../services/loginService';
class BarChart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      BarChartList: []
    }
  }
  componentWillMount () {

  }
    componentWillReceiveProps=(nextProps) => {
      // let a=sessionStorage.getItem("orgcode")
      // let b = sessionStorage.getItem("orgtype")
      // let c ={
      //   orgCode:a,
      //   orgType:b
      // }
      console.log('');
      let dataGraph = nextProps.data
      console.log('柱状图数据', dataGraph);
      let seriesData = [dataGraph.reportBackAll, dataGraph.reportAgain]
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('BarChart'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '反馈持有人报告数/持有人重新报告数',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        // legend: {
        //     data:['蒸发量','降水量']
        // },
        toolbox: {
          show: true,
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['反馈持有人报告数', '持有人重新报告数']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            data: seriesData
            // markPoint : {
            //     data : [
            //         {type : 'max', name: '最大值'},
            //         {type : 'min', name: '最小值'}
            //     ]
            // },
            // markLine : {
            //     data : [
            //         {type : 'average', name: '平均值'}
            //     ]
            // }
          }
          // {
          //     name:'降水量',
          //     type:'bar',
          //     data:[],
          //     // markPoint : {
          //     //     data : [
          //     //         {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
          //     //         {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
          //     //     ]
          //     // },
          //     // markLine : {
          //     //     data : [
          //     //         {type : 'average', name : '平均值'}
          //     //     ]
          //     // }
          // }
        ]
      });
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    }
    render () {
      let self = this;
      return (
        <div style={{height: 400}} id="BarChart"></div>
      );
    }
}


const BarChartComponent = Form.create()(BarChart);
export default BarChartComponent;
