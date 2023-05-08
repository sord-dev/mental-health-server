const { genSalt, hash, compare } = require('bcrypt');
const db = require('../config/postgresdb.js');

class User {
    constructor({ user_id, username, password, created_at, dabloons, goals, mentor, is_admin, owned_mentors, st_goals, history_id }) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.created_at = created_at;
        this.dabloons = dabloons;
        this.goals = goals;
        this.mentor = mentor;
        this.is_admin = is_admin;
        this.owned_mentors = owned_mentors;
        this.st_goals = st_goals;
        this.history_id = history_id;
    }

    static async create(data) {
        const { username, password } = data;

        // generate hashed password
        const salt = await genSalt();
        const hashed = await hash(password, salt);

        // insert user into db
        const response = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;', [username, hashed])
        const response1 = await db.query('INSERT INTO user_mentor_history (user_id, history) VALUES ($1, $2) RETURNING history_id;', [response.rows[0].user_id, JSON.stringify([])])
        if (!response.rowCount) throw new Error('User Creation Error')
        if (!response1.rowCount) throw new Error('User Mentor History Creation Error')

        return new User({...response.rows[0], history_id: response1.rows[0].history_id})
    }

    static async comparePassword(input, hashed) {
        return await compare(input, hashed);
    }

    static async findById(id) {
        const response = await db.query('SELECT * FROM users WHERE user_id = $1 LIMIT 1;', [id])
        if (!response.rowCount) throw new Error('Creation Error')

        return new User(response.rows[0])
    }

    static async findByUsername(username) {
        const response = await db.query('SELECT * FROM users WHERE username = $1 LIMIT 1;', [username])
        if (!response.rowCount) throw new Error('User not found.')

        return new User(response.rows[0])
    }

    async updatePoints(points) {
        let calcPts = this.dabloons += points;
        const response = await db.query('UPDATE users SET dabloons = $1 WHERE user_id = $2 RETURNING *;', [calcPts, this.user_id])

        if (!response.rowCount) throw new Error('Update points error')

        return new User(response.rows[0])
    }

    async updateShortTerm(goals) {
        const response = await db.query("UPDATE users SET st_goals = $1 WHERE user_id = $2 RETURNING *;", [JSON.stringify(goals), this.user_id])
        console.log(response.rowCount);
        if (!response.rowCount || response.error) throw new Error('Update short term goals error')

        return new User(response.rows[0])
    }

    async updateGoals(goals) {
        const response = await db.query('UPDATE users SET goals = $1 WHERE user_id = $2 RETURNING *;', [goals, this.user_id])
        if (!response.rowCount) throw new Error('Update points error')

        return new User(response.rows[0])
    }

    async updateMentor(mentor) {
        console.log(mentor, this.user_id)
        const response = await db.query("UPDATE users SET mentor = $1 WHERE user_id = $2 RETURNING *;", [mentor, this.user_id])
        if (!response.rowCount) throw new Error('Update mentor error')

        return new User(response.rows[0])
    }

}

module.exports = User;