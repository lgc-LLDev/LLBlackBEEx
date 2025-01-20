import { CustomFormEx, FormClose } from 'form-api-ex'

import { banPlayer, queryLocal } from './black-local'
import { config, reloadConfig } from './config'
import { PLUGIN_NAME } from './const'
import { Query } from './db'
import { localListForm } from './manage'
import { formatLocalItemShort, queryCmd } from './query'
import { getOnlineRealPlayers, logErr, tell } from './util'

const ONLY_OP_TEXT = '此命令仅限OP执行'
const NO_CONSOLE_TEXT = '此命令无法在控制台中执行'
const REFUSE_LIST_QUERY_TEXT =
  '本地黑名单请查阅插件配置文件，云黑记录请上云黑官网查询，懒得再给控制台查询写一套代码了'
const NO_ENOUGH_ARG = '参数数量不足'

function checkCommandOp(player?: Player): boolean {
  return !player || player.isOP()
}

function banCommand(willBan: string, time?: number, reason?: string, player?: Player) {
  if (time && time <= 0) {
    tell('§c封禁时间不能小于 0', player)
    return
  }

  const willBanPlayer = mc.getPlayer(willBan)
  const isXuid = /^[0-9]{16}$/.test(willBan)
  const isIp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(willBan)
  const res = banPlayer(
    willBanPlayer
      ? { player: willBanPlayer }
      : {
          name: (isXuid ? data.xuid2name(willBan) : null) ?? willBan,
          xuid: isXuid ? willBan : data.name2xuid(willBan) ?? undefined,
          ip: isIp ? willBan : undefined,
        },
    {
      time: time ? time * 60 * 1000 : undefined,
      reason,
    },
  )

  const { operationTips } = res
  for (const tip of operationTips) tell(tip, player)
}

export async function banForm(player: Player) {
  const players = getOnlineRealPlayers()
  const form = new CustomFormEx(PLUGIN_NAME)
    .addDropdown(
      'playerDropdown',
      '如果你想要封禁的玩家在线，请在这里选择',
      players.map((p) => p.realName),
    )
    .addInput(
      'playerInput',
      '如果你想封禁的玩家不在线，请在这里输入他的 XboxID / XUID / IP\n' +
        '此栏优先于在线玩家下拉框',
    )
    .addInput(
      'time',
      '请输入要封禁的时间，单位为分钟 (如果值 为空 / 不为数字 / 小于等于 0，将会判断为永久)',
    )
    .addInput('reason', '请输入封禁理由（可选）')

  const res = await form.sendAsync(player)
  if (res === FormClose) return

  const { playerDropdown, time } = res

  const playerInput = res.playerInput.trim()
  const willBan = playerInput || (players ? players[playerDropdown].xuid : undefined)

  if (!willBan) {
    player.tell('§c要封禁的玩家无效')
    return
  }

  const timeNum = Number(time) || undefined
  const reason = res.reason.trim() || undefined

  banCommand(willBan, timeNum, reason, player)
}

function unBanCommand(willUnBan: string, player?: Player, unBanEntirely?: boolean) {
  if (unBanEntirely) {
    const queried = queryLocal(willUnBan, true, true)
    if (!queried.length) {
      tell('§a执行完毕，没有项目变动', player)
      return
    }

    const q = Query.get()
    const suc: Query.BanFullInfo[] = []
    for (const obj of queried) {
      if (q.deleteInfo(obj.id)) suc.push(obj)
    }
    tell(
      `§a已成功删除 §6${suc.length} §a条记录§r\n` +
        `${suc.map((v) => `- ${formatLocalItemShort(v)}§r`).join('\n')}`,
      player,
    )
  } else {
    const q = Query.get()
    const res = q.getInfoIdUniversal(willUnBan)
    if (!res) {
      tell('§a执行完毕，没有项目变动', player)
      return
    }

    const [type, infoId] = res
    const delOk = q.delBanUniversal(type, willUnBan)
    if (!infoId || !delOk) {
      tell('§c删除失败', player)
      return
    }

    tell(`§a已成功解封 ${Query.banTypeStrMap[type]} ${willUnBan}`, player)

    if (q.isInfoAlone(infoId)) {
      q.deleteInfo(infoId)
      tell(
        `§6因对应封禁记录 （ID： ${infoId}） 没有任何对应的玩家信息，已附带删除`,
        player,
      )
    }
  }
}

