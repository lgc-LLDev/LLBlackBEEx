"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLocalInfo = exports.queryLocal = exports.banPlayer = exports.formatLocalKickMsg = void 0;
const config_1 = require("./config");
const util_1 = require("./util");
function formatLocalKickMsg(data) {
    const { reason, endTime } = data;
    return config_1.config.kickByLocalMsg
        .replace(/%REASON%/g, reason ?? '无')
        .replace(/%ENDTIME%/g, endTime ? (0, util_1.formatDate)({ date: new Date(endTime) }) : '永久');
}
exports.formatLocalKickMsg = formatLocalKickMsg;
function banPlayer(data, options = {}) {
    let name;
    let xuid;
    let ip;
    let clientId;
    if ('player' in data) {
        const { player } = data;
        ({ realName: name, xuid } = player);
        ({ ip, clientId } = player.getDevice());
    }
    else {
        ({ name, xuid, ip, clientId } = data);
    }
    if (ip)
        ip = (0, util_1.stripIp)(ip);
    const queryParams = [name, xuid, ip, clientId].filter((v) => v);
    if (!queryParams.length)
        return false;
    const results = [];
    for (const it of config_1.localList.list) {
        if ((name && name === it.name) ||
            (xuid && xuid === it.xuid) ||
            (ip && it.ips && it.ips.includes(ip)) ||
            (clientId && it.clientIds && it.clientIds.includes(clientId)))
            results.push(it);
    }
    const isModify = !!results.length;
    if (!isModify) {
        const it = {
            ips: [],
            clientIds: [],
        };
        config_1.localList.list.push(it);
        results.push(it);
    }
    const { time, reason } = options;
    const endTime = time ? new Date(Date.now() + time).toJSON() : undefined;
    for (const it of results) {
        if (name)
            it.name = name;
        if (xuid)
            it.xuid = xuid;
        if (ip)
            it.ips = (0, util_1.pushNoDuplicateItem)(it.ips || [], ip);
        if (clientId)
            it.clientIds = (0, util_1.pushNoDuplicateItem)(it.clientIds || [], clientId);
        if (endTime)
            it.endTime = endTime;
        if (reason)
            it.reason = reason;
    }
    if ('player' in data) {
        const { kickTip } = options;
        data.player.kick(kickTip ?? formatLocalKickMsg(results[0]));
    }
    (0, config_1.saveLocalList)();
    return { isModify, results };
}
exports.banPlayer = banPlayer;
function queryLocal(param, moreInfo = false, strict = false) {
    param = param.trim();
    const params = strict ? [param] : param.split(/\s/g);
    const ret = [];
    // 遍历列表中的对象
    for (const it of config_1.localList.list) {
        const { name, xuid, ips, clientIds } = it;
        const willCheck = [name, xuid];
        if (moreInfo) {
            if (ips)
                willCheck.push(...ips);
            if (clientIds)
                willCheck.push(...clientIds);
        }
        // 遍历待匹配的值
        for (const val of willCheck) {
            // 使用搜索词匹配 value
            if (val &&
                (0, util_1.checkValInArray)(params, (pr) => strict ? val === pr : val.includes(pr))) {
                ret.push(it);
                break;
            }
        }
    }
    return ret;
}
exports.queryLocal = queryLocal;
function formatLocalInfo(obj, moreInfo = false) {
    const formatList = (li) => li && li.length ? `\n${li.map((v) => `  - §b${v}§r`).join('\n')}` : '§b无';
    const { name, xuid, ips, endTime, clientIds, reason } = obj;
    const lines = [];
    lines.push(`§2玩家ID§r： §l§d${name ?? '未知'}§r`);
    lines.push(`§2XUID§r： §b${xuid ?? '未知'}`);
    lines.push(`§2记录原因§r： §b${reason ?? '无'}`);
    if (moreInfo)
        lines.push(`§2结束时间§r： §b${endTime ? (0, util_1.formatDate)({ date: new Date(endTime) }) : '永久'}`);
    if (moreInfo)
        lines.push(`§2已记录IP§r： ${formatList(ips)}`);
    if (moreInfo)
        lines.push(`§2已记录设备ID§r： ${formatList(clientIds)}`);
    return lines.join('\n');
}
exports.formatLocalInfo = formatLocalInfo;
