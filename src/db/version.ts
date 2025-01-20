import { Query } from './base'

const versionCreateSql = `
CREATE TABLE IF NOT EXISTS version (
  version INTEGER PRIMARY KEY DEFAULT 0
);
`.trim()

const versionQuerySql = `
SELECT version FROM version LIMIT 1;
`.trim()

const versionUpdateSql = `
INSERT OR REPLACE INTO version (version)
VALUES (?);
`.trim()

declare module './base' {
  export interface Query {
    getVersion(): number
    updateVersion(version: number): void
  }

  export namespace Query {
    interface Version {
      version: number
    }
  }
}

Query.prototype.getVersion = function () {
  this.withBegin(() => {
    this.executeInStmt(versionCreateSql)
  })
  const r = this.withBegin(() => {
    return this.bindStmt(versionQuerySql).fetch() as Partial<Query.Version>
  })
  return r.version || 0
}

Query.prototype.updateVersion = function (version: number) {
  this.withBegin(() => {
    this.executeInStmt(versionUpdateSql, [version])
  })
}
