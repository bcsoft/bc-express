// 快递：韵达速递
define(["jquery"], function ($) {
  'use strict';
  var impl = function (code) {
    return Promise.resolve($.getJSON("http://www.kuaidi100.com/query?callback=?&type=yunda&postid=" + code));
  };

  // 扩展信息
  impl.ext = {
    name: "韵达速递",											// 快递名称
    url: "http://www.yundaex.com",								// 官网地址
    searchUrl: "http://www.kuaidi100.com/all/yd.shtml",			// 快捷查询地址
    len: 13,
    sample: "1111111111111"
  };

  return impl;
});