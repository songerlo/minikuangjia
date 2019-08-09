var http = require('../utils/http.js');
var config = require('../utils/config.js');

// 格式化日期
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 辅助函数：格式化数字
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 判断是否为非空数组
function judgeArr (arr) {
  if (arr && Array.isArray(arr)) {
    if (arr.length > 0) {
      return true
    }
  } else {
    return false
  }
}

// 判断是否为非空对象
function judgeObj (obj) {
  if (obj && Object.prototype.toString.call(obj) === '[object Object]' && JSON.stringify(obj) !== '{}') {
    return true
  } else {
    return false
  }
}

// 依据属性值A获取数组arr中与属性值A一致的对象,如传参数属性B,则获取该对象中的属性B对应的具体值
function search(arr, propAObj, propB) {
  if (!judgeArr(arr) || !judgeObj(propAObj)) {
      return null
  }
  let arrLen = arr.length
  let propAKey = Object.getOwnPropertyNames(propAObj)[0]
  let propAValue = propAObj[propAKey]
  for (let i = 0; i < arrLen; i ++) {
    if (arr[i][propAKey] === propAValue) {
      if (propB) {
        return arr[i][propB]
      } else {
        return arr[i]
      }
    }
  }
  return null
}

//  去除对象中为空的属性值：如null, '', undefined
function dealObj (obj) {
  if (!judgeObj(obj)) {
    return null
  }
  for (let key in obj) {
    if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
      delete obj[key]
    }
  }
  return obj
}

// 将对象转化为url参数(考虑到对象形式的值，将值的形式采用json字符串的方式)
function objToParam (obj) {
  if (!judgeObj(obj)) {
    return null
  }
  let resultStr = ''
  for (let key in obj) {
    let value = obj[key]
    if (value instanceof Object) {
      value = JSON.stringify(value)
    }
    resultStr += key + '=' + value + '&'
  }
  resultStr = resultStr.slice(0, -1)
  return resultStr
}

// 将options中获取的url参数转化为对象(解析值为json字符串的方式)
function paramToObj (param) {
  if (!judgeObj(param)) {
    return null
  }
  let obj = {}
  for (let key in param) {
    let value = param[key]
    value = JSON.parse(value)
    obj[key] = value
    }
  obj = dealObj(obj)
  return obj
}

/** 
* 封装分享方法 
* title:转发标题
* imgUrl:自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
* shareid:当前时间戳+4位随机数
* buttonName:分享的页面的名字
* params:分享需要的其他参数对象
* callback:回调函数，如需要，传参即可
* 基本使用方式（在页面page的js里面）:
* onShareAppMessage: function () {
  return util.share()
}
*/
function share (title, imgUrl, shareid, buttonName, params, callback) {
  var obj = {
    title: title || '小程序框架',
    path: `/pages/index/index?share_id=${shareid}&${objToParam(params)}`,
    success: ()=> {
      callback && callback()
    }
  }
  if(imgUrl) {
    obj.imageUrl = imgUrl
  }
  let path = config.api_rootspath.api + '/api/users/shares';
  let data = {
    client_id: getApp().globalData.client_id,
    button_name: buttonName,
    share_id: shareid,
    params: JSON.stringify(params)
  };
  http.ajax(path, data, 'post').then(res => {
    if (res.Code === 0) {
      console.log('share ok');
    }
  }).catch(err => {
    console.log(err);
  });
  console.log(obj);
  return obj;
}

// 获取当前页面名称
function getPageName () {
  //获取加载的页面
  var pages = getCurrentPages()
  // 最近一个路由是当前进入页面的路由，取出
  var a = pages[pages.length-1].route;  
  // 把路由拆分为数组的形式
  var b = a.split("/");  
  // 取出数组中最后一个值
  var c = b.slice(b.length-1, b.length).toString(String).split("."); 
  // 返回页面名字
  return c[0];
}
// 生成随机数
function randNum (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//对外暴露方法和内容
module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  judgeArr: judgeArr,
  judgeObj: judgeObj,
  dealObj: dealObj,
  search: search,
  objToParam: objToParam,
  paramToObj: paramToObj,
  share: share,
  getPageName: getPageName,
  randNum: randNum
}