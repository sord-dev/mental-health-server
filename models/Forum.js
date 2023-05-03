const db = require("../config/postgresdb");

class Forum {
  constructor({ forum_id, title, content, user_id, created_at, updated_at }) {
    this.forum_id = forum_id;
    this.title = title;
    this.content = content;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = updated_at
  }

  static async getAll() {
    const query = 'SELECT * FROM forums ORDER BY created_at DESC';
    const { rows } = await db.query(query);
    return rows.map((row) => new Forum(row));
  }

  static async getAllCreatedByUser(user_id) {
    const query = 'SELECT * FROM forums WHERE user_id = $1 ORDER BY created_at DESC';
    const values = [user_id];
    const { rows } = await db.query(query, values);
    return rows.map((row) => new Forum(row));
  }

  static async getOneById(id) {
    const query = 'SELECT * FROM forums WHERE id = $1';
    const values = [id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return null;
    } else {
      return new Forum(rows[0]);
    }
  }

  async save() {
    if (this.id) {
      const query = 'UPDATE forums SET title=$1, content=$2 WHERE id=$3 RETURNING *';
      const values = [this.title, this.content, this.id];
      const { rows } = await db.query(query, values);
      return new Forum(rows[0]);
    } else {
      const query = 'INSERT INTO forums (title, content, user_id) VALUES ($1, $2, $3) RETURNING *';
      const values = [this.title, this.content, this.user_id];
      const { rows } = await db.query(query, values);
      return new Forum(rows[0]);
    }
  }

  async destroy() {
    const query = 'DELETE FROM forums WHERE id = $1';
    const values = [this.id];
    await db.query(query, values);
  }

  static async create(data) {
    const query = 'INSERT INTO forums (title, content, user_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [data.title, data.content, data.user_id];
    try {
      const { rows } = await db.query(query, values);
      return new Forum(rows[0]);
    } catch (err) {
      throw new Error(`Failed to create forum: ${err.message}`);
    }
  }

}

module.exports = Forum;
