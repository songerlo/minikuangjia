/**
 * 小程序封装的请求方法
 * ajax, getToken
 * 使用方法：
 * 1.页面引入:  var http = require('../../utils/http.js')
 * 2.调用:  http.ajax(地址，数据，请求方法)  http.getToken()
 * 注意：
 * getToken的请求的url、失败跳转的url需要配置
 */
var config = require("./config");
var Promise = require('../plugins/promise.js');
var AuthUrl = "/pages/index/index"; //请求授权页面

function ajax(url, data, method) {
  if (wx.getStorageSync('__token__') == "") {
    getToken();
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data || {},
      method: method || 'get',
      header: {
        'Authorization': 'bearer ' + wx.getStorageSync('__token__')
      },
      success: function(obj) {
        if (obj.statusCode == 200) {
          if (obj.data.Code == 1000) {
            //重新获取token
            getToken();
          } else {
            resolve(obj.data);
          }
        } else if (obj.statusCode == 401) {
          // 重新获取token
          getToken();
        }
      },
      fail: function(res) {
        reject(res);
      }
    })
  })
}

function getToken() {
  // 登录
  return new Promise((resolve, reject) => {
    wx.login({
      // 登陆成功
      success: function(resCode) {
        console.log('resCode.code', resCode.code);
        // 获取授权信息
        wx.getSetting({
          // 获取用户授权信息成功
          success: function(res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                // 获取用户信息成功
                success: function(res) {
                  console.log('getUserInfo信息', res);
                  // 获取用户token
                  wx.request({
                    url: config.project.api_token_path + "/OAuth/Token",
                    data: {
                      grant_type: 'password', //授权类型
                      client_id: config.project.client_id, //客户端编号
                      client_secret: config.project.client_secret, //客户端密钥
                      username: 'WeChat_' + resCode.code + '_' + res.iv, //格式'WeChat_'+code+'_'+iv,   code:wx.login成功获取到的code,  iv:wx.getUserInfo()成功之后得到的iv
                      password: res.encryptedData //encryptedData,小程序使用wx.getUserInfo得到的 临时登录凭证encryptedData
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    method: 'POST',
                    // 成功获取用户token
                    success: function(res) {
                      console.log('tokenRes', res);
                      if (res.statusCode === 200) {
                        wx.setStorageSync('__token__', res.data.access_token)
                        resolve()
                        console.log('获取token', res.data);
                      } else {
                        console.log('重新登陆获取的code');
                      }
                    },
                    // 获取用户token失败
                    fail: function(error) {
                      console.log('获取用户token失败', error);
                      wx.redirectTo({
                        url: AuthUrl
                      })
                    }
                  })
                },
                // 获取用户信息失败
                fail: function(error) {
                  console.log('请获取授权信息', error);
                  wx.redirectTo({
                    url: AuthUrl
                  })
                }
              })
            } else {
              console.log('用户不允许获取个人信息');
              // wx.redirectTo({
              //   url: AuthUrl
              // })
            }
          },
          // 获取用户授权信息失败
          fail: function(error) {
            console.log('获取用户信息失败', error);
            wx.redirectTo({
              url: AuthUrl
            })
          }
        })
      },
      fail: function(error) {
        console.log('login失败', error)
      }
    })
  })
}

module.exports = {
  ajax
}