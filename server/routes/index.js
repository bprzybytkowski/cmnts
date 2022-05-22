const express = require('express');
const comments = require('../controllers/comments.controller')
const bodyParser = require("body-parser");

const router = express();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/comments', comments.getComments)
router.get('/comments/:id', comments.getComment)
router.post('/comments', comments.createComment)
router.put('/comments/:id', comments.editComment)
router.delete('/comments/:id', comments.deleteComment)

module.exports = router;