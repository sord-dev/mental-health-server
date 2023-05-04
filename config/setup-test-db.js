const db = require("./postgresdb")

const createDbEnv = async () => {
    await db.query("CREATE TEMPORARY TABLE users (LIKE users INCLUDING ALL)")
    await db.query("CREATE TEMPORARY TABLE forums (LIKE forums INCLUDING ALL)")
    await db.query("CREATE TEMPORARY TABLE comments (LIKE comments INCLUDING ALL)")
}

const populateDbEnv = async () => {
    await db.query("INSERT INTO pg_temp.users (username, password) VALUES ('admin', '$2b$10$N39VyBLSkrADURxUAhB8l.VY4MPPAGJcTnyHfnf/eMBkWiRwUGagq')")
    await db.query("INSERT INTO pg_temp.forums (title, content, user_id) VALUES ('title test', 'content test', 1)")
    await db.query("INSERT INTO pg_temp.comments (content,forum_id, user_id) VALUES ('content test',1, 1)")

}

const destroyDbEnv = async () => {
    await db.query("DROP TABLE IF EXISTS pg_temp.users")
    await db.query("DROP TABLE IF EXISTS pg_temp.forums")
    await db.query("DROP TABLE IF EXISTS pg_temp.comments")
}



module.exports = { createDbEnv, populateDbEnv, destroyDbEnv };