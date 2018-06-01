// 快递：圆通速递
define(["jquery"], function ($) {
  'use strict';
  var impl = function (code) {
    return Promise.resolve($.getJSON("http://www.kuaidi100.com/query?callback=?&type=yuantong&postid=" + code));
  };

  // 扩展信息
  impl.ext = {
    name: "圆通速递",											// 快递名称
    url: "http://www.ytoexpress.com",							// 官网地址
    searchUrl: "http://www.kuaidi100.com/all/yt.shtml",			// 快捷查询地址
    len: 10,
    sample: "1111111111"
  };

  return impl;
});