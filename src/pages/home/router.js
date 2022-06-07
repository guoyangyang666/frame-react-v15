const main = {
  path: "/adr/main",
  key: "adr_main",
  name: "首页",
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Route = require("./main.jsx").default
      cb(null, Route)
    }, "adr_main")
  }
}
export default main;
