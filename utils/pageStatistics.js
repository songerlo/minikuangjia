/**
 * 使用方式：在页面引入var pageStatistics = require('../../config/pageStatistics.js')，
 * 生命周期的onShow里引入pageStatistics.PageIn(), 在onHide里引入pageStatistics.PageOut()
 */
var config = require('./config.js')
var util = require('./util.js')
let pageInfo = {}
// 进入页面时获取的参数
var PageIn = ()=>{
    let visitDate = new Date;
    pageInfo.VisitTime = Date.parse(visitDate);
    pageInfo.ClientType = getApp().globalData.ClientType;
    pageInfo.PageName = util.getPageName();
    pageInfo.ProjectName = getApp().globalData.projectname;
    pageInfo.ClientID = config.api_rootspath.client_id;
    
}
// 离开页面时获取的参数并发送请求
var PageOut = ()=>{
    let leaveDate = new Date;
    pageInfo.LeaveTime = Date.parse(leaveDate);
    pageInfo.IP = getApp().globalData.ip;
    pageInfo.UserID = getApp().globalData.open_id;   
    wx.request({
        url: config.api_rootspath.api_statistics, 
        data: pageInfo,
        header: {
            'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        success: function(res) {
          console.log('统计页面请求发送成功了',res.data)
        }
    })
}

module.exports = { PageOut, PageIn }