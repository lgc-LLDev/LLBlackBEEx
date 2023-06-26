"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
logger.setTitle(const_1.PLUGIN_NAME);
logger.setFile(`logs/${const_1.PLUGIN_NAME}.log`);
require('./command');
require('./listener');
ll.registerPlugin(const_1.PLUGIN_NAME, const_1.PLUGIN_DESCRIPTION, const_1.PLUGIN_VERSION, const_1.PLUGIN_EXTRA);
