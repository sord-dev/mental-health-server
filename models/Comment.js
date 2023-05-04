const db = require("../config/postgresdb");
const Forum = require("./Forum")

class Comment {
  constructor({ id, content, user_id, forum_id }) {
    this.id = id;
    this.content = content;
    this.user_id = user_id;
    this.forum_id = forum_id;
  }

  static async getAll() {
    const query = 'SELECT * FROM comments';
    const { rows } = await db.query(query);
    return rows.map((row) => new Comment(row));
  }

  static async getByPostId(forum_id) {
    const query = 'SELECT * FROM comments WHERE forum_id = $1';
    const values = [forum_id];
    const { rows } = await db.query(query, values);
  
    if (rows.length === 0) {
      throw new Error(`No comments found for forum with ID ${forum_id}`);
    }
  
    return rows.map((row) => new Comment(row));
  }
  static async getByCommentId(id) {
    const query = 'SELECT * FROM comments WHERE comment_id = $1';
    const values = [id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      throw new Error(`No comments found with ID ${id}`);
    }
  
    return new Comment(rows[0]);

  }
  

  static async create(data, forum_id) {
    try {
      // Check if forum with the given forum_id exists
      const forumExists = await Forum.getOneById(forum_id);
      if (!forumExists) {
        throw new Error(`Forum with ID ${forum_id} not found`);
      }
  
      // Insert comment into the database
      const query = 'INSERT INTO comments (content, user_id, forum_id) VALUES ($1, $2, $3) RETURNING *';
      const values = [data.content, data.user_id, forum_id];
      const { rows } = await db.query(query, values);
      return new Comment(rows[0]);
    } catch (err) {
      throw new Error(`Could not create comment: ${err.message}`);
    }
  }
  

  async destroy() {
    const query = 'DELETE FROM comments WHERE comment_id = $1';
    const values = [this.id];
    await db.query(query, values);
  }
}

module.exports = Comment;

