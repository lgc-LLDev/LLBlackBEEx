// LiteLoaderScript Dev Helper
/// <reference path="../../HelperLib/src/index.d.ts"/>

import { config } from './config'
import { PLUGIN_DESCRIPTION, PLUGIN_EXTRA, PLUGIN_NAME, PLUGIN_VERSION } from './const'
import { migrate, Query } from './db'

import './command'
import './listener'

ll.registerPlugin(PLUGIN_NAME, PLUGIN_DESCRIPTION, PLUGIN_VERSION, PLUGIN_EXTRA)

{
  if (config.debug) logger.setConsole(true, 5)

  const [old, now] = migrate(Query.get())
  if (old !== now) logger.info(`DB migrated from version ${old} to ${now}`)
}

// todo: 私有库管理，手动上传私有库，本地黑名单传私有库
