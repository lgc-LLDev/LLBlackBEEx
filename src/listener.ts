import { formatError, wrapAsyncFunc } from 'form-api-ex'

import { banPlayer, formatLocalInfo } from './black-local'
import { check, formatBlackBEInfo, formatBlackBEKickMsg } from './blackbe'
import { config } from './config'
import { Query } from './db'
import { formatLocalItemShort } from './query'
import { delFormatCode, stripIp, tell } from './util'

// hhh
const listenerType = (config.processOnPreJoin
  ? 'onPreJoin'
  : 'onJoin') as unknown as 'onJoin'

mc.listen(
  listenerType,
  wrapAsyncFunc(async (player) => {
    if (player.isSimulatedPlayer()) return

    // 查本地
    const { hidePassMessage, banIp, banDevice } = config

    const { realName, xuid } = player
    const { ip, clientId } = player.getDevice()
    const stripedIp = stripIp(ip)

    if (!hidePassMessage) {
      logger.info(`正在从本地黑名单查询玩家 ${realName} 的封禁记录……`)
    }

    let localId: number | undefined
    try {
      const q = Query.get()
      do {
        if ((localId = q.getInfoIdFromXuid(xuid))) break
        if ((localId = q.getInfoIdFromName(realName))) break
        if (banIp ? false : (localId = q.getInfoIdFromClientId(clientId))) break
        if (banDevice ? false : (localId = q.getInfoIdFromIp(stripedIp))) break
      } while (false)
    } catch (e) {
      logger.error(`查询玩家 ${realName} 的本地黑名单记录出错！\n${formatError(e)}`)
      return
    }
    if (localId) {
      // 更新信息，例如 ip 地址，顺便踢掉
      const { result, operationTips } = banPlayer({ player })
      logger.warn(`查询到玩家 ${realName} 存在本地封禁记录，已将其踢出`)
      tell(formatLocalInfo(result, true))
      for (const tip of operationTips) tell(tip, player)
      return
    }

    if (!hidePassMessage) {
      logger.info(`没有查询到玩家 ${realName} 的本地黑名单记录`)
    }

    // 查 BlackBE
    if (
      config.pardonBlackBE.includes(realName) ||
      config.pardonBlackBE.includes(xuid)
    ) {
      if (!hidePassMessage) {
        logger.info(`玩家 ${realName} 的 BlackBE 违规记录检查已被赦免`)
      }
      return
    }

    if (!hidePassMessage) {
      logger.info(`正在从 BlackBE 查询玩家 ${realName} 的违规记录……`)
    }

    try {
      const { data } = await check({ name: realName, xuid })
      const { exist, info } = data

      if (exist) {
        banPlayer({ player }, { kickTip: formatBlackBEKickMsg(info[0]) })

        const formattedInfo =
          `§6查询到玩家 §d${realName} §6在 BlackBE 中存在违规记录！\n` +
          `§c已将其踢出并加入本地黑名单！§r\n` +
          `${await formatBlackBEInfo(info[0])}`
        mc.broadcast(formattedInfo)
        logger.warn(delFormatCode(formattedInfo))

        return
      }
    } catch (e) {
      logger.error(`查询玩家 ${realName} 的 BlackBE 违规记录出错！\n${formatError(e)}`)
      return
    }

    if (!hidePassMessage) logger.info(`没有查询到玩家 ${realName} 的 BlackBE 违规记录`)
  }),
)

setInterval(() => {
  const q = Query.get()
  const expiredInfoIds: number[] = []

  for (const it of q.iterAllInfos()) {
    const { id, endTime } = it
    const nowTime = Date.now()
    if (endTime && nowTime >= new Date(endTime).getTime()) {
      expiredInfoIds.push(id)
    }
  }

  if (!expiredInfoIds.length) return

  const expiredFullInfos = expiredInfoIds
    .map((id) => q.getFullInfo(id))
    .filter((v): v is Query.BanFullInfo => !!v)

  for (const id of expiredInfoIds) q.deleteInfo(id)

  logger.warn(`本地黑名单中有 ${expiredInfoIds.length} 条记录到期，已自动删除`)
  for (const info of expiredFullInfos) {
    logger.warn(`- ${delFormatCode(formatLocalItemShort(info))}`)
  }
}, config.checkLocalListInterval)
