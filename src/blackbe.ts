import { config } from './config';
import { formatDate, formatVarString, getAsync, postAsync } from './util';

export interface BlackBECommonInfo {
  uuid: string;
  name: string;
  black_id: string;
  xuid: string;
  info: string;
  level: 1 | 2 | 3;
  qq: number;
  photos?: string[];
}

export interface BlackBECommonData {
  exist: boolean;
  info: BlackBECommonInfo[];
}

export interface BlackBEPrivateInfo {
  uuid: string;
  name: string;
  xuid: string;
  info: string;
  server: string;
  time: string;
  level: 1 | 2 | 3;
  qq: number;
  area_code: string;
  phone: number;
}

export interface BlackBEPrivateData {
  repo_success: boolean;
  repo_uuid: string;
  exist: boolean;
  info: BlackBEPrivateInfo[];
}

export interface BlackBEPrivRespInfo {
  uuid: string;
  name: string;
  type: 1 | 2;
  list_num: number;
  server: string;
  server_type: string;
}

export interface BlackBEPrivRespData {
  repositories_num: number;
  repositories_list: BlackBEPrivRespInfo[];
}

export interface BlackBEPrivPieceInfo {
  uuid: string;
  name: string;
  xuid: string;
  info: string;
  time: string;
  level: 1 | 2 | 3;
  qq: number;
  area_code: string;
  phone: number;
}

export interface BlackBEPrivPieceData {
  repositories_name: string;
  page_num: number;
  piece_num: number;
  piece_list: BlackBEPrivPieceInfo[];
}

export interface BlackBEPrivUploadParam {
  black_id: string;
  name: string;
  level: number;
  xuid?: string;
  info?: string;
  server?: string;
  time?: string;
  qq?: number;
  area_code?: string;
  phone?: number;
}

export interface BlackBEPrivUploadData {
  uuid: string;
}

export interface BlackBEReturn<T> {
  success: boolean;
  status: number;
  message: string;
  version: string;
  codename: string;
  time: number;
  data: T;
}

export type BlackBEQueryInfo = BlackBECommonInfo | BlackBEPrivateInfo;
export type BlackBEPrivInfoWithRespId = BlackBEPrivateInfo & {
  black_id: string;
};
export type BlackBEQueryInfoWithRespId =
  | BlackBECommonInfo
  | BlackBEPrivInfoWithRespId;

const defaultUploadParams = {
  xuid: '1000000000000000',
  info: '无',
  server: config.serverName,
  time: formatDate({ withTime: false }),
  qq: 1000000000,
  area_code: '+86',
  phone: 10000000000,
};

export const cachedPrivResp: BlackBEPrivRespInfo[] = [];

function getHeaders(auth = true) {
  const headers: any = {
    // 'Content-Type': 'application/json',
  };

  if (auth && config.apiToken)
    headers.Authorization = `Bearer ${config.apiToken}`;

  return headers;
}

const buildUrl = (path: string): string =>
  String(new URL(`openapi/v3/${path}`, config.apiHost));

function checkIsWithToken(options: { withToken?: boolean }): boolean {
  const withToken = options.withToken ?? true;
  delete options.withToken;
  return withToken;
}

export async function getPrivateRespList(): Promise<
  BlackBEReturn<BlackBEPrivRespData>
> {
  const resp: BlackBEReturn<BlackBEPrivRespData> = await getAsync({
    url: buildUrl('private/repositories/list'),
    headers: getHeaders(),
    responseType: 'json',
  });

  cachedPrivResp.length = 0;
  cachedPrivResp.push(...resp.data.repositories_list);
  return resp;
}

export function getPrivatePieceList(options: {
  uuid: string;
  page?: number;
  page_size?: number;
}): Promise<BlackBEReturn<BlackBEPrivPieceData>> {
  return getAsync({
    url: buildUrl('private/repositories/piece/list'),
    params: options,
    headers: getHeaders(),
    responseType: 'json',
  });
}

export function uploadPrivatePiece(
  options: BlackBEPrivUploadParam
): Promise<BlackBEReturn<BlackBEPrivUploadData>> {
  return postAsync({
    url: buildUrl('private/repositories/piece/upload'),
    data: { ...defaultUploadParams, options },
    headers: getHeaders(),
    responseType: 'json',
  });
}

