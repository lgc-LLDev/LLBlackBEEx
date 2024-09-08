import { CustomFormEx, FormClose, sendModalFormAsync, SimpleFormEx } from 'form-api-ex'

import { formatLocalInfo, queryLocal } from './black-local'
import {
  BlackBECommonInfo,
  BlackBEPrivInfoWithRespId,
  formatBlackBEInfo,
} from './blackbe'
import { PLUGIN_NAME } from './const'
import { Query } from './db'
import { formatDate, processListFormReturn, setupFunctionalityForm } from './util'

export async function localItemForm(
  player: Player,
  obj: Query.BanFullInfo,
  moreInfo = false,
): Promise<boolean> {
  const delFullItem = async () => {
    if (
      await sendModalFormAsync(
        player,
        PLUGIN_NAME,
        '§6真的要删除这条黑名单项目吗？\n' +
          '§c如果这么做，该项目下的所有已记录 XUID / 玩家名 / 客户端 ID / IP 都将会解封！' +
          '删前请三思！！！',
      )
    ) {
      player.tell(
        Query.get().deleteInfo(obj.id)
          ? '§a删除成功！'
          : '§c删除失败！未找到该黑名单项目',
      )
    } else {
      player.tell('§6删除操作已取消')
    }
  }

  const delRecordItem = async (tip?: string) => {
    const { name, xuid, clientId, ip } = obj
    const items = [
      ...name.map((x) => [Query.BanType.NAME, x] as const),
      ...xuid.map((x) => [Query.BanType.XUID, x] as const),
      ...clientId.map((x) => [Query.BanType.CLIENT_ID, x] as const),
      ...ip.map((x) => [Query.BanType.IP, x] as const),
    ]
    const res = await new CustomFormEx(PLUGIN_NAME)
      .addDropdown(
        'itIdx',
        `${tip}§r\n请选择要删除的记录项`,
        items.map(([t, v]) => `${Query.banTypeStrMap[t]} | ${v}`),
      )
      .sendAsync(player)
    if (res === FormClose) return

    const { itIdx } = res
    const [type, value] = items[itIdx]

    const q = Query.get()
    q.delBanUniversal(type, value)
    obj = q.getFullInfo(obj.id)!

    const nowTip = `§a已解封 ${Query.banTypeStrMap[type]} ${value}`
    player.tell(nowTip)

    if (q.isInfoAlone(obj)) {
      player.tell('§6因该封禁记录已没有任何对应的玩家信息，已附带删除')
      return
    }
    delRecordItem(nowTip)
  }

  const editInfo = async () => {
    const res = await new CustomFormEx(PLUGIN_NAME)
      .addSwitch('forever', '是否永久封禁', !obj.endTime)
      .addInput('time', '如果不是永久封禁，请输入从现在开始要封禁的时间（单位分钟）')
      .addInput('reason', '请输入想修改的封禁原因内容，如想要清空封禁原因请留空', {
        default: obj.reason ?? '',
      })
      .sendAsync(player)

    if (res === FormClose) {
      player.tell('§6修改操作已取消')
      return
    }

    const { forever, time, reason } = res
    const timeNum = Number(time)
    if ((!timeNum || timeNum <= 0) && !forever) {
      await sendModalFormAsync(
        player,
        PLUGIN_NAME,
        '§c请输入正确的封禁时间！',
        '§a知道了',
        '§a知道了',
      )
      editInfo()
      return
    }

    const q = Query.get()
    q.updateInfo({
      id: obj.id,
      endTime: forever ? null : new Date(Date.now() + timeNum * 60 * 1000).toJSON(),
      reason: reason.trim() || null,
    })
    obj = q.getFullInfo(obj.id)!

    player.tell('§a操作成功！')
  }

  const form = setupFunctionalityForm([['返回', null]])
  form.content = formatLocalInfo(obj, moreInfo)
  if (moreInfo) {
    form.buttons.unshift(
      ['删除整个条目', delFullItem],
      ['删除记录项', delRecordItem],
      ['修改封禁信息', editInfo],
    )
  }
  return processListFormReturn(await form.sendAsync(player))
}

export async function blackBEItemForm(
  player: Player,
  obj: BlackBECommonInfo | BlackBEPrivInfoWithRespId,
  moreInfo = false,
): Promise<boolean> {
  const form = setupFunctionalityForm([['返回', null]])
  form.content = await formatBlackBEInfo(obj, moreInfo)
  return processListFormReturn(await form.sendAsync(player))
}

export async function localListForm(player: Player) {
  const q = Query.get()
  const localList = [...q.iterAllInfos()]

  if (!localList.length) {
    player.tell(`§6本地黑名单列表为空`)
    return
  }

  const form = new SimpleFormEx(localList)
  form.title = PLUGIN_NAME
  form.canTurnPage = true
  form.canJumpPage = true
  form.hasSearchButton = true
  form.formatter = ({ id, endTime }) => {
    const q = Query.get()
    const endTimeStr = endTime ? formatDate({ date: new Date(endTime) }) : '永久封禁'
    const content = [
      q.getNameFromInfoId(id),
      q.getXuidFromInfoId(id),
      q.getClientIdFromInfoId(id),
      q.getIpFromInfoId(id),
    ].flat()
    const contentStr = content.join(', ')
    const contentStrCut =
      contentStr.length > 25 ? contentStr.slice(0, 25) + '...' : contentStr
    return [`§bID： ${id} §7| §2${endTimeStr}\n${contentStrCut}`]
  }
  form.searcher = (_, param) => queryLocal(param, true)

  const sendTask = async () => {
    const res = await form.sendAsync(player)
    if (res === FormClose) return

    const info = Query.get().getFullInfo(res.id)
    if (!info) {
      sendModalFormAsync(
        player,
        PLUGIN_NAME,
        '§c未找到该黑名单项目！',
        '§a知道了',
        '§a知道了',
      )
      sendTask()
    } else {
      const infoRes = await localItemForm(player, info, true)
      if (infoRes === false) sendTask()
    }
  }
  sendTask()
}
