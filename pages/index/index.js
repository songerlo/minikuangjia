var config = require('../../utils/config.js');
var http = require('../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 初次授权触发
  indexStart: function () {
    console.log('授权成功');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let __token__ = wx.getStorageSync('__token__');
    if (__token__) {
      this.indexStart();
    } else {
      // 弹出授权窗口
      this.selectComponent("#authorization").setIsShow();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
})