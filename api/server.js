const express = require("express");

const server = express();

const AccountsRouter = require('./accounts/accounts-router');

server.use(express.json());
server.use('/api/accounts', AccountsRouter)

module.exports = server;
