/**
 * @author kunji
 * @file  玩家相关的操作
 * @todo 
 */


cc.Class({
  extends: cc.Component,
  properties: {
    playerData:null,
    cardPrefab: cc.Prefab,
    cardsContainer: cc.Node,
    selectCardContainer: cc.Node,
    curPlayerCardData:[],
  },

  init(data,g) {
    this._controller = g._controller
    this._game = g
    this._data = this._game._dataMgr
    this.player = data;
    this.lateInit()
  },

  lateInit() {
    this.playerBloodBar = this.node.getChildByName("Blood").getComponent('Blood');
    this.playerBloodBar.init(this.player.blood,this.player.blood);
    this.createPools();
    this._curCardNum = 0;
    this.loadPlayerCard();
  },

  loadPlayerCard() {
    console.log("初始化玩家手里的卡牌", this.player);
    this.resetCard();

    this.recoveryUICards();
    this.curPlayerCardArr = [];
   // console.log(this.cardsContainer.children,"dkfjadslfkjlads");
    this.player.cards.forEach(element => {
      this.instantiateCard(this, element, this.cardsContainer);
    });
  },

  onPlayerChooseCard(data, node) {
    this._curCardNum += 1;
    this.curPlayerCardData.push(data);
    this.curPlayerCardArr.push(node);
    this.curPlayerCardArr.forEach(element => {
      element.parent = this.selectCardContainer;
    });
  },
  synCard() {
    let data = this.curPlayerCardData;
    switch (data.length) {
      case 0:
        this._game.dialog.showDialog('当前没有卡牌', '没有卡牌', null, null)
        break;
      case 1:
        data[0].cardName = this._data.getKongfuNameById(data[0].cardAtt + 1)
        return data[0];
      case 2:
      case 3:
        var skill, speed, fight = 0,
          value, type, name = 0;
        data.forEach(element => {
          element.cardAtt == 0 ? fight++ : (element.cardAtt == 1 ? speed++ : skill++)
          value += element.cardValue
        });

        console.log('卡牌中三种卡牌的值', fight, speed, skill)
        if (data.length == 2) {
          if (fight == 2) {
            type = 0
            name = 5
          }
          if (speed == 2) {
            type = 1
            name = 7
          }
          if (skill == 2) {
            type = 2
            name = 8
          }
          if (fight == 1) {
            if (speed == 1) {
              type = 1
              name = 3
            } else {
              type = 0
              name = 4
            }
          } else {
            type = 2
            name = 6
          }
        } else {
          if (fight == 3) {
            type = 0
            name = 9
          }
          if (speed == 3) {
            type = 1
            name = 14
          }
          if (skill == 3) {
            type = 2
            name = 17
          }
          if (fight == 2) {
            type = 0
            if (speed == 1) {
              name = 10
            } else {
              name = 11
            }
          } else if (speed == 2) {
            type = 1
            if (fight == 1) {
              name = 12
            } else {
              name = 15
            }
          } else if (skill == 2) {
            type = 2
            if (fight == 1) {
              name = 13
            } else {
              name = 16
            }
          } else {
            type = 3
          }
        }
        return {
          cardAtt: type,
          cardValue: value,
          cardName: this._data.getKongfuNameById(name),
        }
    }
  },

  upgradePlayerLevel () {
    this.player.blood += 1;
    this.player.level += 1;
    this._data.saveData();
  },
  subPlayerBlood(num) {
    this.player.blood -= num;
    this.playerBloodBar.freshenNode(this.player.blood);
    this._data.saveData();
  },
  subPlayerCard() {
    let cardArr = this.player.cards;
    let data = this.curPlayerCardData;
    for (let i = 0; i < cardArr.length; i++) {
      for (let j in data) {
        if (cardArr[i] == data[j])
          cardArr.splice(i, 1);
      }
    }
    console.log('玩家剩余卡牌:', cardArr)
  },

  resetCard() {
    this._curCardNum = 0;
    if (this.curPlayerCardArr== undefined)
    return;
    this.curPlayerCardArr.forEach(element => {
      element.parent = this.cardsContainer;
    });
    this.curPlayerCardArr = [];
    this.curPlayerCardData = [];
  },
  recoveryUICards() {
    let childrens = this.cardsContainer.children
    let length = childrens.length;
    if (childrens.length != 0) {
      for (let i = 0; i < length; i++) {
        this.cardsPool.put(childrens[i])
      }
    }
  },
  createPools() {
    this.cardsPool = new cc.NodePool()
    let initCount = 10
    for (let i = 0; i < initCount; i++) {
      let card = cc.instantiate(this.cardPrefab)
      this.cardsPool.put(card)
    }
  },
  instantiateCard(self, data, parent) {
    let card = null
    if (self.cardsPool && self.cardsPool.size() > 0) {
      card = self.cardsPool.get()
    } else {
      card = cc.instantiate(self.cardPrefab)
    }
    card.parent = parent
    card.scale = 1
    card.x = 0
    card.y = 0
    card.getComponent('Card').init(self, data)
  },


});