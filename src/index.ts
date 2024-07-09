// LiteLoaderScript Dev Helper
/// <reference path="../../HelperLib/src/index.d.ts"/>

import { PLUGIN_DESCRIPTION, PLUGIN_EXTRA, PLUGIN_NAME, PLUGIN_VERSION } from './const'

import './command'
import './listener'

ll.registerPlugin(PLUGIN_NAME, PLUGIN_DESCRIPTION, PLUGIN_VERSION, PLUGIN_EXTRA)

// todo: 私有库管理，手动上传私有库，本地黑名单传私有库
