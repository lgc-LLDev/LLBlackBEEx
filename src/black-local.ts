import { config } from './config'
import { Query } from './db'
import { formatDate, formatVarString, stripIp } from './util'

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
  banData:
    | { player: Player }
    | { name?: string; xuid?: string; ip?: string; clientId?: string },
  options: { time?: number | null; reason?: string | null; kickTip?: string } = {},
): { result: Query.BanFullInfo; operationTips: string[] } {
  let xuid: string | undefined
  let name: string | undefined
  let ip: string | undefined
  let clientId: string | undefined
  if ('player' in banData) {
    const { player } = banData
    ;({ realName: name, xuid } = player)
    ;({ ip, clientId } = player.getDevice())
  } else {
    ;({ name, xuid, ip, clientId } = banData)
  }
  if (ip) ip = stripIp(ip)

  if (![xuid, name, ip, clientId].filter(Boolean).length) {
    throw TypeError('Empty arg')
  }

  const q = Query.get()
  const operationTips: string[] = []
  const { time, reason, kickTip } = options

  // 如果提供了 xuid，那么把所有内容挂到该 xuid 对应的记录上，并且更新 name 表对应的 xuid 信息
  // 如果没提供 xuid，但是提供了 name，那么尝试通过 name 查询 xuid
  // 如果还是没找到 xuid，但是找到了对应的记录，挂到找到的第一个记录上
  // 其他情况直接新建并挂上

  let infoId: number | undefined

  // 先查 xuid 是否有记录
  if (xuid) {
    infoId = q.getInfoIdFromXuid(xuid)
  }
  // xuid 查不到用 name 查
  if (!infoId && name) {
    // 用 name 查，顺便补全 xuid
    const nameInfo = q.getNameInfo(name)
    if (nameInfo) {
      if (!xuid) xuid = nameInfo.xuid || undefined
      infoId = nameInfo.banInfoId
    }
    // 数据库中也没有 xuid 的话尝试在 ll 数据库中查找补全
    // 如果没查到顺便用从 ll 数据库中拿出来的 xuid 查一遍
    if (!xuid) {
      xuid = data.xuid2name(name) || undefined
      if (xuid && !infoId) infoId = q.getInfoIdFromXuid(xuid)
    }
  }
  // 用 name 查不到，优先 clientId
  if (!infoId && clientId) {
    infoId = q.getInfoIdFromClientId(clientId)
  }
  // 最后 ip
  if (!infoId && ip) {
    infoId = q.getInfoIdFromIp(ip)
  }

  // 更新或新建记录
  const endTime = time ? new Date(Date.now() + time).toJSON() : undefined
  const isInfoNew = !infoId
  infoId = infoId
    ? reason !== undefined || endTime !== undefined
      ? q.updateInfo({ id: infoId, reason, endTime })
      : infoId
    : q.updateInfo({ reason: reason ?? null, endTime: endTime ?? null })
  operationTips.push(
    `${isInfoNew ? '§a新增' : '§6更新'} §bID 为 §d${infoId} §b的违规记录`,
  )

  // 更新其他表记录
  if (xuid) {
    const oldInfoId = q.getInfoIdFromXuid(xuid)
    if (oldInfoId !== infoId) {
      q.updateXuidInfo({ xuid, banInfoId: infoId })
      operationTips.push(
        `${oldInfoId ? '§6更新' : '§a新增'}` +
          ` §bXUID 记录 §d${xuid} §b的 违规 ID 记录：` +
          ` ${oldInfoId ? `§1${oldInfoId} §r-> ` : ''}§d${infoId}`,
      )
    }
  }
  if (name) {
    const oldNameInfo = q.getNameInfo(name)
    const data: Partial<Query.NameItem> = { name }
    if (oldNameInfo) {
      const { xuid: oldNameXuid, banInfoId: oldInfoId } = oldNameInfo
      if (oldNameXuid && oldNameXuid !== xuid) {
        data.xuid = xuid
        operationTips.push(
          `${oldNameXuid ? '§6更新' : '§a新增'}` +
            ` §b玩家名记录 §d${name} §b的 XUID 记录：` +
            ` ${oldNameXuid ? `§1${oldNameXuid} §r-> ` : ''}§d${xuid}`,
        )
      }
      if (oldInfoId && oldInfoId !== infoId) {
        data.banInfoId = infoId
        operationTips.push(
          `${oldInfoId ? '§6更新' : '§a新增'}` +
            ` §b玩家名记录 §d${name} §b的 违规 ID 记录：` +
            ` ${oldInfoId ? `§1${oldInfoId} §r-> ` : ''}§d${infoId}`,
        )
      }
    } else {
      if (xuid) data.xuid = xuid
      data.banInfoId = infoId
      operationTips.push(
        `§a新增 §b玩家名记录 §d${name}§b，` +
          ` 违规 ID： §g${infoId}` +
          `${xuid ? `§b， §gXUID： ${xuid}` : ''}`,
      )
    }
    if (Object.keys(data).length > 1) q.updateNameInfo(data) // ignore when only name
  }
  if (clientId) {
    const oldInfoId = q.getInfoIdFromClientId(clientId)
    if (oldInfoId !== infoId) {
      q.updateClientIdInfo({ clientId, banInfoId: infoId })
      operationTips.push(
        `${oldInfoId ? '§6更新' : '§a新增'}` +
          ` §bClient ID 记录 §d${xuid} §b的 违规 ID 记录：` +
          ` ${oldInfoId ? `§1${oldInfoId} §r-> ` : ''}§d${infoId}`,
      )
    }
  }
  if (ip) {
    const oldInfoId = q.getInfoIdFromIp(ip)
    if (oldInfoId !== infoId) {
      q.updateIpInfo({ ip, banInfoId: infoId })
      operationTips.push(
        `${oldInfoId ? '§6更新' : '§a新增'}` +
          ` §bIP 记录 §d${ip} §b的 违规 ID 记录：` +
          ` ${oldInfoId ? `§1${oldInfoId} §r-> ` : ''}§d${infoId}`,
      )
    }
  }

  const result = q.getFullInfo(infoId)
  if (!result) throw new Error('Failed to get full info')

  if ('player' in banData) {
    banData.player.kick(
      kickTip || formatLocalKickMsg(banData.player, { reason, endTime }),
    )
  }

  return { result, operationTips }
}

