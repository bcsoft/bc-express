// 快递：EMS
define(["jquery"], function ($) {
  'use strict';
  var impl = function (code) {
    return Promise.resolve($.getJSON("http://www.kuaidi100.com/query?callback=?&type=ems&postid=" + code));
  };

  // 扩展信息
  impl.ext = {
    name: "EMS",											// 快递名称
    url: "http://www.ems.com.cn",							// 官网地址
    searchUrl: "http://www.kuaidi100.com/all/ems.shtml",	// 快捷查询地址
    len: 12,
    sample: "688669334987"
  };

  return impl;
});