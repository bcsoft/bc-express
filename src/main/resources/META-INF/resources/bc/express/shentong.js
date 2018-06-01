// 快递：申通快递
define(["jquery"], function ($) {
  'use strict';
  var impl = function (code) {
    return Promise.resolve($.getJSON("http://www.kuaidi100.com/query?callback=?&type=shentong&postid=" + code));
  };

  // 扩展信息
  impl.ext = {
    name: "申通快递",											// 快递名称
    url: "http://www.sto.cn",									// 官网地址
    searchUrl: "http://q.sto.cn/track.aspx?wen={0}",			// 快捷查询地址
    len: 12,
    sample: "111111111111"
  };

  return impl;
});