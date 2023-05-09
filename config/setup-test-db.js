const db = require("./postgresdb.js")

const createDbEnv = async () => {
    await db.query("CREATE TEMPORARY TABLE users (LIKE users INCLUDING ALL);")
    await db.query("CREATE TEMPORARY TABLE forums (LIKE forums INCLUDING ALL);")
    await db.query("CREATE TEMPORARY TABLE comments (LIKE comments INCLUDING ALL);")
}

const populateDbEnv = async () => {
    await db.query("INSERT INTO pg_temp.users (username, password) VALUES ('admin', '$2b$10$9DvfbVwvWt7.KYKBm8/x8.fAc4cW8zkX9izaKVitBl8oYYM9i3GJG');");
    await db.query("INSERT INTO pg_temp.forums (title, content, user_id) VALUES ($1, $2, $3)", ["title test", "content test", 1]);
    await db.query("INSERT INTO pg_temp.comments (comment, forum_id, user_id) VALUES ($1, $2, $3)", ["content test", 1, 1]);
}

const destroyDbEnv = async () => {
    await db.query("DROP TABLE IF EXISTS pg_temp.users;")
    await db.query("DROP TABLE IF EXISTS pg_temp.forums;")
    await db.query("DROP TABLE IF EXISTS pg_temp.comments;")
}


module.exports = { createDbEnv, populateDbEnv, destroyDbEnv };