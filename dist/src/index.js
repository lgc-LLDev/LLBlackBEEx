"use strict";
// LiteLoaderScript Dev Helper
/// <reference path="d:\Coding\bds\LLSEAids/dts/llaids/src/index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
logger.setTitle(const_1.PLUGIN_NAME);
require('./command');
require('./listener');
ll.registerPlugin(const_1.PLUGIN_NAME, const_1.PLUGIN_DESCRIPTION, const_1.PLUGIN_VERSION, const_1.PLUGIN_EXTRA);
// todo: 私有库管理，手动上传私有库，本地黑名单传私有库
// todo: GUI 封禁
