// 快递：顺丰速运
define(["jquery"], function ($) {
	'use strict';
	var impl = function (code) {
		return Promise.resolve($.getJSON("http://www.kuaidi100.com/query?callback=?&type=shunfeng&postid=" + code));
	};

	// 扩展信息
	impl.ext = {
		name: "顺丰速运",											// 快递名称
		url: "http://www.sf-express.com",							// 官网地址
		searchUrl: "http://www.sf-express.com/cn/sc/dynamic_functions/waybill/#search/bill-number/{0}",	// 快捷查询地址
		len: 12,
		sample: "688669334987"
	};

	return impl;
});