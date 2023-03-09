"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reloadConfig = exports.saveLocalList = exports.saveConfig = exports.localList = exports.config = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const const_1 = require("./const");
const configPath = (0, path_1.join)(const_1.dataPath, 'config.json');
const localListPath = (0, path_1.join)(const_1.dataPath, 'local_list.json');
exports.config = {
    apiToken: '',
    banIp: true,
    banDevice: true,
    hidePassMessage: false,
    disableBlackBE: false,
    kickByCloudMsg: `§c您已被BlackBE云端黑名单封禁§r\n\n详情请访问 §ghttps://blackbe.work/`,
    kickByLocalMsg: `§c您已被服务器封禁§r\n\n解封时间: §g%ENDTIME%§r\n封禁原因: §g%REASON%`,
    serverName: '服务器',
    proxy: false,
    apiHost: 'https://api.blackbe.work/',
    clearCacheInterval: 3600000,
    registerBanCommand: true,
    checkLocalListInterval: 5000,
    processOnPreJoin: true,
};
exports.localList = { list: [] };
function saveConfig() {
    (0, fs_1.writeFileSync)(configPath, JSON.stringify(exports.config, null, 2));
}
exports.saveConfig = saveConfig;
function saveLocalList() {
    (0, fs_1.writeFileSync)(localListPath, JSON.stringify(exports.localList, null, 2));
}
exports.saveLocalList = saveLocalList;
function reloadConfig() {
    function loadConfig(path, overrideConfig) {
        Object.entries(JSON.parse((0, fs_1.readFileSync)(path, { encoding: 'utf-8' }))).forEach(([k, v]) => {
            Object.defineProperty(overrideConfig, k, { value: v });
        });
        return overrideConfig;
    }
    if (!(0, fs_1.existsSync)(configPath))
        saveConfig();
    if (!(0, fs_1.existsSync)(localListPath))
        saveLocalList();
    loadConfig(configPath, exports.config);
    loadConfig(localListPath, exports.localList);
    if (typeof exports.config.proxy === 'string') {
        const { hostname, port, protocol, username, password } = new URL(exports.config.proxy);
        exports.config.proxy = {
            host: hostname,
            port: Number(port),
            protocol: protocol.replace(':', ''),
        };
        if (username || password)
            exports.config.proxy.auth = { username, password };
    }
    saveConfig();
    let localListChanged = false;
    for (const bl of exports.localList.list) {
        if (bl.ip) {
            bl.ips = [bl.ip];
            bl.clientIds = [];
            delete bl.ip;
            localListChanged = true;
        }
    }
    if (localListChanged)
        saveLocalList();
}
exports.reloadConfig = reloadConfig;
reloadConfig();
