// 第3步：创建action，现在我们已经创建了reducer，但是还没有对应的action来操作它们，所以接下来就来编写action

// action也是函数
export function setPageTitle (data) {
  console.log("----data:", data);
  return (dispatch, getState) => {
    dispatch({ type: "SET_PAGE_TITLE", data: data })
  }
}
