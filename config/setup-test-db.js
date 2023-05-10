const db = require("./postgresdb");

const createDbEnv = async () => {
  
    await db.query("CREATE TEMPORARY TABLE pg_temp.users (LIKE users INCLUDING ALL);");

    await db.query("CREATE TEMPORARY TABLE pg_temp.forums (LIKE forums INCLUDING ALL);");

    await db.query("CREATE TEMPORARY TABLE pg_temp.comments (LIKE comments INCLUDING ALL);");

    await db.query("CREATE TEMPORARY TABLE pg_temp.user_mentor_history (LIKE user_mentor_history INCLUDING ALL);");
  
};

const populateDbEnv = async () => {
   
      // Populating the users table
      await db.query("INSERT INTO pg_temp.users (username, password) VALUES ($1, $2)", ["admin", "$2b$10$9DvfbVwvWt7.KYKBm8/x8.fAc4cW8zkX9izaKVitBl8oYYM9i3GJG"]);
  
      // Populating the forums table
      await db.query("INSERT INTO pg_temp.forums (title, content, user_id) VALUES ($1, $2, $3)", ["title test", "content test", 1]);
  
      // Populating the comments table with a valid username
      await db.query("INSERT INTO pg_temp.comments (comment, forum_id, user_id, username) VALUES ($1, $2, $3, $4)", ["content test", 1, 1, "admin"]);
  
      // Populating the user_mentor_history table
      await db.query("INSERT INTO pg_temp.user_mentor_history (user_id) VALUES ($1)", [1]);
   
  };
  

const destroyDbEnv = async () => {
  
    await db.query("DROP TABLE IF EXISTS pg_temp.users;");

    await db.query("DROP TABLE IF EXISTS pg_temp.forums;");

    await db.query("DROP TABLE IF EXISTS pg_temp.comments;");

    await db.query("DROP TABLE IF EXISTS pg_temp.user_mentor_history;");
  
};

module.exports = { createDbEnv, populateDbEnv, destroyDbEnv };
