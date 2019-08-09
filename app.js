var config = require('./utils/config.js');
let http = require("./utils/http.js");
//app.js
App({

  //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch: function () {
    //获取系统信息
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.systemInfo = res;
        console.log(that.globalData.systemInfo.version);
      },
      fail: function(error){
        console.log('获取用户设备失败',error);
      }
    });
    // 获取客户端ip
    wx.request({
      url: 'http://ip-api.com/json',
      success:function(e){
        that.globalData.systemInfo.clientip = e.data.query;
      },
      fail:function(error){
        console.log('获取客户端ip失败',error);
      }
    });

    //检测版本升级
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("版本检查",res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    //打开调试 正式版本无效
    wx.setEnableDebug({
      enableDebug: true
    })

    //获取在线配置
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('Config').orderBy('k', 'asc')
      .get()
      .then( result =>{
          that.globalData.onlineconfig = result.data
          console.log("onlineconfig", that.globalData.onlineconfig);

        let showad =getApp().getConfig("showad");
        console.log("showad", showad);
        }
      )
      .catch(console.error)

  },

  //当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow:function(){

  },
  //当小程序从前台进入后台，会触发 onHide
  onHide:function(){

  },
  globalData: {
    //当前系统信息
    systemInfo:{     
      clientip:'',           //客户端ip
      brand:'',              //手机品牌
      model:'',              //手机型号	
      pixelRatio:0,          //设备像素比	
      screenWidth:0,         //屏幕宽度	
      screenHeight:0,        //屏幕高度	
      windowWidth:0,	       //可使用窗口宽度	
      windowHeight:0,        //可使用窗口高度	
      statusBarHeight:0,     //状态栏的高度	
      language:'',	         //微信设置的语言	
      version:'',            //微信版本号	
      system:'',             //操作系统版本	
      platform:'',           //客户端平台	
      fontSizeSetting:0,	   //用户字体大小设置。以“我-设置 - 通用 - 字体大小”中的设置为准，单位 px。	1.5.0
      SDKVersion:''	         //客户端基础库版本	
     },
    //当前微信登录账号信息
    wxUserInfo: {
      wx_name: '',           //微信昵称
      wx_gender: '',         //性别
      wx_avatarUrl: '',      //头像
      wx_openid:'',          //openid
      wx_unionid:'',         //微信unionid
      wx_appid:''            //微信小程序id
    },
    //在线配置
    onlineconfig:null

  },
  //暴露给外界读取在线配置
  getConfig(k){
    let value = getApp().globalData.onlineconfig.find(function (element) {
      return element.k == k;
    });
    return value.v;
  }
  
})