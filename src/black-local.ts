import { config } from './config'
import { Query } from './db'
import {
  checkValInArray,
  formatDate,
  formatVarString,
  pushNoDuplicateItem,
  stripIp,
} from './util'

export function formatLocalKickMsg(
  player: Player,
  data: Omit<Query.BanInfoItem, 'id'>,
): string {
  const { reason, endTime } = data
  return formatVarString(config.kickByLocalMsg, {
    NAME: player.realName,
    XUID: player.xuid,
    REASON: reason ?? '无',
    ENDTIME: endTime ? formatDate({ date: new Date(endTime) }) : '永久',
  })
}

export function banPlayer(
  data:
    | { player: Player }
    | { name?: string; xuid?: string; ip?: string; clientId?: string },
  options: { time?: number; reason?: string; kickTip?: string } = {},
): false | { isModify: boolean; results: LocalBlackListItem[] } {
  let name: string | undefined
  let xuid: string | undefined
  let ip: string | undefined
  let clientId: string | undefined
  if ('player' in data) {
    const { player } = data
    ;({ realName: name, xuid } = player)
    ;({ ip, clientId } = player.getDevice())
  } else {
    ;({ name, xuid, ip, clientId } = data)
  }
  if (ip) ip = stripIp(ip)

  const queryParams = [name, xuid, ip, clientId].filter((v) => v)
  if (!queryParams.length) return false

  const results: LocalBlackListItem[] = []
  for (const it of localList.list) {
    if (
      (name && name === it.name) ||
      (xuid && xuid === it.xuid) ||
      (ip && it.ips && it.ips.includes(ip)) ||
      (clientId && it.clientIds && it.clientIds.includes(clientId))
    ) {
      results.push(it)
    }
  }

  const isModify = !!results.length
  if (!isModify) {
    const it: LocalBlackListItem = {
      ips: [],
      clientIds: [],
    }
    localList.list.push(it)
    results.push(it)
  }

  const { time, reason } = options
  const endTime = time ? new Date(Date.now() + time).toJSON() : undefined
  for (const it of results) {
    if (name) it.name = name
    if (xuid) it.xuid = xuid
    if (ip) it.ips = pushNoDuplicateItem(it.ips || [], ip)
    if (clientId) it.clientIds = pushNoDuplicateItem(it.clientIds || [], clientId)
    if (endTime) it.endTime = endTime
    if (reason) it.reason = reason
  }

  if ('player' in data) {
    const { kickTip } = options
    data.player.kick(kickTip ?? formatLocalKickMsg(data.player, results[0]))
  }

  saveLocalList()
  return { isModify, results }
}

export function queryLocal(
  param: string,
  moreInfo = false,
  strict = false,
): LocalBlackListItem[] {
  param = param.trim()
  const params = strict ? [param] : param.split(/\s/g)
  const ret: LocalBlackListItem[] = []

  // 遍历列表中的对象
  for (const it of localList.list) {
    const { name, xuid, ips, clientIds } = it
    const willCheck: (string | undefined)[] = [name, xuid]
    if (moreInfo) {
      if (ips) willCheck.push(...ips)
      if (clientIds) willCheck.push(...clientIds)
    }

    // 遍历待匹配的值
    for (const val of willCheck) {
      // 使用搜索词匹配 value
      if (
        val &&
        checkValInArray(params, (pr) => (strict ? val === pr : val.includes(pr)))
      ) {
        ret.push(it)
        break
      }
    }
  }

  return ret
}

export function formatLocalInfo(obj: Query.BanFullInfo, moreInfo = false): string {
  const formatList = (li?: string[], pfx: string = '§b'): string =>
    li && li.length ? `\n${li.map((v) => `  - ${pfx}${v}§r`).join('\n')}` : '§b无§r'

  const { name, xuid, ip, endTime, clientId, reason } = obj
  const lines: string[] = []

  lines.push(`§2记录原因§r： §b${reason ?? '无'}`)
  if (moreInfo) {
    lines.push(
      `§2结束时间§r：` +
        ` §b${endTime ? formatDate({ date: new Date(endTime) }) : '永久'}`,
    )
  }
  lines.push(`§2已记录玩家ID§r： ${formatList(name)}`)
  lines.push(`§2已记录XUID§r： ${formatList(xuid)}`)
  if (moreInfo) lines.push(`§2已记录IP§r： ${formatList(ip)}`)
  if (moreInfo) lines.push(`§2已记录设备ID§r： ${formatList(clientId)}`)

  return lines.join('\n')
}
