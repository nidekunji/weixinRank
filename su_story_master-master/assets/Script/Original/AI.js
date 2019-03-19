/**
 * @author uu
 * @file  AI处理
 * @todo 
 */
cc.Class({
  extends: cc.Component,
  properties: {
    _startBlood: 0,
    opacity: 255,
    lostBloodNode: cc.Node,
  },
  start() {

  },
  init(data, g) {
    this._game = g
   // this._dataMgr = g._dataMgr,
    this.data = data
    this.lateInit()
  },
  lateInit() {
    this._startBlood = this.data.blood;
    this.monsterBloodBar = this.node.getChildByName('Blood').getComponent('Blood');
    this.monsterBloodBar.init(this.data.blood,this.data.blood);
    this.monsterText = this.node.getChildByName('AIText');
    this.monsterAnim = this.node.getChildByName('AIAnim').getComponent(dragonBones.ArmatureDisplay);
  },
  runSkill() {
    let data = this.data
    let blood = data.blood;
    let harm = -1;
    if (blood == (this._startBlood) * 0.8) { //skill0
      harm = data.skill0;
    } else if (blood > (this._startBlood) * 0.5) { //skill3
      harm = data.skill1;
    } else if (blood < (this._startBlood) * 0.5 && blood > (this._startBlood) * 0.25) { //skill2
      harm = data.skill2;
    } else if (blood < (this._startBlood) * 0.25) { //skill1
      harm = data.skill1;
    }
    if(harm==-1){
      harm=data.skill0
    }
    return harm; //为怪物技能ID
  },

  runStatus(type) {

  },
  // 1 2 3 start fail stay
  onAIAnim(type) {
    if (type == 1) {
      this.monsterAnim.playAnimation('start', 1);
      setTimeout(() => {
        this.onAIAnim(3)
      }, 1000)
    } else if (type == 2)
      this.monsterAnim.playAnimation('fail', 1);
    else if (type == 3)
      this.monsterAnim.playAnimation('stay', -1);
  },
  onAIText(type) {
    this.monsterText.getComponent(cc.Label).string = this.data["text" + type];
    let show = cc.fadeIn(3);
    this.monsterText.runAction(show);
    this._game.action.onAIfade(this.monsterText);
  },
  onAIEnter() {
    this.onAIAnim(1);
    this.onAIText(1);
  },
  onAIFail() {
    this.onAIAnim(2);
    this.onAIText(2);
  },
  onAIWin() {
    this.onAIText(3);
  },
  subBlood(sum) {
    this.data.blood -= sum;
   // this.this._dataMgr -=
    this.lostBloodNode.getComponent(cc.Label).string = '-' + sum
    this.lostBloodNode.y = 0
    this.lostBloodNode.opacity = 255
    this.lostBloodNode.runAction(cc.spawn(cc.moveTo(1, 0, 100), cc.fadeOut(1)))
    this.monsterBloodBar.freshenNode(this.data.blood);
  },
});