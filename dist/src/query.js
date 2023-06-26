"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryCmd = exports.queryFormAsync = exports.queryResultForm = exports.queryResultFormatter = exports.formatLocalItemShort = exports.queryBlackBE = void 0;
const form_api_ex_1 = require("form-api-ex");
const black_local_1 = require("./black-local");
const blackbe_1 = require("./blackbe");
const config_1 = require("./config");
const const_1 = require("./const");
const manage_1 = require("./manage");
const util_1 = require("./util");
async function queryBlackBE(param) {
    const tasks = [
        (0, blackbe_1.check)({ name: param, qq: param, xuid: param, withToken: false }),
        config_1.config.apiToken
            ? (0, blackbe_1.checkPrivate)({ name: param, qq: param, xuid: param })
            : Promise.resolve(),
    ];
    const [comm, priv] = await Promise.all(tasks);
    const commInfo = [];
    const privInfo = [];
    if (comm)
        commInfo.push(...comm.data.info);
    if (priv) {
        for (const repo of priv.data) {
            if (repo.exist)
                privInfo.push(...repo.info.map((v) => ({ ...v, black_id: repo.repo_uuid })));
        }
    }
    return [commInfo, privInfo];
}
exports.queryBlackBE = queryBlackBE;
function formatLocalItemShort(obj) {
    const { name, xuid, ips, clientIds } = obj;
    const items = [name, xuid, ...(ips ?? []), ...(clientIds ?? [])].filter((v) => v);
    const it1 = items.shift();
    return `§b${it1}${items.length ? ` §7(${items.join(', ')})` : ''}`;
}
exports.formatLocalItemShort = formatLocalItemShort;
const queryResultFormatter = ({ type, value, }) => {
    const { name, xuid } = value;
    let line1 = '';
    if (type === 'common')
        line1 = '§2BlackBE 公有库';
    else if (type === 'private')
        line1 = '§3BlackBE 私有库';
    else
        line1 = '§5本地库';
    const line2 = `§6${name ?? xuid ?? '未知'}`;
    if ('level' in value) {
        const { level } = value;
        const lvlColor = (0, blackbe_1.formatBlackBELvl)(level)[1];
        line1 += `§7 | ${lvlColor}等级 ${level}`;
    }
    return [`${line1}\n${line2}`];
};
exports.queryResultFormatter = queryResultFormatter;
async function queryResultForm(player, param, moreInfo = false) {
    param = param?.trim();
    if (!param) {
        player.tell(`§c请输入要查询的内容`);
        return;
    }
    player.tell(`§a请您稍安勿躁，我们正在努力查询中！`);
    const localRes = [];
    const blackBECommRes = [];
    const blackBEPrivRes = [];
    try {
        localRes.push(...(0, black_local_1.queryLocal)(param, moreInfo));
        if (!config_1.config.disableBlackBE) {
            const [comm, priv] = await queryBlackBE(param);
            blackBECommRes.push(...comm);
            blackBEPrivRes.push(...priv);
        }
    }
    catch (e) {
        player.tell(`§c出错了！\n${String(e)}`);
    }
    const localNum = localRes.length;
    const privNum = blackBEPrivRes.length;
    const commNum = blackBECommRes.length;
    if (!localNum && !privNum && !commNum) {
        player.tell(`§6很抱歉，我们找遍了本地黑名单${config_1.config.disableBlackBE ? '' : '和 BlackBE'}，` +
            `但是没有查询到任何结果 QAQ`);
        return;
    }
    const headingSuffixes = [];
    if (localNum)
        headingSuffixes.push(`§l§e${localNum} §r§a条本地库记录`);
    if (commNum)
        headingSuffixes.push(`§l§e${commNum} §r§a条云黑公有库记录`);
    if (privNum)
        headingSuffixes.push(`§l§e${privNum} §r§a条云黑私有库记录`);
    if (headingSuffixes.length > 1)
        headingSuffixes.push(`和 ${headingSuffixes.pop()}`);
    const heading = `§a为您找到了关于 §l§2${param} §r§a的 ${headingSuffixes.join('， ')}`;
    const form = new form_api_ex_1.SimpleFormEx([
        ...localRes.map((value) => ({ type: 'local', value })),
        ...blackBECommRes.map((value) => ({ type: 'common', value })),
        ...blackBEPrivRes.map((value) => ({ type: 'private', value })),
    ]);
    form.title = const_1.PLUGIN_NAME;
    form.canTurnPage = true;
    form.canJumpPage = true;
    form.content = `${heading}\n\n${form.content}`;
    form.formatter = exports.queryResultFormatter;
    const sendTask = async () => {
        const res = await form.sendAsync(player);
        if (res) {
            const { type, value } = res;
            const infoRes = await (type === 'local'
                ? (0, manage_1.localItemForm)(player, value, moreInfo)
                : (0, manage_1.blackBEItemForm)(player, value, moreInfo));
            if (infoRes === false)
                sendTask();
        }
    };
    sendTask();
}
exports.queryResultForm = queryResultForm;
async function queryFormAsync(player, param) {
    const op = player.isOP();
    if (!param) {
        let form = new form_api_ex_1.CustomFormEx(const_1.PLUGIN_NAME);
        form = form.addLabel(`§a请输入查询内容， 我们会帮你从本地库${config_1.config.disableBlackBE ? '' : '与 BlackBE '}中查找结果`);
        if (!config_1.config.disableBlackBE) {
            form.addLabel('§6请谨慎使用 XUID 查询来自 BlackBE 的记录：\n' +
                '由于历史遗留和 XUID 采集本身存在难度， 导致大部分条目没有记录 XUID， ' +
                '所以不推荐完全依赖 XUID 来判断玩家是否存在于黑名单');
        }
        form = form.addInput('param', '', {
            placeholder: `输入 玩家ID${config_1.config.disableBlackBE ? '' : ' / QQ号'} / XUID${op ? ' / IP地址 / 设备ID' : ''}`,
        });
        const res = await form.sendAsync(player);
        if (!res)
            return;
        ({ param } = res);
    }
    await queryResultForm(player, param, op);
}
exports.queryFormAsync = queryFormAsync;
function queryCmd(player, param) {
    (0, util_1.wrapAsyncFunc)(queryFormAsync)(player, param);
}
exports.queryCmd = queryCmd;
