/**
 * @author uu
 * @file  游戏流程主控制器 以及当前游戏数据管理
 * @todo 
 */
cc.Class({
  extends: cc.Component,
  properties: {
    status: 0,
    // 战斗状态
    // 0:未知状态/未初始化状态/不可操作状态
    // 1:只有在1下才是可自由操作卡牌状态
    // 2:裁判判断阶段/动画阶段/不可操作状态
    UI: require('UI'),
  },
  // ------------ 关卡初始化 -----------------------
  init(c, player, level) {
    this._controller = c;
    this._dataMgr = c.data;
    this.combatJudge = c.referee;
    this.dialog = c.dialog;
    this.page = c.page
    this.action = c.action;
    this._aiMgr = c.AI
    this.player = player
    this.level = level
    this._carsMgr = c.Cards
    this.lateInit()
  },
  lateInit() {
    this._carsMgr.init(this)
    this.combatJudge.init(this);
    this.UI.init(this)
    this.initUI()
  },
  initUI() {
    this.status = 1;
    this._carsMgr.loadPlayerCard()
    this._aiMgr.onAIEnter();
  },
  /*----------------- 卡牌输赢 ------------------------*/
  judgeWinOrFail(data) {

    this.status = 2;
    this.scheduleOnce(() => {
      let skill = this._dataMgr.getSkillById(this._aiMgr.runSkill())
      let booleValue = this.combatJudge.checkWhoWin(data, skill)
      booleValue.isWin ? this.onPlayerCardWin(booleValue) : this.onAICardWin(booleValue)
    }, 1);
  },

  onAICardWin(data) {
    console.log("AI win",this.player.blood);
    this.subPlayerBlood(data.damage);
    this.scheduleOnce(() => {
      if (this.player.blood <= data.damage) {
        this._aiMgr.onAIWin()
        setTimeout(() => {
          this.onGameOver()
        }, 1000)
      } else {
        this.onNextTurning();
      }
      this.status = 1;
    }, 1)
  },

  onPlayerCardWin(data) {
    this._carsMgr.resetCard();
    this.scheduleOnce(() => {
      if (this.level.monster.blood <= data.damage) {
        this._aiMgr.onAIFail()
        this.nextFight()
      } else {
        this._aiMgr.subBlood(data.damage);
        this.onNextTurning();
      }
      this.status = 1;
    }, 1);
  },

  /*----------回合控制-------------------- */
  nextFight() {
    this.upgradePlayerLevel();
    this.level = this._dataMgr.initLevelData(this.player.level + 1)
    this._carsMgr.resetCard();
    this._aiMgr.onAIEnter();
    this.status = 1
  },

  onNextTurning() {
    this._carsMgr.resetCard();
    this.status = 1
  },

  onGameOver() {
    this.status = 0
    cc.log("游戏结束");
    let func = () => {
      this._carsMgr.resetCard();
      this._carsMgr.recoveryUICards();
      this._controller.init();
      this.page.onOpenPage(2);
    };
    this._controller.dialog.init();
    this._controller.dialog.showDialog(
      "游戏结束了！",
      "you failed! QAQ",
      func,
      null
    );
  },

  /**
   * 玩家通过关卡升级操作
   * @author kunji
   */
  upgradePlayerLevel() {
    this.player.blood += 1;
    this.player.totalBlood += 1
    this.player.level += 1;
    this.UI.initBlood()
  },

  subPlayerBlood(num) {
    this.player.blood -= num;
    console.log(num,"num",this.player.blood,"blood");
    this.UI.subPlayerBlood()
  },

  subPlayerCard(data) {
    let cardArr = this.player.cards;
    for (let i = 0; i < cardArr.length; i++) {
      for (let j in data) {
        if (cardArr[i] == data[j])
          cardArr.splice(i, 1);
      }
    }
    console.log('玩家剩余卡牌:', cardArr)
  },

  backHome () {
    this._carsMgr.recoveryUICards();
    let page = this._controller.page;
    page.onOpenPage(2);
  },

});