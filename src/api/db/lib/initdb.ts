const sql = require('better-sqlite3');
const { randomUUID } = require('crypto');
const db = sql('easy-parcel.db');

const dummyLabels = [
  {
    label_url: 'https://don16obqbay2c.cloudfront.net/wp-content/uploads/shipping-label-example-1672219567.jpg',
  },
  {
    label_url: 'https://don16obqbay2c.cloudfront.net/wp-content/uploads/shipping-label-example-1672219567.jpg',
  },
];

db.prepare(`
   CREATE TABLE IF NOT EXISTS labels (
       id TEXT PRIMARY KEY,
       user_id TEXT NOT NULL,
       label_url TEXT NOT NULL,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO labels (id, user_id, label_url) VALUES (
         @id,
         @user_id,
         @label_url
      )
   `);

  for (const label of dummyLabels) {
    stmt.run({
        id: randomUUID(),
        user_id: randomUUID(),
        ...label
    });
  }
}

initData();