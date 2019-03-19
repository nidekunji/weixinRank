/**
 * @author uu
 * @file  排行榜组件
 * @todo  
 * @description 用户点击查看排行榜才检查授权,如果此时用户没有授权则进入授权界面
 */
let wxAPI = require("WxAPI");
cc.Class({
  extends: cc.Component,
  properties: {
    displayWeChat:cc.Sprite,
  },
  init(c) {
    this._controller = c;
  },
  start () {
    this.tex = new cc.Texture2D();
    wxAPI.init();
    if (cc.sys.platform === cc.sys.WECHAT_GAME)
    this.loadShareData();
  },
  showRankList () {
    if(cc.sys.platform === cc.sys.WECHAT_GAME)
    {
        console.log("xian shi pai hang bang");
        this.displayWeChat.node.active = true;
        wxAPI.Show(1);
    }
  },
  // --------------- share ----------------
  loadShareData() {
    wx.showShareMenu(false)
    wx.onShareAppMessage(function () {
      return {
        title: "这是分享信息这是分享信息",
        imageUrl: 'http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E6%BB%91%E7%A8%BD&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=2007851869,1311401458&os=2671889377,806813320&simid=3533123488,461696453&pn=11&rn=1&di=30645040800&ln=1881&fr=&fmq=1546669212501_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fimg.dongman.fm%2Fpublic%2F9022d95f1ab7f832bdc02a3d0055f59e.jpg&rpstart=0&rpnum=0&adpicid=0&force=undefined'
      }
    })
  },
  onShareButton(data) {
    wx.shareAppMessage({
      title: data.title,
      imageUrl: ''
    })
  },
  // ---------------- 授权 ----------------
  checkAuth() {
    console.log('检查用户授权')
    wx.getSetting({
      success: (res) => {
        var authSetting = res.authSetting
        if (authSetting['scope.userInfo'] === true) {
          // 用户已授权，可以直接调用相关 API
          cc.log('用户已经收授权')
          let userInfo = wx.getStorageSync('userInfo').userInfo
          //  cc.log('userInfo', userInfo)
          // 添加头像和名字
          this.onGetUserInfo(userInfo)
        } else if (authSetting['scope.userInfo'] === false) {
          // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
          cc.log('用户拒绝收授权')
        } else {
          // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
          cc.log('发起用户授权')
        }
      }
    })
  },
  backHome () {
    let page = this._controller.page;
    page.onOpenPage(2);
  },
  createAuthButton() {
    let self = this
    this.getUserInfobutton = wx.createUserInfoButton({
      type: 'text',
      text: '',
      style: {
        left: 0,
        top: 0,
        //width: this.windowWidth,
        //height: this.windowHeight,
        lineHeight: 600,
        backgroundColor: '#FFFFFF00',
        borderColor: '#FFFFFF',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 40,
        borderRadius: 4
      }
    })
    this.getUserInfobutton.onTap((res) => {
      // console.log('button res', res)
      // 如果授权成功 就保存信息
      if (res.userInfo) {
        wx.setStorage({
          key: 'userInfo',
          data: {
            userInfo: res.userInfo,
          }
        })
        self.onGetUserInfo(res.userInfo)
        this.getUserInfobutton.hide();
        self._controller.toStartPage()
      }
    })
  },
  onGetUserInfo(userInfo) {
    console.log('获取玩家授权', userInfo)
  },
  createImage(sprite, url) {
    let image = wx.createImage();
    image.onload = function () {
      let texture = new cc.Texture2D();
      texture.initWithElement(image);
      texture.handleLoadedTexture();
      sprite.spriteFrame = new cc.SpriteFrame(texture);
    };
    image.src = url;
  },

  
  update (dt) {
    if(cc.sys.platform == cc.sys.WECHAT_GAME)
        this._updaetSubDomainCanvas();
},


_updaetSubDomainCanvas () {
    var openDataContext = wx.getOpenDataContext();
    var sharedCanvas = openDataContext.canvas;
    this.tex.initWithElement(sharedCanvas);
    this.tex.handleLoadedTexture();
    this.displayWeChat.spriteFrame = new cc.SpriteFrame(this.tex);
    // let obj = wx.getLaunchOptionsSync();
    // console.log(obj,"getLaunchOptions");
   
},
});

