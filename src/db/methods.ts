import { Query } from './base'

declare module './base' {
  export interface Query {
    getXuidFromInfoId(id: number): string[]
    getNameFromInfoId(id: number): string[]
    getIpFromInfoId(id: number): string[]
    getClientIdFromInfoId(id: number): string[]
    getNameInfo(name: string): Query.NameItem | undefined
    getNamesFromXuid(xuid: string): string[]
    getInfoIdFromXuid(xuid: string): number | undefined
    getInfoIdFromName(name: string): number | undefined
    getInfoIdFromIp(ip: string): number | undefined
    getInfoIdFromClientId(clientId: string): number | undefined
    getInfo(id: number): Query.BanInfoItem | undefined
    getFullInfo(id: number): Query.BanFullInfo | undefined
    iterAllInfos(): IterableIterator<Query.BanInfoItem>
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
    deleteXuid(xuid: string): boolean
    deleteName(name: string): boolean
    deleteIp(ip: string): boolean
    deleteClientId(clientId: string): boolean
    deleteInfo(id: number): boolean
    getInfoIdUniversal(kw: string): [banType: Query.BanType, infoId: number] | undefined
    delBanUniversal(banType: Query.BanType, kw: string): boolean
    isInfoAlone(id: number): boolean
    isInfoAlone(info: Query.BanFullInfo): boolean
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

//

Query.prototype.getXuidFromInfoId = function (id) {
  return (
    this.fetchAllToList(
      this.select<Pick<Query.XuidItem, 'xuid'>>('xuid', 'xuid', 'banInfoId = ?', [id]),
    )?.xuid ?? []
  )
}

Query.prototype.getNameFromInfoId = function (id) {
  return (
    this.fetchAllToList(
      this.select<Pick<Query.NameItem, 'name'>>('name', 'name', 'banInfoId = ?', [id]),
    )?.name ?? []
  )
}

Query.prototype.getIpFromInfoId = function (id) {
  return (
    this.fetchAllToList(
      this.select<Pick<Query.IpItem, 'ip'>>('ip', 'ip', 'banInfoId = ?', [id]),
    )?.ip ?? []
  )
}

Query.prototype.getClientIdFromInfoId = function (id) {
  return (
    this.fetchAllToList(
      this.select<Pick<Query.ClientIdItem, 'clientId'>>(
        'clientId',
        'clientId',
        'banInfoId = ?',
        [id],
      ),
    )?.clientId ?? []
  )
}

Query.prototype.getNameInfo = function (name) {
  const r = this.select<Query.NameItem>('*', 'name', 'name = ?', [name]).fetch()
  if (!('name' in r)) return undefined
  return r
}

Query.prototype.getNamesFromXuid = function (xuid) {
  return (
    this.fetchAllToList(
      this.select<Pick<Query.NameItem, 'name'>>('name', 'name', 'xuid = ?', [xuid]),
    )?.name ?? []
  )
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
  const xuid =
    this.fetchAllToList(
      this.select<Pick<Query.XuidItem, 'xuid'>>('xuid', 'xuid', 'banInfoId = ?', [id]),
    )?.xuid ?? []
  const name =
    this.fetchAllToList(
      this.select<Pick<Query.NameItem, 'name'>>('name', 'name', 'banInfoId = ?', [id]),
    )?.name ?? []
  const ip =
    this.fetchAllToList(
      this.select<Pick<Query.IpItem, 'ip'>>('ip', 'ip', 'banInfoId = ?', [id]),
    )?.ip ?? []
  const clientId =
    this.fetchAllToList(
      this.select<Pick<Query.ClientIdItem, 'clientId'>>(
        'clientId',
        'clientId',
        'banInfoId = ?',
        [id],
      ),
    )?.clientId ?? []
  return { id, reason, endTime, name, xuid, ip, clientId } as Query.BanFullInfo
}

Query.prototype.iterAllInfos = function* () {
  const stmt = this.select<Query.BanInfoItem | {}>('*', 'banInfo')
  do {
    const it = stmt.fetch()
    if (!('id' in it)) break
    yield it
  } while (stmt.step())
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

Query.prototype.deleteXuid = function (xuid) {
  return this.withBegin(() => !!this.delete('xuid', 'xuid = ?', [xuid]).affectedRows)
}

Query.prototype.deleteName = function (name) {
  return this.withBegin(() => !!this.delete('name', 'name = ?', [name]).affectedRows)
}

Query.prototype.deleteIp = function (ip) {
  return this.withBegin(() => !!this.delete('ip', 'ip = ?', [ip]).affectedRows)
}

Query.prototype.deleteClientId = function (clientId) {
  return this.withBegin(
    () => !!this.delete('clientId', 'clientId = ?', [clientId]).affectedRows,
  )
}

Query.prototype.deleteInfo = function (id) {
  return this.withBegin(() => !!this.delete('banInfo', 'id = ?', [id]).affectedRows)
}

Query.prototype.getInfoIdUniversal = function (kw) {
  let infoId: number | undefined
  if ((infoId = this.getInfoIdFromXuid(kw))) {
    return [Query.BanType.XUID, infoId]
  }
  if ((infoId = this.getInfoIdFromName(kw))) {
    return [Query.BanType.NAME, infoId]
  }
  if ((infoId = this.getInfoIdFromIp(kw))) {
    return [Query.BanType.IP, infoId]
  }
  if ((infoId = this.getInfoIdFromClientId(kw))) {
    return [Query.BanType.CLIENT_ID, infoId]
  }
  return undefined
}

Query.prototype.delBanUniversal = function (banType, kw) {
  switch (banType) {
    case Query.BanType.XUID:
      return this.deleteXuid(kw)
    case Query.BanType.NAME:
      return this.deleteName(kw)
    case Query.BanType.IP:
      return this.deleteIp(kw)
    case Query.BanType.CLIENT_ID:
      return this.deleteClientId(kw)
    default:
      return false
  }
}

Query.prototype.isInfoAlone = function (info) {
  if (typeof info === 'number') {
    const queried = this.getFullInfo(info)
    if (!queried) return false
    info = queried
  }
  return (
    !info.xuid.length && !info.name.length && !info.ip.length && !info.clientId.length
  )
}
