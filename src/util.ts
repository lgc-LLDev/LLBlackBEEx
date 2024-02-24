import { SimpleFormEx } from 'form-api-ex';

import { PLUGIN_NAME } from './const';

export function wrapAsyncFunc<T extends Array<unknown>>(
  func: (...args: T) => Promise<unknown>
): (...args: T) => void {
  return (...args: T) => {
    setTimeout(() => func(...args).catch((e) => logger.error(String(e))), 0);
  };
}

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

export class RequestError extends Error {
  constructor(public readonly status: number, public readonly data: string) {
    super(`Request failed with status ${status}: ${data}`);
    this.name = 'RequestError';
  }
}

export type ResponseType = 'json' | 'text';

export interface GetAsyncOptions {
  url: string;
  params?: Record<string, any>;
  headers?: Record<string, any>;
  responseType?: ResponseType;
}

export interface PostAsyncOptions extends GetAsyncOptions {
  data?: any;
}

export function appendParamsToUrl(url: string, params?: Record<string, any>) {
  const urlObj = new URL(url);
  if (params)
    for (const [k, v] of Object.entries(params))
      urlObj.searchParams.set(k, `${v}`);
  return urlObj.toString();
}

export function normalizeHeaders(headers: Record<string, any>) {
  const normalized: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) normalized[k] = `${v}`;
  return normalized;
}

export async function getAsync(
  options: GetAsyncOptions & { responseType: 'json' }
): Promise<any>;
export async function getAsync(options: GetAsyncOptions): Promise<string>;
export async function getAsync(options: GetAsyncOptions) {
  const { url, params, headers, responseType } = options;
  const res = await new Promise<string>((resolve, reject) => {
    network.httpGet(
      appendParamsToUrl(url, params),
      headers ? normalizeHeaders(headers) : {},
      (status, result) => {
        if (status !== 200) reject(new RequestError(status, result));
        else resolve(result);
      }
    );
  });
  return responseType === 'json' ? JSON.parse(res) : res;
}

export async function postAsync(
  options: PostAsyncOptions & { responseType: 'json' }
): Promise<any>;
export async function postAsync(options: PostAsyncOptions): Promise<string>;
export async function postAsync(options: PostAsyncOptions) {
  const { url, params, headers, data, responseType } = options;
  const isDataText = typeof data === 'string';
  const res = await new Promise<string>((resolve, reject) => {
    network.httpPost(
      appendParamsToUrl(url, params),
      headers ? normalizeHeaders(headers) : {},
      isDataText ? data : JSON.stringify(data),
      headers?.['Content-Type'] ??
        (isDataText ? 'text/plain' : 'application/json'),
      (status, result) => {
        if (status !== 200) reject(new RequestError(status, result));
        else resolve(result);
      }
    );
  });
  return responseType === 'json' ? JSON.parse(res) : res;
}
