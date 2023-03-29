import { banPlayer, queryLocal } from './black-local';
import { config, reloadConfig } from './config';
import { PLUGIN_NAME } from './const';
import { delLocalListItem, localListForm } from './manage';
import { formatLocalItemShort, queryCmd } from './query';
import { delFormatCode, wrapAsyncFunc } from './util';

function checkOp(player?: Player): boolean {
  return !player || player.isOP();
}

const ONLT_OP_TEXT = '此命令仅限OP执行';
const NO_CONSOLE_TEXT = '此命令无法在控制台中执行';
const REFUSE_LIST_QUERY_TEXT =
  '本地黑名单请查阅插件配置文件，云黑记录请上云黑官网查询，懒得再给控制台查询写一套代码了';

function tell(msg: string, player?: Player) {
  if (player) player.tell(msg);
  else if (msg.startsWith('§c'))
    logger.error(delFormatCode(msg.replace('§c', '')));
  else logger.info(delFormatCode(msg));
}

function banCommand(
  willBan: string,
  time?: number,
  reason?: string,
  player?: Player
) {
  if (time && time <= 0) {
    tell('§c封禁时间不能小于 0', player);
    return;
  }

  const willBanPlayer = mc.getPlayer(willBan);
  const isXuid = /^[0-9]{16}$/.test(willBan);
  const isIp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(willBan);
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
    }
  );
  if (!res) return;

  const { isModify, results } = res;
  if (results.length) {
    tell(
      `§a已成功${isModify ? '修改' : '增加'} §6${results.length} §a条项目§r\n` +
        `${results.map((v) => `- ${formatLocalItemShort(v)}§r`).join('\n')}`,
      player
    );
  } else {
    tell('§a执行成功，没有项目变动', player);
  }
}

function unBanCommand(willUnBan: string, player?: Player) {
  const queried = queryLocal(willUnBan, true, true);
  if (!queried.length) {
    tell('§a执行成功，没有项目变动', player);
    return;
  }

  const succ = [];
  for (const obj of queried) {
    if (delLocalListItem(obj)) succ.push(obj);
  }

  tell(
    `§a已成功删除 §6${succ.length} §a条项目§r\n` +
      `${succ.map((v) => `- ${formatLocalItemShort(v)}§r`).join('\n')}`,
    player
  );
}

interface CmdMainCallbackData {
  enumReload?: 'reload';

  enumQuery?: 'query';
  queryString?: string;

  enumBan?: 'ban';
  player: string;
  reason?: string;
  duration?: number;

  enumUnban?: 'unban';
  // player 上面有

  enumLocal?: 'local';
}

const cmdMain = mc.newCommand('blackbe', PLUGIN_NAME, PermType.Any);

cmdMain.setEnum('enumReload', ['reload']);
cmdMain.mandatory('enumReload', ParamType.Enum, 'enumReload', 1);
cmdMain.overload(['enumReload']);

cmdMain.setEnum('enumQuery', ['query']);
cmdMain.mandatory('enumQuery', ParamType.Enum, 'enumQuery', 1);
cmdMain.optional('queryString', ParamType.String);
cmdMain.overload(['enumQuery', 'queryString']);

cmdMain.setEnum('enumBan', ['ban']);
cmdMain.mandatory('enumBan', ParamType.Enum, 'enumBan', 1);
cmdMain.mandatory('player', ParamType.String);
cmdMain.optional('reason', ParamType.String);
cmdMain.optional('duration', ParamType.Int);
cmdMain.overload(['enumBan', 'player', 'reason', 'duration']);

cmdMain.setEnum('enumUnBan', ['unban']);
cmdMain.mandatory('enumUnBan', ParamType.Enum, 'enumUnBan', 1);
// player 上面有
cmdMain.overload(['enumUnBan', 'player']);

cmdMain.setEnum('enumLocal', ['local']);
cmdMain.mandatory('enumLocal', ParamType.Enum, 'enumLocal', 1);
cmdMain.overload(['enumLocal']);

cmdMain.overload([]);

cmdMain.setCallback((_, { player }, out, result: CmdMainCallbackData) => {
  const {
    enumReload,
    enumQuery,
    queryString,
    enumBan,
    player: stringSelector,
    reason,
    duration,
    enumUnban,
    enumLocal,
  } = result;

  if (enumReload) {
    if (!checkOp(player)) {
      out.error(ONLT_OP_TEXT);
      return false;
    }

    try {
      reloadConfig();
    } catch (e) {
      out.error(`出错了！\n${String(e)}`);
      return false;
    }
    out.success(
      `§a成功重载配置文件与本地黑名单！部分配置项需要重启服务器才可以生效！`
    );
    return true;
  }

  if (enumQuery) {
    if (!player) {
      out.error(NO_CONSOLE_TEXT);
      out.error(REFUSE_LIST_QUERY_TEXT);
      return false;
    }
    queryCmd(player, queryString);
    return true;
  }

  if (enumBan) {
    if (!checkOp(player)) {
      out.error(ONLT_OP_TEXT);
      return false;
    }

    banCommand(stringSelector, duration, reason, player);
    return true;
  }

  if (enumUnban) {
    if (!checkOp(player)) {
      out.error(ONLT_OP_TEXT);
      return false;
    }

    unBanCommand(stringSelector, player);
    return true;
  }

  if (enumLocal) {
    if (!player) {
      out.error(NO_CONSOLE_TEXT);
      out.error(REFUSE_LIST_QUERY_TEXT);
      return false;
    }

    if (!player.isOP()) {
      out.error(ONLT_OP_TEXT);
      return false;
    }

    wrapAsyncFunc(localListForm)(player);
    return true;
  }

  out.error(`请输入子命令`);
  return false;
});

cmdMain.setup();

if (config.registerBanCommand) {
  const cmdBan = mc.newCommand(
    'ban',
    `${PLUGIN_NAME} - 本地黑名单封禁`,
    PermType.GameMasters
  );
  cmdBan.mandatory('player', ParamType.String);
  cmdBan.optional('reason', ParamType.String);
  cmdBan.optional('duration', ParamType.Int);
  cmdBan.overload(['player', 'reason', 'duration']);
  cmdBan.setCallback(
    (
      _,
      { player },
      __,
      {
        player: stringSelector,
        reason,
        duration,
      }: {
        player: string;
        reason?: string;
        duration?: number;
      }
    ) => {
      banCommand(stringSelector, duration, reason, player);
      return true;
    }
  );
  cmdBan.setup();

  const cmdUnBan = mc.newCommand(
    'unban',
    `${PLUGIN_NAME} - 本地黑名单解封`,
    PermType.GameMasters
  );
  cmdUnBan.mandatory('player', ParamType.String);
  cmdUnBan.overload(['player']);
  cmdUnBan.setCallback(
    (
      _,
      { player },
      __,
      {
        player: stringSelector,
      }: {
        player: string;
      }
    ) => {
      unBanCommand(stringSelector, player);
      return true;
    }
  );
  cmdUnBan.setup();
}
