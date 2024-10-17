import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the database
const dbPromise = open({
  filename: './database.sqlite',
  driver: sqlite3.Database
});

// Create the widgets table if it doesn't exist
async function initializeDatabase() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS widgets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      author TEXT NOT NULL,
      sourceCode TEXT NOT NULL,
      image TEXT NOT NULL
    )
  `);
}

// Initialize the database
initializeDatabase();

// Create a new widget
export async function createWidget(widget) {
  const db = await dbPromise;
  const { title, url, author, sourceCode, image } = widget;
  await db.run(
    `INSERT INTO widgets (title, url, author, sourceCode, image) VALUES (?, ?, ?, ?, ?)`,
    [title, url, author, sourceCode, image]
  );
}

// Read a widget by ID
export async function readWidget(id) {
  const db = await dbPromise;
  return db.get(`SELECT * FROM widgets WHERE id = ?`, [id]);
}

// Update a widget by ID
export async function updateWidget(id, widget) {
  const db = await dbPromise;
  const { title, url, author, sourceCode, image } = widget;
  await db.run(
    `UPDATE widgets SET title = ?, url = ?, author = ?, sourceCode = ?, image = ? WHERE id = ?`,
    [title, url, author, sourceCode, image, id]
  );
}

// Delete a widget by ID
export async function deleteWidget(id) {
  const db = await dbPromise;
  await db.run(`DELETE FROM widgets WHERE id = ?`, [id]);
}