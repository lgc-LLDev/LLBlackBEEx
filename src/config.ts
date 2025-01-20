import Schema from 'schemastery'

import { DATA_PATH } from './const'

const configPath = `${DATA_PATH}/config.json`

export interface Config {
  debug: boolean
  apiToken?: string
  banIp: boolean
  banDevice: boolean
  hidePassMessage: boolean
  disableBlackBE: boolean
  kickByCloudMsg: string
  kickByLocalMsg: string
  serverName: string
  apiHost: string
  clearCacheInterval: number
  registerBanCommand: boolean
  checkLocalListInterval: number
  processOnPreJoin: boolean
  onlyOpCanQuery: boolean
  pardonBlackBE: string[]
}

export const Config: Schema<Config> = Schema.object({
  debug: Schema.boolean().default(false),
  apiToken: Schema.string().required(false),
  banIp: Schema.boolean().default(true),
  banDevice: Schema.boolean().default(true),
  hidePassMessage: Schema.boolean().default(false),
  disableBlackBE: Schema.boolean().default(false),
  kickByCloudMsg: Schema.string().default(
    `§c您已被BlackBE云端黑名单封禁§r\n\n详情请访问 §ghttps://blackbe.work/`,
  ),
  kickByLocalMsg: Schema.string().default(
    `§c您已被服务器封禁§r\n\n解封时间: §g%ENDTIME%§r\n封禁原因: §g%REASON%`,
  ),
  serverName: Schema.string().default('服务器'),
  apiHost: Schema.string().default('https://api.blackbe.work/'),
  clearCacheInterval: Schema.number().default(3600000),
  registerBanCommand: Schema.boolean().default(true),
  checkLocalListInterval: Schema.number().default(5000),
  processOnPreJoin: Schema.boolean().default(true),
  onlyOpCanQuery: Schema.boolean().default(false),
  pardonBlackBE: Schema.array(Schema.string()).default([]),
})

export function readConfig(): Config {
  if (!file.exists(configPath)) {
    setTimeout(saveConfig, 0)
    return Config()
  }
  const content = file.readFrom(configPath)
  if (!content) throw new Error(`failed to read config`)
  const data = JSON.parse(content)
  return Config(data)
}

export const config: Config = readConfig()

export function saveConfig() {
  file.writeTo(configPath, JSON.stringify(config, null, 2))
}

export function reloadConfig() {
  const newConfig = readConfig()
  Object.assign(config, newConfig)
}
