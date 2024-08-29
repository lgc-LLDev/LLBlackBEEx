export interface Query {}

export class Query implements Query {
  constructor(readonly ss: DBSession) {}

  bindStmt<T extends Record<string, any>, P = any>(
    sql: string,
    params?: Query.Params<P>,
  ) {
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

  fetchAll<T extends Record<string, any>, P = any>(stmt: DBStmt<T, P>): T[] {
    const [keys, ...rows] = stmt.fetchAll()
    return rows.map((row) =>
      Object.assign({}, ...keys.map((k, i) => ({ [k]: row[i] }))),
    )
  }

  fetchAllToList<T extends Record<string, any>, P = any>(
    stmt: DBStmt<T, P>,
  ): Record<keyof T, T[keyof T][]> {
    const [keys, ...rows] = stmt.fetchAll()
    const result: any = {}
    for (const key of keys) result[key] = []
    for (const row of rows) {
      for (const key of keys) result[key].push(row[key])
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
      `INSERT OR REPLACE INTO ${tableName} (${colNamesStr}}) VALUES (${argsStr});`,
      values,
    ).execute().insertId
  }
}

export namespace Query {
  export type Params<P> = P[] | Record<string, P>
}
