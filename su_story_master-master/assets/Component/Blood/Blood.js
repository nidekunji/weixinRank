cc.Class({
  extends: cc.Component,

  properties: {
    bar:cc.ProgressBar,
  },
  init(total, current) {
    this.total = total || 1
    this.current = current || 1
    this.freshenNode(current);
  },
  start() {
    this.total = 1
    this.current = 1
    this.label = this.node.getChildByName('label');
    this.label.active = true;
  },

  freshenNode(cur) {
    this.current = cur;
    this.label.getComponent(cc.Label).string = this.current + '/' + this.total
    this.bar.progress = this.current / this.total; 
    if (this.bar.progress == 0)
    this.label.active = false;
    else {
      this.label.active = true;
    }
  }

});