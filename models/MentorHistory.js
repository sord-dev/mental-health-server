const db = require('../config/postgresdb.js')

let ahhh = { 'Morgan': [], 'David Attenborough': [], 'Snoop Dogg': [], 'Bob Ross': [], 'Stephen Hawking': [], 'Lex Friedman': [], 'William Shakespeare': [], 'Taylor Swift': [] }

class MentorHistory {
    constructor({ history_id, user_id, history }) {
        this.history_id = history_id;
        this.user_id = user_id;
        this.history = history;
    }

    static async get(user_id) {
        let response = await db.query('SELECT * FROM user_mentor_history WHERE user_id = $1;', [user_id])
        if (!response.rowCount) throw new Error('Cannot find user history');

        return new MentorHistory(response.rows[0]);
    }

    async save(userMessage, botResponse) {
        let { mentor } = botResponse;
        let mentorMemory = this.history[mentor];

        if (mentorMemory) {
            if (mentorMemory.length > 40) {
                this.history = { ...this.history, [mentor]: [] }
            } else {
                this.history = { ...this.history, [mentor]: [...this.history[mentor], userMessage, botResponse] }
            }
        } else {
            this.history = { ...this.history, [mentor]: [userMessage, botResponse] }
        }

        let response = await db.query('UPDATE user_mentor_history SET history = $1 WHERE user_id = $2 RETURNING *;', [JSON.stringify(this.history), this.user_id])
        if (!response.rowCount) throw new Error('Error Updating user conversation history');


        return new MentorHistory(response.rows[0]);
    }
}

module.exports = MentorHistory;