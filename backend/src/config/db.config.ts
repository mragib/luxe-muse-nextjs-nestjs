import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions.js';

export default (): SqliteConnectionOptions => ({
  type: 'sqlite',
  database: process.env.database!,
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
});
