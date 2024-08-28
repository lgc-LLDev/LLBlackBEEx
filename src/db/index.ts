import { DATA_PATH, PLUGIN_NAME } from '../const'
import { Query } from './base'
import './methods'
import './version'

import type {
  BanInfoItemV1,
  ClientIdItemV1,
  IpItemV1,
  NameItemV1,
  XuidItemV1,
} from './migrations/v1'

export { migrate } from './migrations'
export { Query }

export const DB_PATH = `${DATA_PATH}/${PLUGIN_NAME}.db`

declare module './base' {
  export namespace Query {
    export function getSession(): DBSession
    export function get(): Query

    export interface BanInfoItem extends BanInfoItemV1 {}
    export interface XuidItem extends XuidItemV1 {}
    export interface NameItem extends NameItemV1 {}
    export interface IpItem extends IpItemV1 {}
    export interface ClientIdItem extends ClientIdItemV1 {}
  }
}

Query.getSession = function () {
  const ss = new DBSession('sqlite3', { path: DB_PATH })
  if (!ss) throw new Error('Failed to create DBSession')
  ss.prepare('PRAGMA foreign_keys = ON;').execute()
  return ss
}

Query.get = function () {
  return new Query(Query.getSession())
}
