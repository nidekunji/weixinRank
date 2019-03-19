/**
 * @author uu
 * @file  处理缓存和全局数据
 * @todo 
 * @description 在这里获得所有数据 为了避免异步问题 尽量使用return获取数据
 * @progress 初始化=>判断是否有存档=>有则显示两个按钮（载入和重新开始），没有则显示开始按钮
 */
cc.Class({
  extends: cc.Component,

  properties: {
    isFristTime: true,
    // levelData: cc.JsonAsset, //关卡数据
    // kongfuData: cc.JsonAsset, //玩家出招表kongfu.json
    // elementData: cc.JsonAsset, //元素表
    // itemData: cc.JsonAsset, //道具表
    // monsterData: cc.JsonAsset, //怪物表
    // cardData: cc.JsonAsset, //卡牌预设表
    // skillData: cc.JsonAsset, //怪物技能表
    // status: cc.JsonAsset, //状态表
  },
  // -------------------- 全局数据管理-----------------
  init(c) {
    // cc.sys.localStorage.removeItem('userData')
    this._controller = c
    this._game = c.game
    this._dialog = c.dialog
    this.lateInit()
  },
  lateInit() {
    let self = this;
    let data = ['LevelData', 'MonsterData', 'PreinstallCard', 'KongfuData', 'SkillData']
    let josnData = ['levelData', 'monsterData', 'cardData', 'kongfuData', 'skillData']
    data.forEach((item, index) => {
      cc.loader.loadRes('Data/' + item, function (err, jsonAsset) {
        self[josnData[index]] = jsonAsset.json
      });
    })
  },
  initPlayerData() {
    this.player = {
      level: 1,
      cards: [this.cardData[1], this.cardData[2], this.cardData[3]],
      item: [],
      progress: 0,
      blood: 1,
      totalBlood: 1,
      status: [],
      equipment: [],
    }
    return this.player
  },
  /**
   * 根据当前关卡初始化怪物数据,每次进入新关卡时调用
   * @param {string} level - 关卡数
   */
  initLevelData(level) {
    this.level = this.levelData[level]
    this.level.monster = this.monsterData[this.level.monsterId.split(",")[Math.floor(Math.random() * 2)]]
    this._controller.AI.init(this.level.monster, this._controller.game);
    console.log("初始化战斗数据", this.level, this.level.monster)
    return this.level
  },
  getKongfuNameById(id) {
    return this.kongfuData[id]
  },
  getSkillById(id) {
    return this.skillData[id]
  },
  // -------------------- 玩家数据操作-----------------
  /**
   * 绑定数据到game
   * @author uu
   */
  freshenData() {
    this._game.player = this.player
    this._game.level = this.level
  },
  /**
   * 获取game的数据 记入本地储存
   * @author uu
   */
  updataData() {
    this.player = this._game.player
  },
  // -------------------- 存档原始与微信API -----------------------
  loadData() {
    let data = JSON.parse(cc.sys.localStorage.getItem('userData'));
    this.player = data.player
    this.level = data.level
    this.initLevelData(this.level.id)
    return data
  },
  saveData() {
    cc.sys.localStorage.setItem('userData', JSON.stringify({
      player: this.player,
      level: this.level
    }));
  },
  checkIsFristTimePlay() {
    let isFristTime = cc.sys.localStorage.getItem('isFristTime')
    if (!isFristTime) {
      cc.sys.localStorage.setItem('isFristTime', false);
      return true
    } else {
      return false
    }
  },



  // loadDataWX() {

  // },
  // saveDataWX() {

  // },
  // checkIsFristTimePlayWX() {
  //   // 判断是否第一次游戏 是新玩家则返回true
  //   let self = this
  //   wx.getStorage({
  //     key: 'isFristTime',
  //     fail: (res) => {
  //       self._controller.gameController.onOpenGuidePage()
  //       wx.setStorage({
  //         key: 'isFristTime',
  //         data: {
  //           isFristTime: 1
  //         }
  //       })
  //       return true
  //     }
  //   })
  //   return false
  // },


  // -------------------- 其他数据存储 ----------------

});