"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryCmd = exports.queryFormAsync = exports.queryResultForm = exports.localListForm = exports.blackBEItemForm = exports.localItemForm = exports.delLocalListItem = exports.processListFormReturn = exports.setupFunctionalityForm = exports.queryResultFormatter = exports.formatLocalItemShort = exports.formatLocalInfo = exports.formatBlackBEInfo = exports.queryLocal = exports.queryBlackBE = void 0;
const form_api_ex_1 = require("form-api-ex");
const blackbe_1 = require("./blackbe");
const config_1 = require("./config");
const const_1 = require("./const");
const util_1 = require("./util");
async function queryBlackBE(param) {
    const tasks = [
        (0, blackbe_1.check)({ name: param, qq: param, xuid: param, withToken: false }),
        config_1.config.apiToken
            ? (0, blackbe_1.checkPrivate)({ name: param, qq: param, xuid: param })
            : Promise.resolve(),
    ];
    // @ts-expect-error 故意需要
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
async function formatBlackBEInfo(obj, moreInfo = false) {
    const isPriv = 'phone' in obj;
    const { uuid, name, xuid, info, level, qq, black_id } = obj;
    const repo = await (0, blackbe_1.getRepoByUuid)(black_id);
    const repoName = repo ? repo.name : '未知';
    const [lvlDesc, lvlColor] = (0, blackbe_1.formatBlackBELvl)(level);
    const lines = [];
    lines.push(`§2玩家ID§r： §l§d${name}§r`);
    lines.push(`§2危险等级§r： ${lvlColor}等级 §l${level} §r${lvlColor}（${lvlDesc}）`);
    lines.push(`§2记录原因§r： §b${info}`);
    if (isPriv)
        lines.push(`§2违规服务器§r： §b${obj.server}`);
    lines.push(`§2XUID§r： §b${xuid}`);
    lines.push(`§2玩家QQ§r： §b${qq}`);
    if (isPriv && moreInfo)
        lines.push(`§2玩家电话§r： §b${obj.area_code} ${obj.phone}`);
    if (isPriv)
        lines.push(`§2记录时间§r： §b${obj.time}`);
    lines.push(`§2记录UUID§r： §b${uuid}`);
    lines.push(`§2来源库§r： §b${repoName} （${black_id}）`);
    return lines.join('\n');
}
exports.formatBlackBEInfo = formatBlackBEInfo;
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
function setupFunctionalityForm(buttons) {
    const form = new form_api_ex_1.SimpleFormEx(buttons);
    form.title = const_1.PLUGIN_NAME;
    form.formatter = (v) => [`§3${v[0]}`];
    return form;
}
exports.setupFunctionalityForm = setupFunctionalityForm;
/**
 * 返回 false 代表按下表单内返回按钮 (null)
 */
async function processListFormReturn(res) {
    if (res) {
        const [, func] = res;
        if (!func)
            return false;
        /* const cb = */ func();
        // if (isPromise(cb)) await cb;
    }
    return true;
}
exports.processListFormReturn = processListFormReturn;
function delLocalListItem(obj) {
    const { list } = config_1.localList;
    const deleted = list.splice(list.indexOf(obj), 1);
    (0, config_1.saveLocalList)();
    return !!deleted.length;
}
exports.delLocalListItem = delLocalListItem;
async function localItemForm(player, obj, moreInfo = false) {
    const delItem = async () => {
        if (await (0, form_api_ex_1.sendModalFormAsync)(player, const_1.PLUGIN_NAME, '§6真的要删除这条黑名单项目吗？\n§c删前请三思！！！')) {
            player.tell(delLocalListItem(obj)
                ? '§a删除成功！'
                : '§c删除失败！未找到该黑名单项目');
        }
        else {
            player.tell('§6删除操作已取消');
        }
    };
    const editTime = async () => {
        const res = await new form_api_ex_1.CustomFormEx(const_1.PLUGIN_NAME)
            .addSwitch('forever', '是否永久封禁', !obj.endTime)
            .addInput('time', '如果不是永久封禁，请输入从现在开始要封禁的时间（单位分钟）')
            .sendAsync(player);
        if (res) {
            const { forever, time } = res;
            const timeNum = Number(time);
            if ((!timeNum || timeNum <= 0) && !forever) {
                await (0, form_api_ex_1.sendModalFormAsync)(player, const_1.PLUGIN_NAME, '§c请输入正确的封禁时间！', '§a知道了', '§a知道了');
                editTime();
                return;
            }
            // 引用 可以直接改
            obj.endTime = forever
                ? undefined
                : new Date(Date.now() + timeNum * 60 * 1000).toJSON();
            (0, config_1.saveLocalList)();
            player.tell('§a操作成功！');
        }
        else {
            player.tell('§6修改操作已取消');
        }
    };
    const editDesc = async () => {
        const res = await new form_api_ex_1.CustomFormEx(const_1.PLUGIN_NAME)
            .addInput('reason', '请输入想修改的封禁原因内容', {
            placeholder: '如想要清空封禁原因请留空',
            default: obj.reason,
        })
            .sendAsync(player);
        if (res) {
            const reason = res.reason.trim();
            obj.reason = reason || undefined;
            (0, config_1.saveLocalList)();
            player.tell('§a操作成功！');
        }
        else {
            player.tell('§6修改操作已取消');
        }
    };
    const form = setupFunctionalityForm([['返回', null]]);
    form.content = formatLocalInfo(obj, moreInfo);
    if (moreInfo)
        form.buttons.unshift(['删除条目', delItem], ['修改封禁时间', editTime], ['修改封禁原因', editDesc]);
    // eslint-disable-next-line no-return-await
    return await processListFormReturn(await form.sendAsync(player));
}
exports.localItemForm = localItemForm;
async function blackBEItemForm(player, obj, moreInfo = false) {
    const form = setupFunctionalityForm([['返回', null]]);
    form.content = await formatBlackBEInfo(obj, moreInfo);
    // eslint-disable-next-line no-return-await
    return await processListFormReturn(await form.sendAsync(player));
}
exports.blackBEItemForm = blackBEItemForm;
async function localListForm(player) {
    if (!config_1.localList.list.length) {
        player.tell(`§6本地黑名单列表为空`);
        return;
    }
    const form = new form_api_ex_1.SimpleFormEx(config_1.localList.list);
    form.title = const_1.PLUGIN_NAME;
    form.canTurnPage = true;
    form.canJumpPage = true;
    form.hasSearchButton = true;
    form.formatter = ({ name, xuid, endTime }) => [
        `§6${name ?? '未知'} §7(${xuid ?? '未知'})\n` +
            `§2${endTime ? `${(0, util_1.formatDate)({ date: new Date(endTime) })} 解封` : '永久封禁'}`,
    ];
    form.searcher = (_, param) => queryLocal(param, true);
    const sendTask = async () => {
        const res = await form.sendAsync(player);
        if (res) {
            const infoRes = await localItemForm(player, res, true);
            if (infoRes === false)
                sendTask();
        }
    };
    sendTask();
}
exports.localListForm = localListForm;
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
        localRes.push(...queryLocal(param, moreInfo));
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
        player.tell(
        // prettier-ignore
        `§6很抱歉，我们找遍了本地黑名单${config_1.config.disableBlackBE ? '' : '和 BlackBE'}，` +
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
    const heading = 
    // prettier-ignore
    `§a为您找到了关于 §l§2${param} §r§a的 ${headingSuffixes.join('， ')}`;
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
                ? localItemForm(player, value, moreInfo)
                : blackBEItemForm(player, value, moreInfo));
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
