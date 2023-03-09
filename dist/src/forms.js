"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryResultFormatter = void 0;
const blackbe_1 = require("./blackbe");
function isBlackBECommonInfo(obj) {
    return obj.black_id === '1';
}
function isBlackBEPrivInfoWithRespId(obj) {
    return obj.black_id && obj.black_id !== '1';
}
const queryResultFormatter = (v) => {
    if (isBlackBECommonInfo(v)) {
        return [
            `§bBlackBE 公有库 §7| ${(0, blackbe_1.formatBlackBELvl)(v.level)[1]}等级 ${v.level}\n` +
                `§6${v.name}`,
        ];
    }
    if (isBlackBEPrivInfoWithRespId(v)) {
        return [
            `§3BlackBE 私有库 §7| ${(0, blackbe_1.formatBlackBELvl)(v.level)[1]}等级 ${v.level}\n` +
                `§6${v.name}`,
        ];
    }
    // LocalBlackListItem
    return [`§d本地库\n§6${v.name ?? v.xuid ?? '未知'}`];
};
exports.queryResultFormatter = queryResultFormatter;
