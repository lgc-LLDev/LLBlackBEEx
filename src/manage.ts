import {
  CustomFormEx,
  FormClose,
  sendModalFormAsync,
  SimpleFormEx,
} from 'form-api-ex';

import { formatLocalInfo, queryLocal } from './black-local';
import {
  BlackBECommonInfo,
  BlackBEPrivInfoWithRespId,
  formatBlackBEInfo,
} from './blackbe';
import { LocalBlackListItem, localList, saveLocalList } from './config';
import { PLUGIN_NAME } from './const';
import {
  formatDate,
  processListFormReturn,
  setupFunctionalityForm,
} from './util';

export function delLocalListItem(obj: LocalBlackListItem): boolean {
  const { list } = localList;
  const deleted = list.splice(list.indexOf(obj), 1);
  saveLocalList();
  return !!deleted.length;
}

export async function localItemForm(
  player: Player,
  obj: LocalBlackListItem,
  moreInfo = false
): Promise<boolean> {
  const delItem = async () => {
    if (
      await sendModalFormAsync(
        player,
        PLUGIN_NAME,
        '§6真的要删除这条黑名单项目吗？\n§c删前请三思！！！'
      )
    ) {
      player.tell(
        delLocalListItem(obj)
          ? '§a删除成功！'
          : '§c删除失败！未找到该黑名单项目'
      );
    } else {
      player.tell('§6删除操作已取消');
    }
  };

  const editTime = async () => {
    const res = await new CustomFormEx(PLUGIN_NAME)
      .addSwitch('forever', '是否永久封禁', !obj.endTime)
      .addInput(
        'time',
        '如果不是永久封禁，请输入从现在开始要封禁的时间（单位分钟）'
      )
      .sendAsync(player);

    if (res === FormClose) {
      player.tell('§6修改操作已取消');
      return;
    }

    const { forever, time } = res;
    const timeNum = Number(time);
    if ((!timeNum || timeNum <= 0) && !forever) {
      await sendModalFormAsync(
        player,
        PLUGIN_NAME,
        '§c请输入正确的封禁时间！',
        '§a知道了',
        '§a知道了'
      );
      editTime();
      return;
    }

    // 引用 可以直接改
    obj.endTime = forever
      ? undefined
      : new Date(Date.now() + timeNum * 60 * 1000).toJSON();
    saveLocalList();

    player.tell('§a操作成功！');
  };

  const editDesc = async () => {
    const res = await new CustomFormEx(PLUGIN_NAME)
      .addInput('reason', '请输入想修改的封禁原因内容', {
        placeholder: '如想要清空封禁原因请留空',
        default: obj.reason,
      })
      .sendAsync(player);

    if (res === FormClose) {
      player.tell('§6修改操作已取消');
      return;
    }

    const reason = res.reason.trim();
    obj.reason = reason || undefined;
    saveLocalList();

    player.tell('§a操作成功！');
  };

  const form = setupFunctionalityForm([['返回', null]]);
  form.content = formatLocalInfo(obj, moreInfo);
  if (moreInfo)
    form.buttons.unshift(
      ['删除条目', delItem],
      ['修改封禁时间', editTime],
      ['修改封禁原因', editDesc]
    );
  return processListFormReturn(await form.sendAsync(player));
}

export async function blackBEItemForm(
  player: Player,
  obj: BlackBECommonInfo | BlackBEPrivInfoWithRespId,
  moreInfo = false
): Promise<boolean> {
  const form = setupFunctionalityForm([['返回', null]]);
  form.content = await formatBlackBEInfo(obj, moreInfo);
  return processListFormReturn(await form.sendAsync(player));
}

export async function localListForm(player: Player) {
  if (!localList.list.length) {
    player.tell(`§6本地黑名单列表为空`);
    return;
  }

  const form = new SimpleFormEx(localList.list);
  form.title = PLUGIN_NAME;
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.hasSearchButton = true;
  form.formatter = ({ name, xuid, endTime }) => [
    `§6${name ?? '未知'} §7(${xuid ?? '未知'})\n` +
      `§2${
        endTime ? `${formatDate({ date: new Date(endTime) })} 解封` : '永久封禁'
      }`,
  ];
  form.searcher = (_, param) => queryLocal(param, true);

  const sendTask = async () => {
    const res = await form.sendAsync(player);
    if (res !== FormClose) {
      const infoRes = await localItemForm(player, res, true);
      if (infoRes === false) sendTask();
    }
  };
  sendTask();
}
