import React from 'react'; // 引入了React和PropTypes
import { Card } from 'antd';
import './style.less';


/**
 * 子组件内容
 * @param title 标题
 * @param children 内容
 * @param restProps 传入的自定义属性
 * @returns {*}
 * @constructor
 */
const CityTable = ({ cityList, resultList, tableId, children, ...restProps }) => {
  return (
    <div className="my-city-table">
      <table className="infoTable" id={tableId}>
        <thead>
          <tr>
            {
              cityList.map(item => {
                return <th>{item.zoneName}</th>
              })
            }
          </tr>
          {
            resultList.map((itemList, index) => {
              return <tr style={{ fontWeight: index == 0 ? 800 : "" }}>
                {
                  itemList.map(item => {
                    return <td>{item}</td>
                  })
                }
              </tr>
            })
          }
        </thead>
      </table>
    </div>
  )
}
export default CityTable;
