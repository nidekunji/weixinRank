/**
 * @author uu
 * @file  处理和判断谁的卡牌获胜和返回伤害
 * @todo  招式合成//判断输赢//计算伤害
 */
cc.Class({
  extends: cc.Component,
  properties: {},
  init(g) {
    this._game = g
  },
  lateInit() {

  },
  // ------------------- 判断阶段 --------------------
  /**
   * 判断谁获胜 并且计算伤害
   * @param {object} cardData 玩家融合之后的卡牌
   * @param {object} AIData 怪物使用的技能
   * @return 返回一个{object} 
   * {
   *  isWin:ture//or false
   *  damage:1,//伤害
   *  statusId:1,//造成的状态ID
   * }
   */
  checkWhoWin(cardData, AIData) {
    let isWin = true;
    console.log("玩家卡牌：", cardData, "AI卡牌", AIData);
    console.log("卡牌的值：",cardData.cardValue,"AI的值：",AIData.cardValue,typeof(AIData.cardValue));
    // 比较哪张卡牌厉害
   
    // 第一轮判断 比较卡牌数值 如果一方的数值比另一方数值大3 则胜出 否则进行二轮比较
    if (cardData.cardValue + 3 <= AIData.cardValue) {
      isWin = false;
     // return false
    } else if (cardData.cardValue >= AIData.cardValue + 3) {
      isWin = true;
     // return true
    } else {
      // 第二轮比较 比较类型 先判断是否
      if (cardData.cardAtt == AIData.cardAtt) {
        // 平局
      } else if (cardData.cardAtt == 3) {
        return true
      } else if (AIData.cardAtt == 3) {
        return false
      } else if ((cardData.cardAtt != 0 && cardData.cardAtt > AIData.cardAtt) || (cardData.cardAtt == 0 && AIData.cardAtt == 2)) {
        return true
      } else {
        return false
      }
    }
    let result = {
      isWin: isWin,
      damage: 1,
      element: 0,
      statusID: 0
    };
    return result;
  },

  //接收输出哪个技能 

  // ---------------------- 伤害计算 --------------------------
});