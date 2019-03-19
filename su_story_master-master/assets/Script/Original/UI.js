/**
 * @author uu
 * @file 玩家血条刷新 
 * @todo 
 */
cc.Class({
  extends: cc.Component,
  properties: {
    bloodBar: require('Blood')
  },
  start() {

  },
  init(g) {
    this._game = g
    this.initBlood()
  },
  lateInit() {

  },

  // ---------- 血量操控------------
  initBlood() {
    this.bloodBar.init(this._game.player.totalBlood, this._game.player.blood)
  },
  subPlayerBlood() {
    this.freshenPlayerBlood()
  },
  freshenPlayerBlood() {
    console.log(this._game.player.blood,"blood");
    this.bloodBar.freshenNode(this._game.player.blood);
  }
});