
//let playerData = require('playerData');

cc.Class({
    extends: cc.Component,

    properties: {
        _userName: '',
        loginButton: cc.Button,
    },

    onLoad() {
        
    },
    init () {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            console.log("微信平台，检查授权");
            this.checkAuth();
           // this._createGameClubBtn();
        }
    },

    // onEnable() {
    //     if (cc.sys.platform == cc.sys.WECHAT_GAME) {
    //         console.log("微信平台");
    //         this.checkAuth();
    //        // this._createGameClubBtn();
    //     }
    // }, 

    /* ********************* wechat ******************** */

    // 游戏圈
    _createGameClubBtn() {
        if (!this._gameClubBtn) {
            this._gameClubBtn = wx.createGameClubButton({
                icon: 'green',
                style: {
                    left: 10,
                    top: 76,
                    width: 40,
                    height: 40
                }
            });
            this._gameClubBtn.show();
        }
    },

    checkAuth() {
        let self = this
        console.log('检查用户授权');
        wx.getSetting({
            success: (res) => {
                var authSetting = res.authSetting;
                if (authSetting['scope.userInfo'] === true) {
                    // 用户已授权，可以直接调用相关 API
                    console.log('用户已经授权');
                    // 添加头像和名字
                    // self.createAuthButton()
                   // this.getUserInfo();
                } else if (authSetting['scope.userInfo'] === false) {
                    // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                    console.log('用户拒绝收授权');
                    // self.toAuthPage();
                    self.createAuthButton()
                } else {
                    // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
                    console.log('发起用户授权')
                    // self.toAuthPage()
                    self.createAuthButton()
                }
            },
            fail: function (res) {
                console.log(res, "res-----------in fail");
            },
        })
    },

    toStartPage() {
        console.log("关闭授权按钮");
        this.OpenSettingButton.destroy();
    },

    toAuthPage() {
        console.log("打开授权按钮");
        this.OpenSettingButton = wx.createOpenSettingButton({
            type: 'text',
            text: '打开设置页面',
            style: {
                left: 10,
                top: 76,
                width: 200,
                height: 40,
                lineHeight: 40,
                backgroundColor: '#000000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        });
    },//打开授权按钮

    createAuthButton() {
        console.log("创建用户授权点击按钮");
        let self = this
       let btn = this.loginButton.node;
       let pos = btn.convertToWorldSpace(cc.v2(0, 0));
       let designSize = cc.director.getWinSize();
       let frameSize = cc.view.getFrameSize();
       let xScale = frameSize.width / designSize.width, yScale = frameSize.height / designSize.height;
       let x = pos.x, y = designSize.height - pos.y - btn.height;
        this.getUserInfobutton = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
                left: x * xScale,
                top: y * yScale,
                width: btn.width * xScale,
                height: btn.height * yScale,
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4,
                lineHeight: 50,
            }
        });
        self.getUserInfobutton.onTap((res) => {
            console.log('button res', res);
            // 如果授权成功 就保存信息
            if (res.userInfo) {
                self.onGetUserInfo(res.userInfo);
                self.getUserInfobutton.destroy();
            }
            else {
                // self.toAuthPage();
            }
        })
    },

    getUserInfo() {
        let self = this;
        wx.getUserInfo({
            success: function (res) {
                self.onGetUserInfo(res.userInfo);
            }
        })
    },

    onGetUserInfo(userInfo) {
        cc.log('userInfo: ', userInfo);
        this.userInfo = userInfo;
        
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
});
