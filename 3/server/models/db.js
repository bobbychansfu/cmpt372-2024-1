const { Pool } = require('pg');
var pool

pool = new Pool({
    connectionString: 'postgres://postgres:root@localhost:5432/cmpt372'
})

const helpers = {
    getPeople: async function() {
        const res = await pool.query('SELECT * FROM people')
        return res.rows
    },

    deleteById: async function(id) {
        const q = 'DELETE FROM people WHERE id = $1'
        const res = await pool.query(q, [id])
    },

    addPerson: async function(name, age, instructor) {
        const q = 'INSERT INTO people(name, age, instructor) VALUES($1, $2, $3)'
        const res = await pool.query(q, [name, age, instructor])
    },

    init: async function() {
        const q = 'CREATE TABLE IF NOT EXISTS people(id SERIAL PRIMARY KEY, name VARCHAR(50), age INT, instructor BOOLEAN)'
        const res = await pool.query(q)
    }
}   

const obj2 = {}

module.exports = { helpers,obj2 }