mc.listen('onServerStarted', () => {
  interface CmdMainCallbackData {
    enumReload?: 'reload'

    enumQuery?: 'query'
    queryString?: string

    enumBan?: 'ban'
    player?: string
    reason?: string
    duration?: number

    enumUnBan?: 'unban'
    // player 上面有

    enumLocal?: 'local'
  }

  const cmdMain = mc.newCommand('blackbe', PLUGIN_NAME, PermType.Any)

  cmdMain.setEnum('enumReload', ['reload'])
  cmdMain.mandatory('enumReload', ParamType.Enum, 'enumReload', 1)
  cmdMain.overload(['enumReload'])

  cmdMain.setEnum('enumQuery', ['query'])
  cmdMain.mandatory('enumQuery', ParamType.Enum, 'enumQuery', 1)
  cmdMain.optional('queryString', ParamType.String)
  cmdMain.overload(['enumQuery', 'queryString'])

  cmdMain.setEnum('enumBan', ['ban'])
  cmdMain.mandatory('enumBan', ParamType.Enum, 'enumBan', 1)
  cmdMain.mandatory('player', ParamType.String)
  cmdMain.optional('reason', ParamType.String)
  cmdMain.optional('duration', ParamType.Int)
  cmdMain.overload(['enumBan', 'player', 'reason', 'duration'])
  cmdMain.overload(['enumBan']) // ban form

  cmdMain.setEnum('enumUnBan', ['unban'])
  cmdMain.mandatory('enumUnBan', ParamType.Enum, 'enumUnBan', 1)
  // player 上面有
  cmdMain.overload(['enumUnBan', 'player'])

  cmdMain.setEnum('enumLocal', ['local'])
  cmdMain.mandatory('enumLocal', ParamType.Enum, 'enumLocal', 1)
  cmdMain.overload(['enumLocal'])

  cmdMain.overload([])

  cmdMain.setCallback((_, { player }, out, result: CmdMainCallbackData) => {
    const {
      enumReload,
      enumQuery,
      queryString,
      enumBan,
      player: stringSelector,
      reason,
      duration,
      enumUnBan,
      enumLocal,
    } = result

    if (enumReload) {
      if (!checkCommandOp(player)) {
        out.error(ONLY_OP_TEXT)
        return false
      }

      try {
        reloadConfig()
      } catch (e) {
        out.error(`出错了！\n${String(e)}`)
        return false
      }
      out.success(
        `§a成功重载配置文件与本地黑名单！部分配置项需要重启服务器才可以生效！`,
      )
      return true
    }

    if (enumQuery) {
      if (!player) {
        out.error(NO_CONSOLE_TEXT)
        out.error(REFUSE_LIST_QUERY_TEXT)
        return false
      }
      if (config.onlyOpCanQuery && !player.isOP()) {
        out.error(ONLY_OP_TEXT)
        return false
      }
      queryCmd(player, queryString)
      return true
    }

    if (enumBan) {
      if (!checkCommandOp(player)) {
        out.error(ONLY_OP_TEXT)
        return false
      }

      if (player && !stringSelector) {
        banForm(player).catch(logErr)
        return true
      }

      if (stringSelector) {
        banCommand(stringSelector, duration, reason, player)
        return true
      }

      out.error(NO_ENOUGH_ARG)
      return false
    }

    if (enumUnBan) {
      if (!checkCommandOp(player)) {
        out.error(ONLY_OP_TEXT)
        return false
      }

      if (stringSelector) {
        unBanCommand(stringSelector, player)
        return true
      }
      return false // never reach?
    }

    if (enumLocal) {
      if (!player) {
        out.error(NO_CONSOLE_TEXT)
        out.error(REFUSE_LIST_QUERY_TEXT)
        return false
      }

      if (!player.isOP()) {
        out.error(ONLY_OP_TEXT)
        return false
      }

      localListForm(player).catch(logErr)
      return true
    }

    out.error(`请输入子命令`)
    return false
  })

  cmdMain.setup()

  if (config.registerBanCommand) {
    interface CmdBanCallbackData {
      player: string
      reason?: string
      duration?: number
    }

    const cmdBan = mc.newCommand(
      'ban',
      `${PLUGIN_NAME} - 本地黑名单封禁`,
      PermType.GameMasters,
    )
    cmdBan.mandatory('player', ParamType.String)
    cmdBan.optional('reason', ParamType.String)
    cmdBan.optional('duration', ParamType.Int)
    cmdBan.overload(['player', 'reason', 'duration'])
    cmdBan.setCallback(
      (
        _cmd,
        { player },
        _out,
        { player: stringSelector, reason, duration }: CmdBanCallbackData,
      ) => {
        banCommand(stringSelector, duration, reason, player)
        return true
      },
    )
    cmdBan.setup()

    interface CmdUnBanCallbackData {
      player: string
      unBanEntirely?: boolean
    }

    const cmdUnBan = mc.newCommand(
      'unban',
      `${PLUGIN_NAME} - 本地黑名单解封`,
      PermType.GameMasters,
    )
    cmdUnBan.mandatory('player', ParamType.String)
    cmdUnBan.optional('unBanEntirely', ParamType.Bool)
    cmdUnBan.overload(['player'])
    cmdUnBan.overload(['player', 'unBanEntirely'])
    cmdUnBan.setCallback(
      (
        _cmd,
        { player },
        _out,
        { player: stringSelector, unBanEntirely }: CmdUnBanCallbackData,
      ) => {
        unBanCommand(stringSelector, player, unBanEntirely ?? false)
        return true
      },
    )
    cmdUnBan.setup()
  }
})
