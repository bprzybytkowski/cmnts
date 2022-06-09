const Joi = require('joi')

function initComments(db) {

    this.getComments = async (req, res, _next) => {
        try {
            let results = await db.all(req.params.postId);
            res.json(results);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    this.getComment = async (req, res, _next) => {
        const schema = Joi.object({
            id: Joi.number()
        })

        const validationResult = schema.validate(req.params)

        if (validationResult.error) {
            res.status(400).send(validationResult.error);
            return;
        }

        try {
            let result = await db.one(req.params.id);
            if (!result) {
                res.sendStatus(404);
            }
            res.json(result);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    this.createComment = async (req, res, _next) => {
        const schema = Joi.object({
            parent_id: Joi.number(),
            post_id: Joi.number().required(),
            user_id: Joi.number().required(),
            content: Joi.string().required()
        })

        const validationResult = schema.validate(req.body);

        if (validationResult.error) {
            res.status(400).send(validationResult.error);
            return;
        }


        try {
            let result = await db.create(req.body.parent_id, req.body.post_id, req.body.user_id, req.body.content);
            res.json(result);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    this.editComment = async (req, res, _next) => {
        const paramsSchema = Joi.object({
            id: Joi.number().required()
        })
        const bodySchema = Joi.object({
            content: Joi.string().required()
        })

        const paramValidationResult = paramsSchema.validate(req.params);
        const bodyValidationResult = bodySchema.validate(req.body)

        if (paramValidationResult.error || bodyValidationResult.error) {
            res.status(400).send(paramValidationResult.error || bodyValidationResult.error);
            return;
        }

        try {
            let result = await db.update(req.params.id, req.body.content);
            res.json(result);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    this.deleteComment = async (req, res, _next) => {
        try {
            let result = await db.delete(req.params.id);
            res.json(result);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    this.getUser = async (req, res, _next) => {
        const schema = Joi.object({
            id: Joi.number()
        })

        const validationResult = schema.validate(req.params)

        if (validationResult.error) {
            res.status(400).send(validationResult.error);
            return;
        }

        try {
            let result = await db.getUser(req.params.id);
            if (!result) {
                res.sendStatus(404);
            }
            res.json(result);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}

module.exports = {
    initComments
}