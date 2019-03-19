/**
 * @author uu
 * @file  简单动作数据
 * @todo 
 */


cc.Class({
    extends: cc.Component,
    properties: {
    },

    init(c) {
      this._controller = c
      this._game = c.game
      this.lateInit()
    },

    lateInit () {},

    /*----AI------*/
    onAIfade (node) {
        node.stopAllActions();
        let show = cc.fadeIn(1.0);
        let hide = cc.fadeOut(0);
        let dealyTime = cc.delayTime(2);
        let rep = cc.repeat(cc.sequence(show, dealyTime ,hide), 1);
        node.runAction(rep);
    } 

    /*--------Player--------*/
  });

