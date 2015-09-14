-- 增加选项：快递类型
delete from bc_option_item where pid = (select id from bc_option_group where key_ = 'expressType');
delete from bc_option_group where key_ = 'expressType';
INSERT INTO bc_option_group(id, key_, value_, order_, icon)
	VALUES (nextval('CORE_SEQUENCE'), 'expressType', '快递类型', '5062', NULL);
INSERT INTO bc_option_item(id, pid, status_, key_, value_, order_)
	VALUES (nextval('CORE_SEQUENCE'), (select id from bc_option_group where key_ = 'expressType')
	, 0, 'ems', 'EMS', '01');
INSERT INTO bc_option_item(id, pid, status_, key_, value_, order_)
	VALUES (nextval('CORE_SEQUENCE'), (select id from bc_option_group where key_ = 'expressType')
	, 0, 'shunfeng', '顺丰速运', '02');
INSERT INTO bc_option_item(id, pid, status_, key_, value_, order_)
	VALUES (nextval('CORE_SEQUENCE'), (select id from bc_option_group where key_ = 'expressType')
	, 0, 'yunda', '韵达速递', '03');
INSERT INTO bc_option_item(id, pid, status_, key_, value_, order_)
	VALUES (nextval('CORE_SEQUENCE'), (select id from bc_option_group where key_ = 'expressType')
	, 0, 'yuantong', '圆通速递', '04');
INSERT INTO bc_option_item(id, pid, status_, key_, value_, order_)
	VALUES (nextval('CORE_SEQUENCE'), (select id from bc_option_group where key_ = 'expressType')
	, 0, 'shentong', '申通快递', '05');
INSERT INTO bc_option_item(id, pid, status_, key_, value_, order_)
	VALUES (nextval('CORE_SEQUENCE'), (select id from bc_option_group where key_ = 'expressType')
	, 0, 'zhongtong', '中通快递', '06');