export interface Query {}

export class Query implements Query {
  constructor(readonly ss: DBSession) {}

  begin() {
    this.ss.execute('BEGIN;')
  }

  commit() {
    this.ss.execute('COMMIT;')
  }

  rollback() {
    this.ss.execute('ROLLBACK;')
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

  fetchAll<T extends Record<string, any>, P = any>(
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
}

export namespace Query {
  export type Params<P> = P[] | Record<string, P>
}
