/**
 * @author uu
 * @file  加载页面组件(假的)
 * @todo 
 */
cc.Class({
  extends: cc.Component,
  properties: {
    title: cc.Label,
  },
  init(titleArray, type, func) {
    this.titleArray = titleArray
    this.callback = func
    this.lateInit()
  },
  lateInit() {
    this.node.runAction(cc.show())
  },
});