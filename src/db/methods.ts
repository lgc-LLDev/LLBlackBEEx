import { Query } from './base'

declare module './base' {
  export interface Query {
    getNameInfo(name: string): Query.NameItem | undefined
    getNamesFromXuid(xuid: string): string[] | undefined
    getInfoIdFromXuid(xuid: string): number | undefined
    getInfoIdFromName(name: string): number | undefined
    getInfoIdFromIp(ip: string): number | undefined
    getInfoIdFromClientId(clientId: string): number | undefined
    getInfo(id: number): Query.BanInfoItem | undefined
    getFullInfo(id: number): Query.BanFullInfo | undefined
    updateXuidInfo(data: Partial<Query.XuidItem>): number
    updateNameInfo(data: Partial<Query.NameItem>): number
    updateIpInfo(data: Partial<Query.IpItem>): number
    updateClientIdInfo(data: Partial<Query.ClientIdItem>): number
    updateInfo(data: Partial<Query.BanInfoItem>): number
    searchNameInfo(query: string): Query.NameItem[]
    searchXuidInfo(query: string): Query.XuidItem[]
    searchIpInfo(query: string): Query.IpItem[]
    searchClientIdInfo(query: string): Query.ClientIdItem[]
    searchBanInfo(query: string): Query.BanInfoItem[]
  }

  export namespace Query {
    export interface BanFullInfo {
      id: number
      reason?: string | null
      endTime?: string | null
      name: string[]
      xuid: string[]
      ip: string[]
      clientId: string[]
    }
  }
}

Query.prototype.getNameInfo = function (name) {
  return this.select<Query.NameItem>('*', 'name', 'name = ?', [name]).fetch()
}

Query.prototype.getNamesFromXuid = function (xuid) {
  return this.fetchAllToList(
    this.select<Pick<Query.NameItem, 'name'>>('name', 'name', 'xuid = ?', [xuid]),
  ).name
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
  const it = this.select<Query.BanInfoItem | {}>('*', 'banInfo', 'id = ?', [id]).fetch()
  if (!('id' in it)) return undefined
  return it
}

Query.prototype.getFullInfo = function (id) {
  const it = this.getInfo(id)
  if (!it) return undefined
  const { reason, endTime } = it
  const { xuid } = this.fetchAllToList(
    this.select<Pick<Query.XuidItem, 'xuid'>>('xuid', 'xuid', 'banInfoId = ?', [id]),
  )
  const { name } = this.fetchAllToList(
    this.select<Pick<Query.NameItem, 'name'>>('name', 'name', 'banInfoId = ?', [id]),
  )
  const { ip } = this.fetchAllToList(
    this.select<Pick<Query.IpItem, 'ip'>>('ip', 'ip', 'banInfoId = ?', [id]),
  )
  const { clientId } = this.fetchAllToList(
    this.select<Pick<Query.ClientIdItem, 'clientId'>>(
      'clientId',
      'clientId',
      'banInfoId = ?',
      [id],
    ),
  )
  return { id, reason, endTime, name, xuid, ip, clientId } as Query.BanFullInfo
}

Query.prototype.updateXuidInfo = function (data) {
  return this.withBegin(() => this.insertOrReplace(data, 'xuid', ['xuid', 'banInfoId']))
}

Query.prototype.updateNameInfo = function (data) {
  return this.withBegin(() =>
    this.insertOrReplace(data, 'name', ['name', 'xuid', 'banInfoId']),
  )
}

Query.prototype.updateIpInfo = function (data) {
  return this.withBegin(() => this.insertOrReplace(data, 'ip', ['ip', 'banInfoId']))
}

Query.prototype.updateClientIdInfo = function (data) {
  return this.withBegin(() =>
    this.insertOrReplace(data, 'clientId', ['clientId', 'banInfoId']),
  )
}

Query.prototype.updateInfo = function (data) {
  return this.withBegin(() =>
    this.insertOrReplace(data, 'banInfo', ['id', 'reason', 'endTime']),
  )
}

Query.prototype.searchNameInfo = function (query) {
  return this.fetchAll(
    this.select<Query.NameItem>('*', 'name', 'name LIKE ?', [
      `%${Query.escape(query, ['%', '_'])}%`,
    ]),
  )
}

Query.prototype.searchXuidInfo = function (query) {
  return this.fetchAll(
    this.select<Query.XuidItem>('*', 'xuid', 'xuid LIKE ?', [
      `%${Query.escape(query, ['%', '_'])}%`,
    ]),
  )
}

Query.prototype.searchIpInfo = function (query) {
  return this.fetchAll(
    this.select<Query.IpItem>('*', 'ip', 'ip LIKE ?', [
      `%${Query.escape(query, ['%', '_'])}%`,
    ]),
  )
}

Query.prototype.searchClientIdInfo = function (query) {
  return this.fetchAll(
    this.select<Query.ClientIdItem>('*', 'clientId', 'clientId LIKE ?', [
      `%${Query.escape(query, ['%', '_'])}%`,
    ]),
  )
}

Query.prototype.searchBanInfo = function (query) {
  return this.fetchAll(
    this.select<Query.BanInfoItem>('*', 'banInfo', 'reason LIKE ?', [
      `%${Query.escape(query, ['%', '_'])}%`,
    ]),
  )
}
