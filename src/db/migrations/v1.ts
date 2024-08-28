import { DATA_PATH } from '../../const'

import type { MigrateFunc } from '.'
import type { Query } from '..'

export interface BanInfoItemV1 {
  id: number
  reason?: string | null
  endTime?: string | null
}

export interface XuidItemV1 {
  xuid: string
  banInfoId: number
}

export interface NameItemV1 {
  name: string
  xuid?: string | null
  banInfoId: number
}

export interface IpItemV1 {
  ip: string
  banInfoId: number
}

export interface ClientIdItemV1 {
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
  xuid TEXT PRIMARY KEY NOT NULL,
  banInfoId INTEGER NOT NULL,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS name (
  name TEXT PRIMARY KEY NOT NULL,
  xuid TEXT,
  banInfoId INTEGER NOT NULL,
  FOREIGN KEY (xuid) REFERENCES xuid(xuid) ON DELETE CASCADE,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ip (
  ip TEXT PRIMARY KEY NOT NULL,
  banInfoId INTEGER NOT NULL,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clientId (
  clientId TEXT PRIMARY KEY NOT NULL,
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
