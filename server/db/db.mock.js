let mockedDb = {};

const nonExistingCommentId = 4;

mockedDb.all = () => [
    {
        id: 1,
        rating: null,
        parent_id: null,
        post_id: 1,
        user_id: 1,
        content: 'Mocked comment 1',
        timestamp: '2022-05-21T12:55:30.000Z'
    },
    {
        id: 2,
        rating: null,
        parent_id: null,
        post_id: 1,
        user_id: 1,
        content: 'Mocked comment 2',
        timestamp: '2022-05-22T12:55:30.000Z'
    },
    {
        id: 3,
        rating: null,
        parent_id: null,
        post_id: 1,
        user_id: 1,
        content: 'Mocked comment 3',
        timestamp: '2022-05-23T12:55:30.000Z'
    }
]

mockedDb.one = (id) => {
    if (id != nonExistingCommentId)
        return {
            id: 1,
            rating: 1,
            parent_id: null,
            post_id: 1,
            user_id: 1,
            content: 'Test',
            timestamp: null
        }
}

mockedDb.create = (parent_id, post_id, user_id, content) => {
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

mockedDb.update = (id, content) => {
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

mockedDb.delete = (id) => {
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

module.exports = mockedDb;