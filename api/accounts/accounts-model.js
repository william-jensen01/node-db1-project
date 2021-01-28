const db = require("../../data/dbConfig");

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
}

async function get() {
    // will return an array of all the accounts as objects
    const accounts = await db('accounts');
    return accounts
}

async function getById(id) {
    // id is a number
    // { id } is the same as {id: *actual id*}
    // we put [] around account because we are wanting to assign the first object in the array to the account variable ... if the value is undefined account will not have a value
    const [account] = await db('accounts').where({ id });
    return account;
}

async function create(data) {
    // knex will return an array with new account's id
    // req.body can only accept one account object
    const [newAccountId] = await db('accounts').insert(data);

    // this is to return the newly created account 
    const newAccount = await getById(newAccountId);
    return newAccount;
}

async function update(id, changes) {
    // knex will return a number of rows (accounts) that were successfully changed
    const count = await db('accounts').where({ id }).update(changes);
    return count;
}

async function remove(id) {
    // similar to update, knex will return a number of affected rows (accounts)
    const count = await db('accounts').where({ id }).del();
    return count;
}