const db = require("../config/postgresdb");
const Forum = require("./Forum");
const User = require("./User");

class Comment {
  constructor({ id, comment, username, user_id, forum_id }) {
    this.id = id;
    this.comment = comment;
    this.username = username || null;
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
  

  static async create(data) {
    try {
      console.log(data)
      const forumExists = await Forum.getOneById(data.forum_id);
      if (!forumExists) {
        throw new Error(`Forum with ID ${data.forum_id} not found`);
      }
      
      const user = await User.findById(data.user_id)
      if (!user) {
        throw new Error(`User with ID ${data.user_id} not found`);
      }

  
      // Insert comment into the database
      const query = 'INSERT INTO comments (comment, username, user_id, forum_id) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [data.comment, user.username, data.user_id, data.forum_id];
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

