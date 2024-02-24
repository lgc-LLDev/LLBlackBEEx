import {
  CustomFormEx,
  CustomFormInputObject,
  FormClose,
  SimpleFormEx,
} from 'form-api-ex';

import { queryLocal } from './black-local';
import {
  BlackBECommonData,
  BlackBECommonInfo,
  BlackBEPrivateData,
  BlackBEPrivInfoWithRespId,
  BlackBEReturn,
  check,
  checkPrivate,
  formatBlackBELvl,
} from './blackbe';
import { config, LocalBlackListItem } from './config';
import { PLUGIN_NAME } from './const';
import { blackBEItemForm, localItemForm } from './manage';
import { logErr } from './util';

export async function queryBlackBE(
  param: string
): Promise<[BlackBECommonInfo[], BlackBEPrivInfoWithRespId[]]> {
  const tasks = [
    check({ name: param, qq: param, xuid: param, withToken: false }),
    config.apiToken
      ? checkPrivate({ name: param, qq: param, xuid: param })
      : Promise.resolve(),
  ];

  // @ts-expect-error 故意需要
  const [comm, priv]: [
    BlackBEReturn<BlackBECommonData>,
    BlackBEReturn<BlackBEPrivateData[]>?
  ] = await Promise.all(tasks);

  const commInfo: BlackBECommonInfo[] = [];
  const privInfo: BlackBEPrivInfoWithRespId[] = [];
  if (comm) commInfo.push(...comm.data.info);
  if (priv) {
    for (const repo of priv.data) {
      if (repo.exist)
        privInfo.push(
          ...repo.info.map((v) => ({ ...v, black_id: repo.repo_uuid }))
        );
    }
  }

  return [commInfo, privInfo];
}

export function formatLocalItemShort(obj: LocalBlackListItem): string {
  const { name, xuid, ips, clientIds } = obj;
  const items = [name, xuid, ...(ips ?? []), ...(clientIds ?? [])].filter(
    (v) => v
  ) as string[];

  const it1 = items.shift();
  return `§b${it1}${items.length ? ` §7(${items.join(', ')})` : ''}`;
}

export type QueryResultTypes = 'common' | 'private' | 'local';

export interface QueryResultCommonFormatterArg {
  type: 'common';
  value: BlackBECommonInfo;
}

export interface QueryResultPrivateFormatterArg {
  type: 'private';
  value: BlackBEPrivInfoWithRespId;
}

export interface QueryResultLocalFormatterArg {
  type: 'local';
  value: LocalBlackListItem;
}

export type QueryResultFormatterArg =
  | QueryResultCommonFormatterArg
  | QueryResultPrivateFormatterArg
  | QueryResultLocalFormatterArg;

export const queryResultFormatter = ({
  type,
  value,
}: QueryResultFormatterArg): [string, string?] => {
  const { name, xuid } = value;

  let line1 = '';
  if (type === 'common') line1 = '§2BlackBE 公有库';
  else if (type === 'private') line1 = '§3BlackBE 私有库';
  else line1 = '§5本地库';

  const line2 = `§6${name ?? xuid ?? '未知'}`;

  if ('level' in value) {
    const { level } = value;
    const lvlColor = formatBlackBELvl(level)[1];
    line1 += `§7 | ${lvlColor}等级 ${level}`;
  }

  return [`${line1}\n${line2}`];
};

export async function queryResultForm(
  player: Player,
  param?: string,
  moreInfo = false
) {
  param = param?.trim();
  if (!param) {
    player.tell(`§c请输入要查询的内容`);
    return;
  }

  player.tell(`§a请您稍安勿躁，我们正在努力查询中！`);
  const localRes: LocalBlackListItem[] = [];
  const blackBECommRes: BlackBECommonInfo[] = [];
  const blackBEPrivRes: BlackBEPrivInfoWithRespId[] = [];
  try {
    localRes.push(...queryLocal(param, moreInfo));
    if (!config.disableBlackBE) {
      const [comm, priv] = await queryBlackBE(param);
      blackBECommRes.push(...comm);
      blackBEPrivRes.push(...priv);
    }
  } catch (e) {
    player.tell(`§c出错了！\n${String(e)}`);
  }

  const localNum = localRes.length;
  const privNum = blackBEPrivRes.length;
  const commNum = blackBECommRes.length;

  if (!localNum && !privNum && !commNum) {
    player.tell(
      // prettier-ignore
      `§6很抱歉，我们找遍了本地黑名单${config.disableBlackBE ? '' : '和 BlackBE'}，` +
        `但是没有查询到任何结果 QAQ`
    );
    return;
  }

  const headingSuffixes: string[] = [];
  if (localNum) headingSuffixes.push(`§l§e${localNum} §r§a条本地库记录`);
  if (commNum) headingSuffixes.push(`§l§e${commNum} §r§a条云黑公有库记录`);
  if (privNum) headingSuffixes.push(`§l§e${privNum} §r§a条云黑私有库记录`);
  if (headingSuffixes.length > 1)
    headingSuffixes.push(`和 ${headingSuffixes.pop()}`);
  const heading =
    // prettier-ignore
    `§a为您找到了关于 §l§2${param} §r§a的 ${headingSuffixes.join('， ')}`;

  const form = new SimpleFormEx([
    ...localRes.map((value) => ({ type: 'local', value })),
    ...blackBECommRes.map((value) => ({ type: 'common', value })),
    ...blackBEPrivRes.map((value) => ({ type: 'private', value })),
  ] as QueryResultFormatterArg[]);
  form.title = PLUGIN_NAME;
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.content = `${heading}\n\n${form.content}`;
  form.formatter = queryResultFormatter;

  const sendTask = async () => {
    const res = await form.sendAsync(player);
    if (res !== FormClose) {
      const { type, value } = res;
      const infoRes = await (type === 'local'
        ? localItemForm(player, value, moreInfo)
        : blackBEItemForm(player, value, moreInfo));
      if (infoRes === false) sendTask();
    }
  };
  sendTask();
}

export async function queryFormAsync(player: Player, param?: string) {
  const op = player.isOP();

  if (!param) {
    let form: CustomFormEx<{ param: CustomFormInputObject }> = new CustomFormEx(
      PLUGIN_NAME
    );
    form = form.addLabel(
      `§a请输入查询内容， 我们会帮你从本地库${
        config.disableBlackBE ? '' : '与 BlackBE '
      }中查找结果`
    );
    if (!config.disableBlackBE) {
      form.addLabel(
        '§6请谨慎使用 XUID 查询来自 BlackBE 的记录：\n' +
          '由于历史遗留和 XUID 采集本身存在难度， 导致大部分条目没有记录 XUID， ' +
          '所以不推荐完全依赖 XUID 来判断玩家是否存在于黑名单'
      );
    }
    form = form.addInput('param', '', {
      placeholder: `输入 玩家ID${
        config.disableBlackBE ? '' : ' / QQ号'
      } / XUID${op ? ' / IP地址 / 设备ID' : ''}`,
    });
    const res = await form.sendAsync(player);

    if (res === FormClose) return;
    ({ param } = res);
  }

  await queryResultForm(player, param, op);
}

export function queryCmd(player: Player, param?: string) {
  queryFormAsync(player, param).catch(logErr);
}
