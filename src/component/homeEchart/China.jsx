import React, { Component } from 'react';
import { Form } from 'antd';
import './style/ChartStyle';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import china from 'echarts/map/js/china';
import LoginService from '../../services/loginService';
// 引入 ECharts 主模块
import ReactEcharts from 'echarts-for-react';
class China extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      LineChartList: [],
      data: [],
      optionMaps: {}
    }
    this.chart = {}
  }
    toPoint=(percent) => {
   		 	let str = percent.replace('%', '');
    		        str = str / 100;
   		 	return str;
    }
    renderChinaMap=(data, mapType) => {
      // console.log('地图数据', data);
      let mydata = []
      let maxArr = []
      for (let key in data) {
        let obj = {};
        obj.name = key;
        let str = this.toPoint(data[key])
        // console.log('地图数据地图数据', str);
        if (!mapType) {
          obj.value = Number(str) * 100
        } else {
          obj.value = data[key]
        }
        let num = parseInt(data[key])
        maxArr.push(num)
        mydata.push(obj)
      }
      let maxValue = 100
      if (JSON.stringify(maxArr) != '[]') {
        maxValue = maxArr.sort((x, y) =>
          // console.log('xxxx', Number(x));
        // console.log('xxxx', y);
          y - x
        )[0]
      }
      // console.log('最大值', maxValue);

      let optionMap = {
        backgroundColor: '#FFFFFF',
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: (params, ticket, callback) => {// 所有的legend竖排显示
            // console.log('hahahaahahaha', params, ticket, callback);
            if (this.props.mapType) {
              return   params.data.name + '数据:' + params.data.value
            } else {
              if (isNaN(params.data.value)) {
                return params.data.name + '数据:' + '无'
              } else {
                // console.log('我看看你是啥', params.data.value);
                return params.data.name + '数据:' + Number(params.data.value) + '%'
              }

            }
          }
        },

        // 左侧小导航图标
        visualMap: {
          show: true,
          x: 'left',
          y: 'center',
          // calculable:true, //显示手柄
          max: !mapType ? 100 : maxValue,
          maxOpen: !mapType,                       // 界面上会额外多出一个『> max』的选块。
          min: 0,
          precision: 2, // 设置小数精度，默认0没有小数
          inRange: {
            color: !mapType ? ['white', 'cyan', 'blue'] : ['white', 'yellow', 'red']
          },
          formatter: function (value) {                // 标签的格式化工具。
            return  !mapType ? value.toFixed(2) + '%' : value;                   // 范围标签显示内容。
          }
        },

        // 配置属性
        series: [{
          name: '数据',
          type: 'map',
          mapType: 'china',
          roam: true,
          label: {
            normal: {
              show: true  // 省份名称
            },
            emphasis: {
              show: false
            }
          },
          data: mydata  // 数据
        }]
      };
      this.setState({optionMap})

    }

    componentWillMount=() => {

      this.renderChinaMap()
    }
    componentWillReceiveProps =(nextProps) => {
      if (nextProps.data.err) {
        return
      } else {
        this.renderChinaMap(nextProps.data, nextProps.mapType)
      }
    }

    render () {
      console.log('折现图的数据二', this.props.data);
      let self = this;
      return (
        <div style={{width: '100%'}} id="China">
          <ReactEcharts
            style={{'height': (window.innerHeight - 110) / 2 + 5 + 'px' }}
            option={this.state.optionMap}
          >
          </ReactEcharts>
        </div>
      );
    }
}


const ChinaComponent = Form.create()(China);
export default ChinaComponent;
