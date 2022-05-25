const router = require('express')();
const comments = require('../controllers/comments.controller');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

function initRouter(db) {
    comments.initComments(db);

    router.get('/comments', comments.getComments)
    router.get('/comments/:id', comments.getComment)
    router.post('/comments', comments.createComment)
    router.put('/comments/:id', comments.editComment)
    router.delete('/comments/:id', comments.deleteComment)

    return router;
}

module.exports = {
    initRouter
}