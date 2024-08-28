import { Query } from './base'

declare module './base' {
  export interface Query {
    getInfoIdFromXuid(xuid: string): number | undefined
    getInfoIdFromName(name: string): number | undefined
    getInfoIdFromIp(ip: string): number | undefined
    getInfoIdFromClientId(clientId: string): number | undefined
    getInfo(id: number): Query.BanInfoItem | undefined
    getFullInfo(id: number): Query.BanFullInfo | undefined
  }

  export namespace Query {
    export interface BanFullInfo {
      id: number
      reason?: string | null
      endTime?: string | null
      xuid: string[]
      name: string[]
      ip: string[]
      clientId: string[]
    }
  }
}

Query.prototype.getInfoIdFromXuid = function (xuid) {
  return this.select<{
    banInfoId?: number
  }>('banInfoId', 'xuid', 'xuid = ?', [xuid]).fetch().banInfoId
}

Query.prototype.getInfoIdFromName = function (name) {
  return this.select<{
    banInfoId?: number
  }>('banInfoId', 'name', 'name = ?', [name]).fetch().banInfoId
}

Query.prototype.getInfoIdFromIp = function (ip) {
  return this.select<{
    banInfoId?: number
  }>('banInfoId', 'ip', 'ip = ?', [ip]).fetch().banInfoId
}

Query.prototype.getInfoIdFromClientId = function (clientId) {
  return this.select<{
    banInfoId?: number
  }>('banInfoId', 'clientId', 'clientId = ?', [clientId]).fetch().banInfoId
}

Query.prototype.getInfo = function (id: number) {
  const it = this.select<
    | {
        reason: string | null
        endTime: string | null
      }
    | {}
  >('reason, endTime', 'banInfo', 'id = ?', [id]).fetch()
  if (!('reason' in it)) return undefined
}

Query.prototype.getFullInfo = function (id) {
  const it = this.getInfo(id)
  if (!it) return undefined
  const { reason, endTime } = it
  const { xuid } = this.fetchAll(
    this.select<{ xuid: string }>('xuid', 'xuid', 'banInfoId = ?', [id]),
  )
  const { name } = this.fetchAll(
    this.select<{ name: string }>('name', 'name', 'banInfoId = ?', [id]),
  )
  const { ip } = this.fetchAll(
    this.select<{ ip: string }>('ip', 'ip', 'banInfoId = ?', [id]),
  )
  const { clientId } = this.fetchAll(
    this.select<{ clientId: string }>('clientId', 'clientId', 'banInfoId = ?', [id]),
  )
  return { id, reason, endTime, xuid, name, ip, clientId } as Query.BanFullInfo
}
