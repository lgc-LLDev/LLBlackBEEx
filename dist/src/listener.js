"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ban_1 = require("./ban");
const blackbe_1 = require("./blackbe");
const config_1 = require("./config");
const query_1 = require("./query");
const util_1 = require("./util");
// hhh
const listenerType = (config_1.config.processOnPreJoin
    ? 'onPreJoin'
    : 'onJoin');
mc.listen(listenerType, (0, util_1.wrapAsyncFunc)(async (player) => {
    // 查本地
    const { hidePassMessage, kickByCloudMsg, banIp, banDevice } = config_1.config;
    const { realName, xuid } = player;
    const { ip, clientId } = player.getDevice();
    const stripedIp = (0, util_1.stripIp)(ip);
    if (!hidePassMessage)
        logger.info(`正在从本地黑名单查询玩家 ${realName} 的封禁记录……`);
    try {
        for (const it of config_1.localList.list) {
            if (realName === it.name ||
                xuid === it.xuid ||
                (banIp && it.ips && it.ips.includes(stripedIp)) ||
                (banDevice && it.clientIds && it.clientIds.includes(clientId))) {
                // 更新信息，例如 ip 地址，顺便踢掉
                (0, ban_1.banPlayer)({ player }, { kickTip: (0, ban_1.formatLocalKickMsg)(it) });
                logger.warn(`查询到玩家 ${realName} 存在本地封禁记录，已将其踢出`);
                return;
            }
        }
    }
    catch (e) {
        logger.error(`查询玩家 ${realName} 的本地黑名单记录出错！\n${String(e)}`);
    }
    if (!hidePassMessage)
        logger.info(`没有查询到玩家 ${realName} 的本地黑名单记录`);
    // 查 BlackBE
    if (!hidePassMessage)
        logger.info(`正在从 BlackBE 查询玩家 ${realName} 的违规记录……`);
    try {
        const { data: { exist, info }, } = await (0, blackbe_1.check)({ name: realName, xuid });
        if (exist) {
            (0, ban_1.banPlayer)({ player }, { kickTip: kickByCloudMsg });
            const formattedInfo = `§6查询到玩家 §d${realName} §6在 BlackBE 中存在违规记录！\n` +
                `§c已将其踢出并加入本地黑名单！§r\n` +
                `${await (0, query_1.formatBlackBEInfo)(info[0])}`;
            mc.broadcast(formattedInfo);
            logger.warn((0, util_1.delFormatCode)(formattedInfo));
            return;
        }
    }
    catch (e) {
        logger.error(`查询玩家 ${realName} 的 BlackBE 违规记录出错！\n${String(e)}`);
    }
    if (!hidePassMessage)
        logger.info(`没有查询到玩家 ${realName} 的 BlackBE 违规记录`);
}));
setInterval(() => {
    const { list } = config_1.localList;
    const originalLen = list.length;
    let offset = 0;
    for (let i = 0; i < originalLen; i += 1) {
        const realI = i - offset;
        const it = list[realI];
        const { endTime } = it;
        const nowTime = Date.now();
        if (endTime && nowTime >= new Date(endTime).getTime()) {
            // del
            list.splice(realI, 1);
            offset += 1;
            (0, config_1.saveLocalList)();
            const formatted = (0, util_1.delFormatCode)((0, query_1.formatLocalItemShort)(it));
            logger.warn(`玩家 ${formatted} 的黑名单封禁到期，已自动解封`);
        }
    }
}, config_1.config.checkLocalListInterval);
