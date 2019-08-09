// components/Authorization/authorization.js
var config = require('../../utils/config.js');


Component({
 
  /**
   * 组件的初始数据
   */
  data: {
    isAuthorized: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   */
  created(){
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 设置显示与隐藏
    setIsShow: function() {
      this.setData({
        isAuthorized: false
      })
    },
    // 隐藏授权按钮
    _hide: function() {
      this.setData({
        isAuthorized: true
      })
    },
    // 允许授权
    _authorization_allow: function(e) {
      let handler = this;
      let app = getApp();
      if (e.detail.userInfo) {
        // 保存用户信息
        app.globalData.wxUserInfo.wx_name = e.detail.userInfo.nickName;
        app.globalData.wxUserInfo.wx_avatarUrl = e.detail.userInfo.avatarUrl;
        if (e.detail.userInfo.gender === 1) {
          app.globalData.wxUserInfo.wx_gender = 'b';
        } else {
          app.globalData.wxUserInfo.wx_gender = 'g';
        }

        //调用云函数获取openid
        wx.cloud.init();
        wx.cloud.callFunction({
          // 需调用的云函数名
          name: 'OpenID',
          data: {}
        }).then(result =>{
          app.globalData.wxUserInfo.wx_openid = result.result.APPID
          app.globalData.wxUserInfo.wx_unionid = result.result.UNIONID;
          app.globalData.wxUserInfo.wx_appid = result.result.APPID;
          console.log("app.globalData.wxUserInfo",app.globalData.wxUserInfo);
        })

      } else {
        handler.setIsShow();
      }
    }
  }
})
