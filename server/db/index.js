const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

let cmntsDb = {};

cmntsDb.all = (postId) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT c.rating, c.content, c.timestamp, u.name, u.avatar_url
        FROM comments c 
        JOIN users u on c.user_id=u.id
        WHERE c.post_id = ?`, [postId], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

cmntsDb.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM comments WHERE id = ?`, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        })
    })
}

cmntsDb.create = (parent_id, post_id, user_id, content) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO comments
        (parent_id, post_id, user_id, content)
        VALUES (?, ?, ?, ?)`,
            [parent_id, post_id, user_id, content], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            })
    })
}

cmntsDb.update = (id, content) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE comments
        SET content = ?
        WHERE id = ?`, [content, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

cmntsDb.delete = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE from comments
        WHERE id = ?`, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

module.exports = cmntsDb;