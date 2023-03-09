"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ban_1 = require("./ban");
const config_1 = require("./config");
const const_1 = require("./const");
const query_1 = require("./query");
const util_1 = require("./util");
function checkOp(player) {
    return !player || player.isOP();
}
const ONLT_OP_TEXT = '此命令仅限OP执行';
const NO_CONSOLE_TEXT = '此命令无法在控制台中执行';
const REFUSE_LIST_QUERY_TEXT = '本地黑名单请查阅插件配置文件，云黑记录请上云黑官网查询，懒得再给控制台查询写一套代码了';
function tell(msg, player) {
    if (player)
        player.tell(msg);
    else if (msg.startsWith('§c'))
        logger.error((0, util_1.delFormatCode)(msg.replace('§c', '')));
    else
        logger.info((0, util_1.delFormatCode)(msg));
}
function banCommand(willBan, time, reason, player) {
    if (time && time <= 0) {
        tell('§c封禁时间不能小于 0', player);
        return;
    }
    const willBanPlayer = mc.getPlayer(willBan);
    const isXuid = /^[0-9]{16}$/.test(willBan);
    const isIp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(willBan);
    const res = (0, ban_1.banPlayer)(willBanPlayer
        ? { player: willBanPlayer }
        : {
            name: (isXuid ? data.xuid2name(willBan) : null) ?? willBan,
            xuid: isXuid ? willBan : data.name2xuid(willBan) ?? undefined,
            ip: isIp ? willBan : undefined,
        }, {
        time: time ? time * 60 * 1000 : undefined,
        reason,
    });
    if (!res)
        return;
    const { isModify, results } = res;
    if (results.length) {
        tell(`§a已成功${isModify ? '修改' : '增加'} §6${results.length} §a条项目§r\n` +
            `${results.map((v) => `- ${(0, query_1.formatLocalItemShort)(v)}§r`).join('\n')}`, player);
    }
    else {
        tell('§a执行成功，没有项目变动', player);
    }
}
function unBanCommand(willUnBan, player) {
    const queried = (0, query_1.queryLocal)(willUnBan, true, true);
    if (!queried.length) {
        tell('§a执行成功，没有项目变动', player);
        return;
    }
    const succ = [];
    for (const obj of queried) {
        if ((0, query_1.delLocalListItem)(obj))
            succ.push(obj);
    }
    tell(`§a已成功删除 §6${succ.length} §a条项目§r\n` +
        `${succ.map((v) => `- ${(0, query_1.formatLocalItemShort)(v)}§r`).join('\n')}`, player);
}
const cmdMain = mc.newCommand('blackbe', const_1.PLUGIN_NAME, PermType.Any);
cmdMain.setEnum('enumReload', ['reload']);
cmdMain.mandatory('enumReload', ParamType.Enum, 'enumReload', 1);
cmdMain.overload(['enumReload']);
cmdMain.setEnum('enumQuery', ['query']);
cmdMain.mandatory('enumQuery', ParamType.Enum, 'enumQuery', 1);
cmdMain.optional('queryString', ParamType.String);
cmdMain.overload(['enumQuery', 'queryString']);
cmdMain.setEnum('enumBan', ['ban']);
cmdMain.mandatory('enumBan', ParamType.Enum, 'enumBan', 1);
cmdMain.mandatory('player', ParamType.String);
cmdMain.optional('reason', ParamType.String);
cmdMain.optional('duration', ParamType.Int);
cmdMain.overload(['enumBan', 'player', 'reason', 'duration']);
cmdMain.setEnum('enumUnBan', ['unban']);
cmdMain.mandatory('enumUnBan', ParamType.Enum, 'enumUnBan', 1);
// player 上面有
cmdMain.overload(['enumUnBan', 'player']);
cmdMain.setEnum('enumLocal', ['local']);
cmdMain.mandatory('enumLocal', ParamType.Enum, 'enumLocal', 1);
cmdMain.overload(['enumLocal']);
cmdMain.overload([]);
// @ts-expect-error 补全库有问题，这里result应为any
cmdMain.setCallback((_, { player }, out, result) => {
    const { enumReload, enumQuery, queryString, enumBan, player: stringSelector, reason, duration, enumUnban, enumLocal, } = result;
    if (enumReload) {
        if (!checkOp(player)) {
            out.error(ONLT_OP_TEXT);
            return false;
        }
        try {
            (0, config_1.reloadConfig)();
        }
        catch (e) {
            out.error(`出错了！\n${String(e)}`);
            return false;
        }
        out.success(`§a成功重载配置文件与本地黑名单！部分配置项需要重启服务器才可以生效！`);
        return true;
    }
    if (enumQuery) {
        if (!player) {
            out.error(NO_CONSOLE_TEXT);
            out.error(REFUSE_LIST_QUERY_TEXT);
            return false;
        }
        (0, query_1.queryCmd)(player, queryString);
        return true;
    }
    if (enumBan) {
        if (!checkOp(player)) {
            out.error(ONLT_OP_TEXT);
            return false;
        }
        banCommand(stringSelector, duration, reason, player);
        return true;
    }
    if (enumUnban) {
        if (!checkOp(player)) {
            out.error(ONLT_OP_TEXT);
            return false;
        }
        unBanCommand(stringSelector, player);
        return true;
    }
    if (enumLocal) {
        if (!player) {
            out.error(NO_CONSOLE_TEXT);
            out.error(REFUSE_LIST_QUERY_TEXT);
            return false;
        }
        if (!player.isOP()) {
            out.error(ONLT_OP_TEXT);
            return false;
        }
        (0, util_1.wrapAsyncFunc)(query_1.localListForm)(player);
        return true;
    }
    out.error(`请输入子命令`);
    return false;
});
cmdMain.setup();
if (config_1.config.registerBanCommand) {
    const cmdBan = mc.newCommand('ban', `${const_1.PLUGIN_NAME} - 本地黑名单封禁`, PermType.GameMasters);
    cmdBan.mandatory('player', ParamType.String);
    cmdBan.optional('reason', ParamType.String);
    cmdBan.optional('duration', ParamType.Int);
    cmdBan.overload(['player', 'reason', 'duration']);
    cmdBan.setCallback(
    // @ts-expect-error 补全库有问题，这里result应为any
    (_, { player }, __, { player: stringSelector, reason, duration, }) => {
        banCommand(stringSelector, duration, reason, player);
        return true;
    });
    cmdBan.setup();
    const cmdUnBan = mc.newCommand('unban', `${const_1.PLUGIN_NAME} - 本地黑名单解封`, PermType.GameMasters);
    cmdUnBan.mandatory('player', ParamType.String);
    cmdUnBan.overload(['player']);
    cmdUnBan.setCallback(
    // @ts-expect-error 补全库有问题，这里result应为any
    (_, { player }, __, { player: stringSelector, }) => {
        unBanCommand(stringSelector, player);
        return true;
    });
    cmdUnBan.setup();
}
