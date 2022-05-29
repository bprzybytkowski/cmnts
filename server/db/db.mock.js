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

module.exports = mockedDb;