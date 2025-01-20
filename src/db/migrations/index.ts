import { Query } from '../base'
import migrateV1 from './v1'

export type MigrateFunc = (q: Query) => void
export const migrateFuncs: MigrateFunc[] = [migrateV1]

export function migrate(q: Query): [old: number, now: number] {
  const version = q.getVersion()
  const currentVersion = migrateFuncs.length
  const migrateCount = currentVersion - version
  if (migrateCount > 0) {
    logger.info(
      `Database is now at version ${currentVersion}. ` +
        `Will be migrated to version ${currentVersion}.`,
    )
    for (let i = 0; i < migrateCount; i++) {
      logger.info(`Migrating to version ${version + i + 1}...`)
      migrateFuncs[i + version](q)
    }
    q.updateVersion(currentVersion)
    logger.info(`Successfully migrated database.`)
  }
  return [version, currentVersion]
}
