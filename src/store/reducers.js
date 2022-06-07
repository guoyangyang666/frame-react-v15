// 第2步：创建reducer，它就是将来真正要用到的数据，我们将其统一放置在reducers.js文件

// 工具函数，用于组织多个reducer，并返回reducer集合
import { combineReducers } from "redux"
// 默认值
import defaultState from "./state.js"

// 一个reducer就是一个函数
function pageTitle (state = defaultState.pageTitle, action) {
  // 不同的action有不同的处理逻辑
  switch (action.type) {
  case "SET_PAGE_TITLE":
    return action.data
  default:
    return state
  }
}
// 导出所有reducer
export default ({
  pageTitle
})
