import { DATA_PATH } from '../../const'

import type { MigrateFunc } from '.'
import type { Query } from '..'

// 设计思路：

// 一个 BanInfo 可以有多个 Xuid、Name、Ip、ClientId 关联，
// 但是反过来这些信息每个只能对应一个 BanInfo

// 有玩家改名同时需要 ban 掉旧名字的需求，
// 这边允许多个 name 对应同个 xuid，如果 xuid 更新后续可以再往数据库更新

// 因为可能有仅提供 name 或仅提供 xuid 的情况，
// 所以这里 xuid 与 name 分开表存
// 因为多 name 对一 xuid 所以在 name 表中拉 xuid 的外键

export interface BanInfoItemV1 {
  id: number
  reason?: string | null
  endTime?: string | null
}

export interface XuidItemV1 {
  id: number
  xuid: string
  banInfoId: number
}

export interface NameItemV1 {
  id: number
  name: string
  xuid?: string | null
  banInfoId: number
}

export interface IpItemV1 {
  id: number
  ip: string
  banInfoId: number
}

export interface ClientIdItemV1 {
  id: number
  clientId: string
  banInfoId: number
}

const tableCreateSqlPara = `
CREATE TABLE IF NOT EXISTS banInfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reason TEXT,
  endTime TEXT
);

CREATE TABLE IF NOT EXISTS xuid (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  xuid TEXT UNIQUE NOT NULL,
  banInfoId INTEGER NOT NULL,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS name (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  xuid TEXT,
  banInfoId INTEGER NOT NULL,
  FOREIGN KEY (xuid) REFERENCES xuid(xuid) ON DELETE CASCADE,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ip (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT UNIQUE NOT NULL,
  banInfoId INTEGER NOT NULL,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clientId (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clientId TEXT UNIQUE NOT NULL,
  banInfoId INTEGER NOT NULL,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);
`.trim()

const insertBanInfoSql = `
INSERT INTO banInfo (reason, endTime) VALUES (?, ?)
`.trim()
const insertXuidSql = `
INSERT INTO xuid (xuid, banInfo) VALUES (?, ?)
`.trim()
const insertNameSql = `
INSERT INTO name (name, xuid, banInfoId) VALUES (?, ?, ?)
`.trim()
const insertIpSql = `
INSERT OR IGNORE INTO ip (ip, banInfoId) VALUES (?, ?)
`.trim()
const insertClientIdSql = `
INSERT OR IGNORE INTO clientId (clientId, banInfoId) VALUES (?, ?)
`.trim()

const oldLocalListPath = `${DATA_PATH}/localList.json`

export interface OldLocalBlackListItem {
  name?: string
  xuid?: string
  ips?: string[]
  clientIds?: string[]
  reason?: string
  /** Date.toJson() */ endTime?: string
  /** @deprecated */ ip?: string
}

export interface OldLocalBlackList {
  list: OldLocalBlackListItem[]
}

function migrateLocalList(q: Query) {
  if (!file.exists(oldLocalListPath)) {
    return
  }
  ;(() => {
    const content = file.readFrom(oldLocalListPath)
    if (!content) {
      logger.warn('Cannot read old local list data, skip migrate')
      return
    }

    let oldLocalList
    try {
      oldLocalList = JSON.parse(content) as OldLocalBlackList
    } catch (e) {
      logger.warn('Cannot parse old local list data, skip migrate')
      return
    }

    let banInfoCount = 0
    let extraRowCount = 0
    q.withBegin(() => {
      oldLocalList.list.forEach((item) => {
        const { name, xuid, ips, clientIds, reason, endTime, ip } = item

        const banInfoStmt = q.bindStmt(insertBanInfoSql, [reason, endTime]).execute()
        const banInfoId = banInfoStmt.insertId
        banInfoCount += 1

        const stmts: DBStmt[] = []
        if (xuid) stmts.push(q.bindStmt(insertXuidSql, [xuid, banInfoId]))
        if (name) stmts.push(q.bindStmt(insertNameSql, [name, xuid ?? null, banInfoId]))
        if (ip) stmts.push(q.bindStmt(insertIpSql, [ip, banInfoId]))
        if (ips) {
          ips.forEach((ip) => {
            stmts.push(q.bindStmt(insertIpSql, [ip, banInfoId]))
          })
        }
        if (clientIds) {
          clientIds.forEach((clientId) => {
            stmts.push(q.bindStmt(insertClientIdSql, [clientId, banInfoId]))
          })
        }

        stmts.forEach((stmt) => {
          extraRowCount += stmt.execute().affectedRows
        })
      })
    })
    logger.info(
      `Migrated ${banInfoCount} infos` +
        ` and ${extraRowCount} related data from old local list`,
    )
  })()
  file.delete(oldLocalListPath)
}

const migrate: MigrateFunc = (q) => {
  q.withBegin(() => {
    q.executeParagraph(tableCreateSqlPara)
  })
  migrateLocalList(q)
}

export default migrate
