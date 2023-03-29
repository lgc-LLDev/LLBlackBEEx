"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localListForm = exports.blackBEItemForm = exports.localItemForm = exports.delLocalListItem = void 0;
const form_api_ex_1 = require("form-api-ex");
const black_local_1 = require("./black-local");
const blackbe_1 = require("./blackbe");
const config_1 = require("./config");
const const_1 = require("./const");
const util_1 = require("./util");
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
    const form = (0, util_1.setupFunctionalityForm)([['返回', null]]);
    form.content = (0, black_local_1.formatLocalInfo)(obj, moreInfo);
    if (moreInfo)
        form.buttons.unshift(['删除条目', delItem], ['修改封禁时间', editTime], ['修改封禁原因', editDesc]);
    // eslint-disable-next-line no-return-await
    return await (0, util_1.processListFormReturn)(await form.sendAsync(player));
}
exports.localItemForm = localItemForm;
async function blackBEItemForm(player, obj, moreInfo = false) {
    const form = (0, util_1.setupFunctionalityForm)([['返回', null]]);
    form.content = await (0, blackbe_1.formatBlackBEInfo)(obj, moreInfo);
    // eslint-disable-next-line no-return-await
    return await (0, util_1.processListFormReturn)(await form.sendAsync(player));
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
    form.searcher = (_, param) => (0, black_local_1.queryLocal)(param, true);
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
