import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema.js'

// Create SQLite database file
const sqlite = new Database('fitai.db')

// Enable foreign keys
sqlite.exec('PRAGMA foreign_keys = ON')

export const db = drizzle(sqlite, { schema })

console.log('✅ Database connected: SQLite (fitai.db)')
