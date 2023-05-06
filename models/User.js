const {genSalt, hash, compare} = require('bcrypt');
const db = require('../config/postgresdb.js');

class User {
    constructor({user_id, username, password, created_at, dabloons, goals, mentor}){
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.created_at = created_at;
        this.dabloons = dabloons;
        this.goals = goals;
        this.mentor = mentor;
    }

    static async create(data) {
        const { username, password } = data;

        // generate hashed password
        const salt = await genSalt();
        const hashed = await hash(password, salt);
        
        // insert user into db
        const response = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;', [username, hashed])
        if(!response.rowCount) throw new Error('Creation Error')
        
        return new User(response.rows[0])
    }

    static async comparePassword(input, hashed) {
        return await compare(input, hashed);
    }

    static async findById(id) {
        const response = await db.query('SELECT * FROM users WHERE user_id = $1 LIMIT 1;', [id])
        if(!response.rowCount) throw new Error('Creation Error')

        return new User(response.rows[0])
    }

    static async findByUsername(username) {
        const response = await db.query('SELECT * FROM users WHERE username = $1 LIMIT 1;', [username])
        if(!response.rowCount) throw new Error('User not found.')

        return new User(response.rows[0])
    }

    async updatePoints(points) {
        let calcPts = this.dabloons += points;
        const response = await db.query('UPDATE users SET dabloons = $1 WHERE user_id = $2 RETURNING *;', [calcPts, this.user_id])

        if(!response.rowCount) throw new Error('Update points error')

        return new User(response.rows[0])
    }

    async updateGoals(goals) {
        const response = await db.query('UPDATE users SET goals = $1 WHERE user_id = $2 RETURNING *;', [goals, this.user_id])
        if(!response.rowCount) throw new Error('Update points error')

        return new User(response.rows[0])
    }

    async updateMentor(mentor) {
        console.log(mentor, this.user_id)
        const response = await db.query("UPDATE users SET mentor = $1 WHERE user_id = $2 RETURNING *;", [mentor, this.user_id])
        if(!response.rowCount) throw new Error('Update mentor error')

        return new User(response.rows[0])
    }
}

module.exports = User;