export function queryLocal(
  param: string,
  moreInfo = false,
  strict = false,
): Query.BanFullInfo[] {
  const q = Query.get()
  const ids: number[] = []

  const pushIds = (...newIds: (number | undefined)[]) => {
    newIds.forEach((id) => {
      if (typeof id === 'number' && !ids.includes(id)) ids.push(id)
    })
  }

  if (strict) {
    pushIds(q.getInfoIdFromXuid(param), q.getInfoIdFromName(param))
    if (moreInfo) {
      pushIds(q.getInfoIdFromClientId(param), q.getInfoIdFromIp(param))
    }
  } else {
    if (param.match(/^\d+$/)) {
      pushIds(q.getInfo(parseInt(param, 10))?.id)
    }

    const searchWords = param.split(/\s+/g)
    const banInfoCounts = new Map<number, number>()
    const countBanInfoId = (banInfoId: number) => {
      banInfoCounts.set(banInfoId, (banInfoCounts.get(banInfoId) || 0) + 1)
    }

    searchWords.forEach((word) => {
      q.searchNameInfo(word).forEach((item) => countBanInfoId(item.banInfoId))
      q.searchXuidInfo(word).forEach((item) => countBanInfoId(item.banInfoId))
      q.searchIpInfo(word).forEach((item) => countBanInfoId(item.banInfoId))
      q.searchClientIdInfo(word).forEach((item) => countBanInfoId(item.banInfoId))
      q.searchBanInfo(word).forEach((item) => countBanInfoId(item.id))
    })

    const sortedBanInfoIds = [...banInfoCounts.keys()].sort(
      (a, b) => banInfoCounts.get(b)! - banInfoCounts.get(a)!,
    )
    ids.push(...sortedBanInfoIds)
  }

  return ids.map((id) => q.getFullInfo(id)).filter((v): v is Query.BanFullInfo => !!v)
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
