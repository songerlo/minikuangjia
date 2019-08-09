## 小程序开发框架

### 1.框架说明

使用小程序快速启动模版搭建，包含小程序开发常用的一些功能。

### 2.使用方法

下载安装微信开发者工具，在微信开发者工具中打开框架代码，具体使用方法参考[小程序简易教程](https://developers.weixin.qq.com/miniprogram/dev/index.html)。

### 3.框架目录

```javascript
// miniprogram-scaffold
|--common // 小程序公共模版文件目录
	|--common.wxs // 小程序的一套脚本语言，实现在wxml页面中调用自定义的JavaScript函数
	|--template.wxml // wxml公共模版，可在wxml文件中引入
	|--template.wxss // wxml公共模版的wxss文件，已在app.wxss中引入
|--components // 小程序组件目录
	|--authorization // 小程序授权、认证组件，在首页调用
    	|--authorization.js // 组件的js文件
		|--authorization.json // 组件的json配置文件
		|--authorization.wxml // 组件的wxml文件
		|--authorization.wxss // 组件的wxss文件
|--images // 小程序图片目录
|--pages // 小程序页面目录，所有页面写在此文件夹下面
	|--index // 小程序首页
    	|--index.js // 首页的js文件
		|--index.json // 首页的json配置文件
		|--index.wxml // 首页的wxml文件
		|--index.wxss // 首页的wxss文件
|--plugins // 小程序插件目录
	|--wxParse // 小程序富文本解析插件
    |--promise.js // 小程序promise插件
|--utils // 小程序公共函数库目录
	|--config.js // 小程序项目接口配置
	|--http.js // 小程序封装的请求方法
	|--util.js // 小程序公共函数库
|--app.js // 小程序的js文件
|--app.json // 小程序的配置文件
|--app.wxss // 小程序的wxss文件
|--project.config.json // 小程序项目配置文件
```

### 4.函数介绍

#### 4.1 common.wxs

| 函数名称    | 参数                                       | 函数返回值                       | 函数作用                               |
| ----------- | ------------------------------------------ | -------------------------------- | -------------------------------------- |
| differ      | today（当前时间戳）, time（历史时间戳）    | ‘刚刚’，‘多少小时前’，‘多少天前’ | 求两个时间戳的差，返回格式化的差值     |
| judgeArr    | arr（数组）, element（元素，简单数据类型） | true、false                      | 查找数组中是否存在某元素               |
| formatTime  | time（时间，秒）                           | 分:秒                            | 对秒进行格式化，用于显示音频、视频时间 |
| numberToFix | value（数字）                              | 取整后的数字                     | 对数字取整                             |

#### 4.2 util.js

| 函数名称        | 参数                                                         | 函数返回值          | 函数作用            |
| --------------- | ------------------------------------------------------------ | ------------------- | ------------------- |
| formatTime      | date（日期对象）                                             | 时:分:秒            | 格式化日期          |
| formatNumber    | n（数字）                                                    | 补零后的数字        | 格式化数字          |
| judgeArr        | arr（数组）                                                  | true、false         | 判断是否为非空数组  |
| judgeObj        | obj（对象）                                                  | true、false         | 判断是否为非空对象  |
| **objToParam**  | obj（对象）                                                  | k=value形式的字符串 | 将对象转化为url参数 |
| **paramToObj**  | param（url参数）                                             | 对象                | 将url参数转化为对象 |
| **share**       | title（转发标题）、imgUrl（图片路径）、shareid（当前时间戳+4位随机数）、buttonName（分享的页面的名字）、params（分享需要的其他参数对象）、callback（回调函数） | 对象                | 自定义分享          |
| **getPageName** |                                                              | 当前页面名称字符串  | 获取当前页面名称    |
| **randNum**     | min（最小值）, max（最大值）                                 | 随机数              | 生成随机数          |







