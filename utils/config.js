/**
 * 小程序配置文件
 * 配置环境及接口地址
 * 使用方法：
 * 1.页面引入:  var config = require('../../utils/config.js')
 */

// 开发环境: 0 模拟数据mockapi, 1 开发, 2正式, 3 测试服务器
var mode = 0;


// token获取 api path
var api_token_paths = [
  'http://muser.yqj.cn/api',        // 模拟地址
  'http://tuser.yqj.cn/api',        // 开发地址
  'https://user.aipublish.cn/api',  // 正式地址
  'http://tuser.yqj.cn/api'         // 测试地址
];
// 服务器端获取用户唯一标识（token信息）时传入的参数信息

var client_ids = [
  'yqj201901032024598095',          // 模拟服务器
  'yqj201901032024598095',          // 开发服务器
  'yqj201901032024598095',          // 正式服务器
  'yqj201901032024598095'           // 测试服务器
];
// 获取Token密匙
var client_secrets = [
  '50f31657fb2f47c599b307ff52ee3f41', // 模拟服务器
  '50f31657fb2f47c599b307ff52ee3f41', // 开发服务器
  '50f31657fb2f47c599b307ff52ee3f41', // 正式服务器
  '50f31657fb2f47c599b307ff52ee3f41'  // 测试服务器
];

// 程序数据接口，用于当前小程序数据获取
var api_roots_paths = [
  '', // 模拟地址
  '', // 开发地址
  '', // 正式地址
  '', // 测试地址
];

// 开放平台，用于广告
var api_openApi_paths = [
  'http://topen.yqj.cn/api',              // 模拟地址
  'http://topen.yqj.cn/api',                    // 开发地址
  'https://open.aipublish.cn/api',              // 正式地址
  'http://topen.yqj.cn/api'                     // 测试地址
];

// 统计数据接口，用于数据统计
var api_statistics_paths = [
  'http://topen.yqj.cn/api/Statistics/PageVisit', // 模拟地址
  'http://topen.yqj.cn/api/Statistics/PageVisit', // 开发地址
  'http://open.yqj.cn/api/Statistics/PageVisit',  // 正式地址
  'http://topen.yqj.cn/api/Statistics/PageVisit', // 测试地址
]

// 领取奖励及按钮点击数据接口，用于领取奖励与按钮点击
var api_bookonline_paths = [
  'http://10.10.2.80:3402',       // 模拟地址
  'http://10.10.2.80:3402',       // 开发地址
  'https://wwwapi.aipublish.cn',  // 正式地址
  'https://testwwwapi.yqj.cn'     // 测试地址
];


// 配置信息
var project =
  {
    projectname:"",                                     // 项目名称
    api_token_path: api_token_paths[mode],              // 获取Token url
    client_id: client_ids[mode],                        // 获取Token 使用的的clientID
    client_secret: client_secrets[mode],                // 获取Token 使用的secret
    api_roots_path: api_roots_paths[mode],              // 程序数据接口地址
    api_statistics_path: api_statistics_paths[mode],    // 统计数据api path
    api_openApi_path: api_openApi_paths[mode],          // 广告api path
    api_bookonline_path: api_bookonline_paths[mode]    // 领取奖励及按钮点击
  };


// 对外暴露方法和内容
module.exports = {
  project: project
}