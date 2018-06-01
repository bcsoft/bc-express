define(["jquery", "bc"], function ($, bc) {
  'use strict';
  var findings = {};

  /**
   * 判断指定的快递信息是否处于查找过程中
   * @param type {String} 快递类型，如 ems、sf
   * @param code {String} 快递单号
   */
  function isFinding(type, code) {
    return !!findings[type + "|" + code];
  }

  function start(type, code) {
    findings[type + "|" + code] = true;
    bc.msg.slide("正在联网查询快递信息...");
  }

  function stop(type, code) {
    delete findings[type + "|" + code];
  }

  var express = {
    /**
     * 查看快递详情
     * @param type {String} 快递类型，如 ems、shunfeng
     * @param code {String} 快递单号
     */
    show: function (type, code) {
      var $exists = $("#" + type + code);
      if ($exists.length > 0) {
        $exists.dialog().show();
        return;
      }

      express.get(type, code).then(function (data) {
        console.log("ok: data=%o", data);
        if (!data) return;

        // 查看快递详情
        if (!$.isArray(data.data)) {
          bc.msg.slide("快递信息未录入！");
          return;
        }
        var impl = require("bc/express/" + type);
        var html = ['<div style="overflow-y:auto;font-weight:normal" id="' + type + code + '">'];
        html.push('<div style="font-weight:bold;padding: 0.2em">');
        html.push('<a href="' + impl.ext.url + '" target="_blank">' + impl.ext.name + '</a>');
        html.push(' <a href="' + impl.ext.searchUrl.format(code) + '" target="_blank">' + code + '</a>');
        html.push('</div>');
        html.push('<table class="table" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;font-weight:normal"><tbody>');
        html.push('<colgroup style="width:11em"></colgroup>');
        html.push('<colgroup style="width:auto"></colgroup>');
        var item;
        for (var i = 0; i < data.data.length; i++) {
          item = data.data[i];
          html.push("<tr><td class='ui-widget-content' style='vertical-align:top;padding: 0.2em'>" + item.time + "</td>");
          html.push("<td class='ui-widget-content' style='vertical-align:top;padding: 0.2em'>" + item.context + "</td></tr>");
        }
        html.push("</tbody></table></div>");
        $(html.join("")).dialog({
          title: "快递信息",
          width: 600, height: 300, dialogClass: "bc-ui-dialog ui-widget-header",
          close: function (event, ui) {
            $(this).dialog("destroy").remove();
          }
        });
      }, function (error) {
        console.log("error=%o", error);
        if (error) bc.msg.slide(error);
      });
    },

    /**
     * 获取快递信息
     * @param type {String} 快递类型，如 ems、sf
     * @param code {String} 快递单号
     * @return {Promise}
     */
    get: function (type, code) {
      console.log("express.get: type=%s, code=%s", type, code)
      if (!type) return Promise.reject("快递类型不能为空");
      if (!code) return Promise.reject("快递单号不能为空");
      if (isFinding(type, code)) return Promise.resolve(false);

      start(type, code);
      return new Promise(function (resolve, reject) {
        // 使用具体快递接口查找快递信息
        require(["bc/express/" + type], function (impl) {
          impl(code).then(function (data) {
            console.log("data=%o", data);
            if (typeof data != "object") {
              bc.msg.info("查询返回的快递结果格式不支持，可能是快递网站格式改变了，请联系开发组处理！", "查快递");
              reject(false);
            }
            if (data.status != "200") {
              bc.msg.info(data.message, "查快递");
              reject(false);
            } else {
              resolve(data);
            }

            stop(type, code);
          }, function (data) {
            reject(data);
            stop(type, code);
          });
        });
      });
    }
  };

  return express;
});