// 配置文件
let url = "";// 路径
let develop = true;// 测试环境

// 开发环境
if (process.env.NODE_ENV == "development") {
  develop = true;
} else {
  develop = false;
}

const Main = {
  url, // 路径
  develop // true测试环境，false正式环境
};

export default Main;
