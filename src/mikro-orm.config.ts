import { Options, SqliteDriver } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const DB_URI = process.env.DB_URI || 'db.sqlite'

const config: Options = {
  driver: SqliteDriver,
  dbName: DB_URI,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
};

export default config;
