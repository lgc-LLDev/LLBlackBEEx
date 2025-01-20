export interface Query {}

export class Query implements Query {
  constructor(readonly ss: DBSession) {}

  bindStmt<T extends Record<string, any>, P = any>(
    sql: string,
    params?: Query.Params<P>,
  ) {
    logger.debug(`[SQL] ${sql} | ${JSON.stringify(params)}`)
    const stmt = this.ss.prepare<T, P>(sql)
    if (params) stmt.bind(params)
    return stmt
  }

  executeInStmt<T extends Record<string, any>, P = any>(
    sql: string,
    params?: Query.Params<P>,
  ) {
    this.bindStmt<T, P>(sql, params).execute()
  }

  begin() {
    this.executeInStmt('BEGIN;')
  }

  commit() {
    this.executeInStmt('COMMIT;')
  }

  rollback() {
    this.executeInStmt('ROLLBACK;')
  }

  withBegin<R>(fn: (q: Query) => R): R {
    this.begin()
    try {
      const r = fn(this)
      this.commit()
      return r
    } catch (e) {
      this.rollback()
      throw e
    }
  }

  executeParagraph(sql: string) {
    sql.split(';').forEach((s) => {
      if (s) this.executeInStmt(s.trim())
    })
  }

  select<T extends Record<string, any>, P = any>(
    columns: string | string[],
    fromTable: string,
    where?: string,
    params?: Query.Params<P>,
  ) {
    if (typeof columns === 'string') columns = [columns]
    const sql =
      `SELECT ${columns.join(', ')} FROM ${fromTable}` +
      `${where ? ` WHERE ${where}` : ''};`
    return this.bindStmt<T, P>(sql, params)
  }

  delete(fromTable: string, where?: string, params?: any[]) {
    const sql = `DELETE FROM ${fromTable}` + `${where ? ` WHERE ${where}` : ''};`
    const stmt = this.bindStmt(sql, params)
    stmt.fetch()
    return stmt
  }

  fetchAll<T extends Record<string, any>, P = any>(stmt: DBStmt<T, P>): T[] {
    const data = stmt.fetchAll()
    if (!data) return []
    const [keys, ...rows] = data
    return rows.map((row) =>
      Object.assign({}, ...keys.map((k, i) => ({ [k]: row[i] }))),
    )
  }

  fetchAllToList<T extends Record<string, any>, P = any>(
    stmt: DBStmt<T, P>,
  ): Record<keyof T, T[keyof T][]> | undefined {
    const data = stmt.fetchAll()
    if (!data) return undefined
    const [keys, ...rows] = data
    const result: any = {}
    for (const key of keys) result[key] = []
    for (const row of rows) {
      for (let i = 0; i < keys.length; i++) {
        result[keys[i]].push(row)
      }
    }
    return result
  }

  insertOrReplace<T>(data: T, tableName: string, columns: (keyof T)[]): number {
    const names = columns.filter((v) => data[v] !== undefined)
    if (!names.length) {
      throw new Error('No data to insert')
    }
    const values = names.map((v) => data[v])

    const colNamesStr = names.join(', ')
    const argsStr = names.map(() => '?').join(', ')
    return this.bindStmt(
      `INSERT OR REPLACE INTO ${tableName} (${colNamesStr}) VALUES (${argsStr});`,
      values,
    ).execute().insertId
  }
}

export namespace Query {
  export type Params<P> = P[] | Record<string, P>

  export enum BanType {
    XUID = 'xuid',
    NAME = 'name',
    IP = 'ip',
    CLIENT_ID = 'clientId',
  }

  export const banTypeStrMap = {
    [Query.BanType.XUID]: 'XUID',
    [Query.BanType.NAME]: '玩家名',
    [Query.BanType.IP]: 'IP',
    [Query.BanType.CLIENT_ID]: '客户端 ID',
  }

  export const banTypeStrMapReverse = (() => {
    const ent = Object.entries(Query.banTypeStrMap) as [Query.BanType, string][]
    return Object.fromEntries(ent.map(([k, v]) => [v, k]))
  })()
}