export function deletePrivatePiece(options: {
  piece_uuid: string;
}): Promise<BlackBEReturn<[]>> {
  return postAsync({
    url: buildUrl('private/repositories/piece/delete'),
    data: options,
    headers: getHeaders(),
    responseType: 'json',
  });
}

export function check(options: {
  name?: string;
  qq?: string;
  xuid?: string;
  withToken?: boolean;
}): Promise<BlackBEReturn<BlackBECommonData>> {
  const withToken = checkIsWithToken(options);
  return postAsync({
    url: buildUrl('check'),
    data: options,
    headers: getHeaders(withToken),
    responseType: 'json',
  });
}

export async function checkPrivate(options: {
  name?: string;
  qq?: string;
  xuid?: string;
}): Promise<BlackBEReturn<BlackBEPrivateData[]>> {
  if (!cachedPrivResp.length) await getPrivateRespList();
  return postAsync({
    url: buildUrl('check/private'),
    params: options,
    data: { repositories_uuid: cachedPrivResp.map((v) => v.uuid) },
    headers: getHeaders(),
    responseType: 'json',
  });
}

export async function getRepoByUuid(
  uuid: string
): Promise<BlackBEPrivRespInfo | null> {
  if (uuid === '1')
    return {
      uuid,
      name: '公有库',
      type: 1,
      list_num: 0,
      server: '',
      server_type: '',
    };

  if (!cachedPrivResp.length) await getPrivateRespList();
  for (const resp of cachedPrivResp) if (resp.uuid === uuid) return resp;

  return null;
}

/**
 * @returns [ 等级描述，对应颜色 ]
 */
export function formatBlackBELvl(lvl: number): [string, string] {
  switch (lvl) {
    case 1:
      return ['有作弊行为，但未对其他玩家造成实质上损害', '§e'];
    case 2:
      return ['有作弊行为，且对玩家造成一定的损害', '§g'];
    case 3:
      return ['严重破坏服务器，对玩家和服务器造成较大的损害', '§c'];
    default:
      return ['未知', '§r'];
  }
}

export async function formatBlackBEInfo(
  obj: BlackBEQueryInfoWithRespId,
  moreInfo = false
): Promise<string> {
  const isPriv = 'phone' in obj;
  const { uuid, name, xuid, info, level, qq, black_id } = obj;

  const repo = await getRepoByUuid(black_id);
  const repoName = repo ? repo.name : '未知';
  const [lvlDesc, lvlColor] = formatBlackBELvl(level);

  const lines: string[] = [];
  lines.push(`§2玩家ID§r： §l§d${name}§r`);
  lines.push(
    `§2危险等级§r： ${lvlColor}等级 §l${level} §r${lvlColor}（${lvlDesc}）`
  );
  lines.push(`§2记录原因§r： §b${info}`);
  if (isPriv) lines.push(`§2违规服务器§r： §b${obj.server}`);
  lines.push(`§2XUID§r： §b${xuid}`);
  lines.push(`§2玩家QQ§r： §b${qq}`);
  if (isPriv && moreInfo)
    lines.push(`§2玩家电话§r： §b${obj.area_code} ${obj.phone}`);
  if (isPriv) lines.push(`§2记录时间§r： §b${obj.time}`);
  lines.push(`§2记录UUID§r： §b${uuid}`);
  lines.push(`§2来源库§r： §b${repoName} （${black_id}）`);

  return lines.join('\n');
}

export function formatBlackBEKickMsg(info?: BlackBECommonInfo): string {
  const obj = {};

  if (info) {
    const [lvlDesc, lvlColor] = formatBlackBELvl(info.level);
    Object.assign(obj, {
      UUID: info.uuid,
      NAME: info.name,
      BLACK_ID: info.black_id,
      XUID: info.xuid,
      INFO: info.info,
      LEVEL: info.level,
      LEVEL_DESC: lvlDesc,
      LEVEL_COLOR: lvlColor,
      QQ: info.qq,
    });
  }

  return formatVarString(config.kickByCloudMsg, obj);
}

export function clearCache() {
  cachedPrivResp.length = 0;
}

setInterval(() => clearCache(), config.clearCacheInterval);
