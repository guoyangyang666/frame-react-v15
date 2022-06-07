import React from 'react'; // 引入了React
import { Form } from 'antd';
import './style/ChartStyle';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/grid';
import LoginService from '../../services/loginService';
class LineChart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      LineChartList: []
    }
  }
    componentWillMount=() => {

      console.log('this.props.data', this.props.data);
    }
    componentWillReceiveProps =(nextProps) => {
      // let a=sessionStorage.getItem("orgcode")
      // let b = sessionStorage.getItem("orgtype")
      // let c ={
      //   orgCode:a,
      //   orgType:b
      // }
      console.log('this折线图', this);
      console.log('this折线图', this['props']);
      let dataGraph = nextProps.data
      let xAxisData = []
      let seriesData = []
      for (let key in dataGraph) {
        xAxisData.push(key)
        seriesData.push(dataGraph[key])
      }
      console.log('折现图数据', this.props.data);
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('LineChart'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '持有人报告数（月）',
          subtext: ''
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'line'
        }]
      });
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    }


    render () {
      console.log('折现图的数据二', this.props.data);
      let self = this;
      return (
        <div style={{height: 400}} id="LineChart"></div>
      );
    }
}


const LineChartComponent = Form.create()(LineChart);
export default LineChartComponent;
