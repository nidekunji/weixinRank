var wxAPI = {
    type: {
        show:"show",
        hide:"hide",
    },
     SetStartTime: function(){
        if(cc.sys.platform === cc.sys.WECHAT_GAME)
        {
            var time  = new Date().getTime();
            wx.setUserCloudStorage(
                {
                    KVDataList : [{key:"lv",value:"1"},{key:"rank",value:"1"},{key:"start",value:time.toString()}],
                    success : function(args){console.log("wxAPI ->  setUserCloudStorage sucess .",args);
                    },
                    fail : function(args){
                        console.log("wxAPI ->  setUserCloudStorage fail .",args);
                    }
                }
            );
        }
    },

    SetQuitTime: function() {
        if(cc.sys.platform === cc.sys.WECHAT_GAME)
        {
            var time  = new Date().getTime();
            wx.setUserCloudStorage(
                {
                    KVDataList : [{key:"lv",value:"1"},{key:"rank",value:"1"},{key:"leave",value:time.toString()}],
                    success : function(args){console.log("wxAPI ->  setUserCloudStorage sucess .",args);
                    },
                    fail : function(args){
                        console.log("wxAPI ->  setUserCloudStorage fail .",args);
                    }
                }
            );
        }
    },

    SendMessage: function(type,param){
        if(cc.sys.platform === cc.sys.WECHAT_GAME)
        {
            wx.postMessage({
                message: type,
                params : param
            })
        }
    },

    init: function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wxAPI.SetStartTime();
            wxAPI.SetQuitTime();
        }
    },

    ///显示子域
    Show: function(num){
        this.SendMessage(this.type.show,num);
    },

    ///隐藏子域
    Hide: function(){this.SendMessage(this.type.hide);},

    ///清空显示
    Clear: function(){this.SendMessage(this.type.clear);}
};
module.exports = wxAPI;