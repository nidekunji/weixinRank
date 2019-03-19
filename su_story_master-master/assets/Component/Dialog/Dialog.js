/**
 * @author uu
 * @file  提示框组件
 * @todo  该组件为直接一个页面，放入Canvas最上层 
 */
cc.Class({
  extends: cc.Component,
  properties: {
    title: cc.Label,
    content: cc.Label,
  },

  init() {
    this.node.opacity = 0;
    this.node.zindex = 999
    this.node.x = 0
    this.node.y = 0
   // this.node.runAction(cc.hide())
  },
  /**
   * 使用弹框时调用该函数
   * @param {object} data - 数据对象 里面需要有.title和.content字段 点击取消按钮的回调和点击确定的回调
   */
  showDialog(
    title,
    content,
    confirmFunc,
    cancelFunc
  ) {
    this.node.opacity = 255;
    this.confirmFunc = confirmFunc || (() => console.log('传入的确定回调为空'))
    this.cancelFunc = cancelFunc || (() => console.log('传入的取消回调为空'))
    this.title.string = title || ''
    this.content.string = content || ''
    //this.node.active = true;
    //this.node.runAction(cc.show())
  },

  onCencelButton() {
    this.node.opacity = 0;
    this.cancelFunc();
    // let action = cc.sequence( cc.callFunc(() => this.cancelFunc(), this))
    // this.node.runAction(action)
  },
  onConfirmButton() {
    this.node.opacity = 0;
    this.confirmFunc();
    // let action = cc.sequence( cc.callFunc(() => this.confirmFunc(), this))
    // this.node.runAction(action)
  }
});