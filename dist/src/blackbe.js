"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.formatBlackBEInfo = exports.formatBlackBELvl = exports.getRepoByUuid = exports.checkPrivate = exports.check = exports.deletePrivatePiece = exports.uploadPrivatePiece = exports.getPrivatePieceList = exports.getPrivateRespList = exports.cachedPrivResp = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
const util_1 = require("./util");
const defaultUploadParams = {
    xuid: '1000000000000000',
    info: '无',
    server: config_1.config.serverName,
    time: (0, util_1.formatDate)({ withTime: false }),
    qq: 1000000000,
    area_code: '+86',
    phone: 10000000000,
};
exports.cachedPrivResp = [];
function getHeaders(auth = true) {
    const headers = {
    // 'Content-Type': 'application/json',
    };
    if (auth && config_1.config.apiToken)
        headers.Authorization = `Bearer ${config_1.config.apiToken}`;
    return headers;
}
const buildUrl = (path) => String(new URL(`openapi/v3/${path}`, config_1.config.apiHost));
// 请求失败 axios 会抛出错误
// export const isBlackBESuccessReturn = <T>(
//   v: BlackBEReturn<T>
// ): v is BlackBESuccessReturn<T> => v.success && 'data' in v; // && !!v.data;
function checkIsWithToken(options) {
    const withToken = options.withToken ?? true;
    delete options.withToken;
    return withToken;
}
async function getPrivateRespList() {
    const resp = (await axios_1.default.get(buildUrl('private/repositories/list'), {
        headers: getHeaders(),
        proxy: config_1.config.proxy,
    })).data;
    // if (isBlackBESuccessReturn(resp)) {
    exports.cachedPrivResp.length = 0;
    exports.cachedPrivResp.push(...resp.data.repositories_list);
    // }
    return resp;
}
exports.getPrivateRespList = getPrivateRespList;
async function getPrivatePieceList(options) {
    return (await axios_1.default.get(buildUrl('private/repositories/piece/list'), {
        params: options,
        headers: getHeaders(),
        proxy: config_1.config.proxy,
    })).data;
}
exports.getPrivatePieceList = getPrivatePieceList;
async function uploadPrivatePiece(options) {
    return (await axios_1.default.post(buildUrl('private/repositories/piece/upload'), { ...defaultUploadParams, options }, {
        headers: getHeaders(),
        proxy: config_1.config.proxy,
    })).data;
}
exports.uploadPrivatePiece = uploadPrivatePiece;
async function deletePrivatePiece(options) {
    return (await axios_1.default.post(buildUrl('private/repositories/piece/delete'), options, {
        headers: getHeaders(),
        proxy: config_1.config.proxy,
    })).data;
}
exports.deletePrivatePiece = deletePrivatePiece;
async function check(options) {
    const withToken = checkIsWithToken(options);
    return (await axios_1.default.get(buildUrl('check'), {
        params: options,
        headers: getHeaders(withToken),
        proxy: config_1.config.proxy,
    })).data;
}
exports.check = check;
async function checkPrivate(options) {
    if (!exports.cachedPrivResp.length)
        await getPrivateRespList();
    return (await axios_1.default.post(buildUrl('check/private'), {
        repositories_uuid: exports.cachedPrivResp.map((v) => v.uuid),
    }, {
        params: options,
        headers: getHeaders(),
        proxy: config_1.config.proxy,
    })).data;
}
exports.checkPrivate = checkPrivate;
async function getRepoByUuid(uuid) {
    if (uuid === '1')
        return {
            uuid,
            name: '公有库',
            type: 1,
            list_num: 0,
            server: '',
            server_type: '',
        };
    if (!exports.cachedPrivResp.length)
        await getPrivateRespList();
    for (const resp of exports.cachedPrivResp)
        if (resp.uuid === uuid)
            return resp;
    return null;
}
exports.getRepoByUuid = getRepoByUuid;
/**
 * @returns [ 等级描述，对应颜色 ]
 */
function formatBlackBELvl(lvl) {
    switch (lvl) {
        case 1:
            return ['有作弊行为，但未对其他玩家造成实质上损害', '§e'];
        case 2:
            return ['有作弊行为，且对玩家造成一定的损害', '§g'];
        case 3:
            return ['严重破坏服务器，对玩家和服务器造成较大的损害', '§c'];
        default:
            return ['未知', '§r'];
    }
}
exports.formatBlackBELvl = formatBlackBELvl;
async function formatBlackBEInfo(obj, moreInfo = false) {
    const isPriv = 'phone' in obj;
    const { uuid, name, xuid, info, level, qq, black_id } = obj;
    const repo = await getRepoByUuid(black_id);
    const repoName = repo ? repo.name : '未知';
    const [lvlDesc, lvlColor] = formatBlackBELvl(level);
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
function clearCache() {
    exports.cachedPrivResp.length = 0;
}
exports.clearCache = clearCache;
setInterval(() => clearCache(), config_1.config.clearCacheInterval);
