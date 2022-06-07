# react15框架

## 环境要求

```
1、安装node（如已安装请忽略）
  推荐版本：v12.13.1
  下载地址：https://nodejs.org/zh-cn/
  查看当前版本命令，在控制台输入命令：node -v

2、安装npm（如已安装请忽略）
  推荐版本：v6.12.0
  注：安装完node后，npm自动安装
  查看当前版本命令，在控制台输入命令：npm -v

3、全局安装webpack和webpack-dev-server（如已安装请忽略）
  命令行：npm install webpack -g
  命令行：npm install webpack-dev-server -g

4、前端开发工具
    推荐是用vscode开发工具（也可使用其他工具）
    vscode下载地址：https://code.visualstudio.com/
    vscode常用插件配置：https://blog.csdn.net/guoyangyang123456/article/details/102590368
    配置：https://blog.csdn.net/weixin_42162265/article/details/106207676
```

## 安装依赖命令
```
npm install
```

## 启动项目命令
```
npm run dev
```

## 打包命令

```
npm run dist
```

## 兼容性

```
  兼容现代浏览器和 IE9 及以上
```

## 参考文档

```
1、react语法：https://react.docschina.org/
2、react-router路由：http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu
3、ant design组件：https://3x.ant.design/docs/react/introduce-cn
4、es6语法：https://es6.ruanyifeng.com/
5、webpack4配置：https://www.webpackjs.com/api/cli/
6、ajax：https://www.w3school.com.cn/jquery/ajax_ajax.asp
7、nginx（部署时用）：https://blog.csdn.net/guoyangyang123456/article/details/83894290
8、echarts图表：https://echarts.apache.org/examples/zh/index.html
9、react教程：https://www.runoob.com/react/react-refs.html
```

## 其他命令

```
npm install 批量安装依赖
npm install xxx —save 安装指定包到指定位置
npm uninstall xxx —save 卸载指定包
npm install xxx —save-dev
npm update 升级全部包
npm install xxx -g 全局安装指定包
```

## 功能代码路径

```
 @：代表src目录
数据采集>>医疗机构：src\pages\adr
数据采集>>持有人：src\pages\mah
```

## 项目代码规范

```
一、项目目录说明
  1、component: 公共组件
  2、config: 调用接口的路径配置
  3、pages：存放页面
  4、router（统计平台统一入口，不用修改）：存放页面
  5、services（命名与pages一致）: 存放接口
  6、utils（统计平台相关工具：包含封装好的http请求，公共方法）

二、文件命名规范
  1、pages: 列表>>list文件、修改或新增edit文件、详情>>detail文件
  2、单个路由、单个样式紧跟业务文件（不需要路由跳转的不用写单个的路由），以便后期维护

三、操作按钮
  1、图标
    新增：<Icon type="plus" />
    编辑：<Icon type="edit" />
    删除：<Icon type="delete" />
    下载：<Icon type="download" />
    上传：<Icon type="upload" />
    导入：<Icon type="import" />
    导出：<Icon type="export" />
    关联个例：<Icon type="share-alt" />
    查看：<Icon type="file-search" />
    跟踪报告：<Icon type="form" />
    暂存：<Icon type="file-done" />
    返回：<Icon type="rollback" />
    提交：<Icon type="check" />
    拒绝：<Icon type="close-circle" />
    审核：<Icon type="audit" />
    发起协同：<Icon type="deployment-unit" />

  2、前端使用按钮
    新增
    <div className="buttonOptionSingle">
      <Button type="primary" icon="plus">新增</Button>
      <Button icon="download">下载</Button>
      <Button icon="upload">上传</Button>
      <Button icon="import">导入</Button>
      <Button icon="export">导出</Button>
    </div>

    编辑、删除、
    <span className="buttonOption">
      <a className="editButton" ><Icon type="edit" />编辑</a>
      <a className="deleteButton" ><Icon type="delete" />删除</a>
      <a className="agreeButton" ><Icon type="check-circle" />批准/同意</a>
      <a className="deleteButton" ><Icon type="close-circle" />拒绝</a>
      <a className="deleteButton" ><Icon type="reload" />拒绝</a>
      <a className="deleteButton" ><Icon type="share-alt" />转发</a>
      
    </span>

  3、查看（直接写在表格标题处）
    <a href="javascript:void(0)" onClick={() => this.jumpHandle({ type: 'detail', record })}>标题</a>

四、复制链接访问页面
  1、加入  ?external=1  即可访问（去除头部和左侧菜单）2: 访问其他系统 3: 其他系统访问本系统
  2、未加入如上参数，则自动跳转到登录页面

```


