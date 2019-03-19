/**
 * @author uu
 * @file  卡牌
 * @todo 
 */
cc.Class({
  extends: cc.Component,
  properties: {
    sprite: cc.Sprite,
    valueLabel: cc.Label,
    cardTitleLabel: cc.Label,
    contentLabel: cc.Label,
    cardIconAtlas: cc.SpriteAtlas,
    _index: 0,
    data: []
  },
  init(g, data) {
    this._game = g
    this.data = data
    // this.sprite.spriteFrame = this.cardIconAtlas.getSpriteFrame(data.cardIcon);
    this.valueLabel.string = data.cardValue
    this.cardTitleLabel.string = data.name || ''
    this.lateInit()
    if (data.id == 1) 
    this.sprite.spriteFrame = this.cardIconAtlas.getSpriteFrame("0_06");
    else if (data.id == 2)
    this.sprite.spriteFrame = this.cardIconAtlas.getSpriteFrame("2_14");
    else
    this.sprite.spriteFrame = this.cardIconAtlas.getSpriteFrame("8_09");
  },
  lateInit() {

  },
  chooseCard() {
    this._game.onPlayerChooseCard(this.data, this.node)
  },
});