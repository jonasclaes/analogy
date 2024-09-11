import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const analogiesTable = sqliteTable('analogies', {
	id: integer('id').primaryKey(),
	expertField: text('expertField').notNull(),
	conceptToExplain: text('conceptToExplain').notNull(),
	targetRole: text('targetRole').notNull(),
	analogy: text('analogy').notNull()
});

export type InsertAnalogy = typeof analogiesTable.$inferInsert;
export type SelectAnalogy = typeof analogiesTable.$inferSelect;
