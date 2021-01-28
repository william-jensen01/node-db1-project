const express = require('express');
const Accounts = require('./accounts-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const accounts = await Accounts.get()
        res.status(200).json(accounts)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkId, async (req, res, next) => {
    try {
        res.status(200).json(req.account)
    } catch (err) {
        next(err)
    }
})

router.post('/', checkPayload, async (req, res, next) => {
    try {
        const body = req.body;
        const data = await Accounts.create(body);
        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
})

router.put('/:id', checkId, checkPayload, async (req, res ,next) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const data = await Accounts.update(id, changes);
        res.status(200).json({ count: data })
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', checkId, async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await Accounts.remove(id);
        res.status(200).json({ count: data, message: "Account was successfully deleted" })
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    res.status(err.statusCode).json({ message: err.message, stack: err.stack });
})

async function checkId(req, res, next) {
    const { id } = req.params;
    try {
        const account = await Accounts.getById(id);
        if (account) {
            req.account = account;
            next()
        } else {
            const err = new Error('invalid id');
            err.statusCode = 404;
            next(err)
        }
    } catch (err) {
        err.statusCode = 500;
        err.message = 'error retrieving account';
        next(err)
    }
}

async function checkPayload(req, res, next) {
    const body = req.body;
    if (!body.name || !body.budget) {
        const err = new Error('body must include "name" and "budget"');
        err.statusCode = 400;
        next(err)
    } else {
        next();
    }
}

module.exports = router;