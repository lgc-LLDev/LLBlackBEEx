import { DATA_PATH } from './const'

const configPath = `${DATA_PATH}/config.json`

export interface Config {
  apiToken: string
  banIp: boolean
  banDevice: boolean
  hidePassMessage: boolean
  disableBlackBE: boolean
  kickByLocalMsg: string
  kickByCloudMsg: string
  serverName: string
  // proxy: AxiosProxyConfig | false;
  apiHost: string
  clearCacheInterval: number
  registerBanCommand: boolean
  checkLocalListInterval: number
  processOnPreJoin: boolean
  onlyOpCanQuery: boolean
  pardonBlackBE: string[]
}

export const config: Config = {
  apiToken: '',
  banIp: true,
  banDevice: true,
  hidePassMessage: false,
  disableBlackBE: false,
  kickByCloudMsg: `§c您已被BlackBE云端黑名单封禁§r\n\n详情请访问 §ghttps://blackbe.work/`,
  kickByLocalMsg: `§c您已被服务器封禁§r\n\n解封时间: §g%ENDTIME%§r\n封禁原因: §g%REASON%`,
  serverName: '服务器',
  // proxy: false,
  apiHost: 'https://api.blackbe.work/',
  clearCacheInterval: 3600000,
  registerBanCommand: true,
  checkLocalListInterval: 5000,
  processOnPreJoin: true,
  onlyOpCanQuery: false,
  pardonBlackBE: [],
}

export function saveConfig() {
  file.writeTo(configPath, JSON.stringify(config, null, 2))
}

export function reloadConfig() {
  function loadConfig<T>(path: string, overrideConfig: T): T {
    const content = file.readFrom(path)
    if (!content) throw new Error(`failed to read ${path}`)
    Object.entries(JSON.parse(content)).forEach(([k, v]) => {
      Object.defineProperty(overrideConfig, k, { value: v })
    })
    return overrideConfig
  }

  if (!file.exists(configPath)) saveConfig()
  loadConfig(configPath, config)

  // if (typeof config.proxy === 'string') {
  //   const { hostname, port, protocol, username, password } = new URL(
  //     config.proxy
  //   );
  //   config.proxy = {
  //     host: hostname,
  //     port: Number(port),
  //     protocol: protocol.replace(':', ''),
  //   };
  //   if (username || password) config.proxy.auth = { username, password };
  // }
  saveConfig()
}

reloadConfig()
