const express = require('express')
require('dotenv').config()

const app = express()
const cors = require('cors')


const pool = require("./db")

// middleware 
app.use(cors())
app.use(express.json())

// Routes 
// create a form 
app.post("/forms", async (req, res) => {
    try {
        console.log(req.body)
        const { name, organizer } = req.body;
        let is_published = false;
        if (req.body.is_published == true || req.body.is_published == false) {
            is_published = req.body.is_published
        }
        const newForm = await pool.query(`INSERT INTO form (name, organizer, is_published) 
                                        VALUES ($1, $2, $3) RETURNING *`,
            [name, organizer, is_published]
        )
        res.json(newForm.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})
// get all forms 
app.get('/forms', async (req, res) => {
    try {
        const allForms = await pool.query('SELECT * FROM form')
        res.json(allForms.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// get a form 
app.get('/forms/:id', async (req, res) => {
    try {
        const form_id = req.params.id
        const form = await pool.query('SELECT * FROM  form WHERE id=$1', [form_id]);
        res.json(form.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// edit/update a form 
app.put('/forms/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { is_published } = req.body
        const updateForm = await pool.query(`UPDATE form SET is_published = $1 
                                                WHERE id=$2`,
            [is_published, id]
        )
        res.json('form was updated')

    } catch (err) {
        console.error(error.message)
    }
})

// delete form 
app.delete('/forms/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteForm = await pool.query('DELETE FROM form WHERE id=$1', [id])
        res.json('Form was deleted')
    } catch (err) {
        console.error(err.message)
    }
})

const port = 5000
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})