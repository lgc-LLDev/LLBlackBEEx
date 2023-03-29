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
