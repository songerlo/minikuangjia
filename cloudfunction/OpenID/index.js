// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "miniprogram-scaffold" })

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    OPENID,
    APPID,
    UNIONID="",   
  } = cloud.getWXContext()
  return {
    OPENID,
    APPID,
    UNIONID
  }
  //unionid 获取限制比较多，getWXContent只支持同一主体的账号获取
  //说明文档：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/union-id.html?t=18122815
  
}