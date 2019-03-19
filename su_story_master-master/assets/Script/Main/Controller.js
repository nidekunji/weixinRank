/**
 * @author uu
 * @file  应用主控制器
 * @description 在这里获得所有脚本组件
 */
let wxAPI = require("WxAPI");
cc.Class({
  extends: cc.Component,
  properties: {
    data: require('DataController'),
    audio: require('Audio'),
    page: require('Page'),
    dialog: require('Dialog'),
    rank: require('Rank'),
    game: require('Game'),
    referee: require('CombatJudgment'),
    AI: require('AI'),
    action: require('Action'),
    isWeChat: false,
    Cards: require('CardsController'),
    WxAuth: require('WxAuth')
  },
  init() {
    this.data.init(this);
    this.page.init(this);
    this.WxAuth.init();
    this.dialog.init();
  },
  start() {
    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      this.rank.init(this);
    }
    this.init();
    this.rank.init(this);
  },
  // ------------ 按钮绑定 --------------
  onStartButton() {
    this.game.init(this, this.data.initPlayerData(), this.data.initLevelData(1))
  }
});