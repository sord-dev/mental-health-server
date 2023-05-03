const db = require("../config/postgresdb");

class Comment {
  constructor({ id, content, user_id, post_id }) {
    this.id = id;
    this.content = content;
    this.user_id = user_id;
    this.post_id = post_id;
  }

  static async getAll() {
    const query = 'SELECT * FROM comments';
    const { rows } = await db.query(query);
    return rows.map((row) => new Comment(row));
  }

  static async getByPostId(post_id) {
    const query = 'SELECT * FROM comments WHERE post_id = $1';
    const values = [post_id];
    const { rows } = await db.query(query, values);
    return rows.map((row) => new Comment(row));
  }

  static async create(data) {
    const query = 'INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [data.content, data.user_id, data.post_id];
    const { rows } = await db.query(query, values);
    return new Comment(rows[0]);
  }

  async destroy() {
    const query = 'DELETE FROM comments WHERE id = $1';
    const values = [this.id];
    await db.query(query, values);
  }
}

module.exports = Comment;

