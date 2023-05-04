const db = require("../config/postgresdb");
const User = require("../models/User")

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
    const response = await db.query('SELECT * FROM forums ORDER BY created_at DESC');

    if (response.rows.length === 0) {
      throw new Error ("No forums available");
  }
    return response.rows.map((row) => new Forum(row));
  }

  static async getAllCreatedByUser(user_id) {
    const response = await db.query('SELECT * FROM forums WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
    if (!response.rowCount) return []

    return response.rows.map((row) => new Forum(row));
  }

  static async getOneById(forum_id) {
    const response = await db.query('SELECT * FROM forums WHERE forum_id = $1', [forum_id]);
    if (response.rows.length === 0) throw new Error('No such forum')

    return new Forum(response.rows[0]);
  }

  async save() {
    if (this.forum_id) return await this.update();

    const values = [this.title, this.content, this.user_id];
    const response = await db.query('INSERT INTO forums (title, content, user_id) VALUES ($1, $2, $3) RETURNING *', values);
    if (!response.rowCount) throw new Error('Creation Error.')

    return new Forum(response.rows[0]);
  }

  static async updateOneById(id, { title, content }) {
    const query = {
      text: 'UPDATE forums SET title=$1, content=$2 WHERE forum_id=$3 RETURNING *',
      values: [title, content, id],
    };
  
    const result = await db.query(query);
  
    if (result.rows.length === 0) {
      return null;
    }
  
    return new Forum(result.rows[0]);
  }
  

  async destroy() {
    const query = 'DELETE FROM forums WHERE forum_id = $1';
    const values = [this.forum_id];
    await db.query(query, values);
  }

  static async create(data) {
    const userExists = await User.findById(data.user_id);
  
    if (!userExists) {
      throw new Error('Invalid user ID');
    }
  
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
