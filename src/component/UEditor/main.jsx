import React, { Component } from 'react';
import { Form, Badge } from 'antd';

import EditorPage from 'wangeditor';
import './style.less';

// 富文本
class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: "",// 内容
    }
  }

  componentDidMount() {
    this.editorHandle();
  }

  editorHandle = () => {
    const elemMenu = this.refs.editorElemMenu;
    const elemBody = this.refs.editorElemBody;
    this.editor = new EditorPage(elemMenu, elemBody);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    this.editor.customConfig.onchange = html => {
      this.setState({
        editorContent: this.editor.txt.html()
      })
    }
    // 使用 base64 保存图片，使用这种方式上传图片，然后在服务器端把base64编码转成图片。这样就不需要上传文件了。
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.customConfig.pasteFilterStyle = false;// 手动关闭掉粘贴样式的过滤
    // 工具栏
    this.editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'image',  // 插入图片
      'table',  // 表格
      'video',  // 插入视频
      'code',  // 插入代码
      'undo',  // 撤销
      'redo'  // 重复
    ]
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.customConfig.zIndex = 0;
    this.editor.create();
    this.editor.txt.html('<p>' + this.state.editorContent + '</p>');// 默认回显
  }

  setContent = ({content}) => {
    this.editor.txt.html('<p>' + content + '</p>');// 回显
    this.setState({
      editorContent: this.editor.txt.html()
    })
  }



  render() {
    const { type, titleKey } = this.state;
    return (
      <div className="text-area" >
        <div ref="editorElemMenu"
          style={{ backgroundColor: '#f1f1f1', border: "1px solid #ccc" }}
          className="editorElem-menu">

        </div>
        <div
          style={{
            padding: "0 10px",
            overflowY: "scroll",
            height: 500,
            border: "1px solid #ccc",
            borderTop: "none"
          }}
          ref="editorElemBody" className="editorElem-body">

        </div>
      </div>
    );
  }
}

const TabComponent = Form.create()(Tab);
export default TabComponent;