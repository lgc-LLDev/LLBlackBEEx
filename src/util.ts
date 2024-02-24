import { SimpleFormEx, formatError } from 'form-api-ex';

import { PLUGIN_NAME } from './const';

export function formatDate(
  options: {
    withTime?: boolean;
    date?: Date;
  } = {}
): string {
  const date = options.date ?? new Date();
  const withTime = options.withTime ?? true;

  const yr = date.getFullYear();
  const mon = date.getMonth() + 1;
  const day = date.getDate();
  let formatted = `${yr}-${mon}-${day}`;

  if (withTime) {
    const padNum = (n: number): string => n.toString().padStart(2, '0');

    const hr = date.getHours();
    const min = padNum(date.getMinutes());
    const sec = padNum(date.getSeconds());
    formatted += ` ${hr}:${min}:${sec}`;
  }

  return formatted;
}

export function delFormatCode(text: string): string {
  return text.replace(/§[0-9abcdefgklmnor]/g, '');
}

export function checkValInArray<T>(
  arr: T[],
  callback: (v: T) => boolean
): boolean {
  for (const it of arr) if (callback(it)) return true;
  return false;
}

export function fuzzyValIsInArray<T extends string>(arr: T[], val: T): boolean {
  return checkValInArray(arr, (v) => v.includes(val));
}

export function stripIp(ip: string): string {
  return ip.split(':')[0];
}

export function pushNoDuplicateItem<T, TI>(
  list: (T | TI)[],
  item: TI
): (T | TI)[] {
  if (!list.includes(item)) list.push(item);
  return list;
}

export function setupFunctionalityForm<
  T extends [string, ((...args: any[]) => any | Promise<any>) | null][]
>(buttons?: T) {
  const form = new SimpleFormEx(buttons);
  form.title = PLUGIN_NAME;
  form.formatter = (v) => [`§3${v[0]}`];
  return form;
}

/**
 * 返回 false 代表按下表单内返回按钮 (null)
 */
export async function processListFormReturn(res: any): Promise<boolean> {
  if (res) {
    const [, func] = res;
    if (!func) return false;

    /* const cb = */ func();
    // if (isPromise(cb)) await cb;
  }
  return true;
}

export function getOnlineRealPlayers(): Player[] {
  return mc.getOnlinePlayers().filter((p) => !p.isSimulatedPlayer());
}

export function formatVarString(
  str: string,
  vars: Record<string, any>
): string {
  return str.replace(/%([a-zA-Z0-9_]+)%/g, (m, p1) => vars[p1] ?? m);
}

export function logErr(err: any) {
  logger.error(formatError(err));
}

export class RequestError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
    public readonly data: string
  ) {
    super(
      `Request '${url}' failed with code ${status}: ` +
        `${data.length > 50 ? `${data.slice(0, 50)}...` : data}`
    );
    this.name = 'RequestError';
  }
}

export type ResponseType = 'json' | 'text';
export interface AsyncRequestOptions {
  url: string;
  params?: Record<string, any>;
  headers?: Record<string, any>;
  responseType?: ResponseType;
}
export type AsyncGetOptions = AsyncRequestOptions;
export interface AsyncPostOptions extends AsyncGetOptions {
  data?: any;
}

export function appendParamsToUrl(url: string, params?: Record<string, any>) {
  if (!params) return url;
  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
  return url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`;
}

export function normalizeHeaders(headers: Record<string, any>) {
  const normalized: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) normalized[k] = `${v}`;
  return normalized;
}

export async function getAsync(
  options: AsyncGetOptions & { responseType: 'json' }
): Promise<any>;
export async function getAsync(options: AsyncGetOptions): Promise<string>;
export async function getAsync(options: AsyncGetOptions) {
  const doGet = (url: string, headers: Record<string, any>) =>
    new Promise<string>((resolve, reject) => {
      network.httpGet(url, headers, (status, result) => {
        if (status !== 200) reject(new RequestError(status, url, result));
        else resolve(result);
      });
    });

  const { url, params, headers, responseType } = options;
  const urlWithParams = appendParamsToUrl(url, params);
  const normalizedHeaders = headers ? normalizeHeaders(headers) : {};

  // logger.info(`GET ${urlWithParams}, headers: ${JSON.stringify(headers)}`);
  const res = await doGet(urlWithParams, normalizedHeaders);
  return responseType === 'json' ? JSON.parse(res) : res;
}

export async function postAsync(
  options: AsyncPostOptions & { responseType: 'json' }
): Promise<any>;
export async function postAsync(options: AsyncPostOptions): Promise<string>;
export async function postAsync(options: AsyncPostOptions) {
  const doPost = (
    url: string,
    headers: Record<string, any>,
    data: string,
    contentType: string
  ) =>
    new Promise<string>((resolve, reject) => {
      network.httpPost(url, headers, data, contentType, (status, result) => {
        if (status !== 200) reject(new RequestError(status, url, result));
        else resolve(result);
      });
    });

  const { url, params, headers, data, responseType } = options;
  const isDataText = typeof data === 'string';
  const dataString = isDataText ? data : JSON.stringify(data);
  const contentType =
    headers?.['Content-Type'] ??
    (isDataText ? 'text/plain' : 'application/json');
  const urlWithParams = appendParamsToUrl(url, params);
  const normalizedHeaders = headers ? normalizeHeaders(headers) : {};

  // logger.info(
  //   `POST ${urlWithParams}, ` +
  //     `data: ${dataString}, ` +
  //     `contentType: ${contentType}, ` +
  //     `headers: ${JSON.stringify(headers)}`
  // );
  const res = await doPost(
    urlWithParams,
    normalizedHeaders,
    dataString,
    contentType
  );
  return responseType === 'json' ? JSON.parse(res) : res;
}
