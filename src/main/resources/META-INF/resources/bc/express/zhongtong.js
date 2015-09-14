// 快递：中通快递
define(["jquery"], function ($) {
	'use strict';
	var impl = function (code) {
		return Promise.resolve($.getJSON("http://www.kuaidi100.com/query?callback=?&type=zhongtong&postid=" + code));
	};

	// 扩展信息
	impl.ext = {
		name: "中通快递",												// 快递名称
		url: "http://www.zto.cn",										// 官网地址
		searchUrl: "http://www.zto.cn/GuestService/Bill?txtBill={0}",	// 快捷查询地址
		len: 12,
		sample: "1111111111111"
	};

	return impl;
});