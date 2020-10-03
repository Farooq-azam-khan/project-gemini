const express = require('express')
require('dotenv').config()

const app = express()
const cors = require('cors')


const pool = require("./db")

// middleware 
app.use(cors())
app.use(express.json())

// Routes 

// add a response
app.post('/api/history/:form/', async (req, res) => {
    try {
        const form_id = req.params.form
        const { fields } = req.body
        const submission = await pool.query('SELECT submission FROM history ORDER BY id DESC LIMIT 1')
        let submission_id = 1
        if (submission.rows.length !== 0) {
            submission_id = submission.rows[0].submission + 1
        }
        for (let i = 0; i < fields.length; i++) {
            const field_id = fields[i].id
            const response = fields[i].response
            const add_history = await pool.query(`INSERT INTO history 
                                (form, form_field, response, submission) 
                                VALUES ($1, $2, $3, $4)`,
                [form_id, field_id, response, submission_id]
            )
        }
        res.json({ success: true })
    } catch (err) {
        console.error(err.message)
    }
})

// create form field for a form

app.get('/api/form-preview/:id/data', async (req, res) => {
    try {
        const form_id = req.params.id
        // console.log(form_id)
        const form_data = await pool.query(`SELECT * FROM form WHERE id=$1`, [form_id])
        form = form_data.rows[0]
        const fields_data = await pool.query(`SELECT * FROM form_field WHERE form=$1`, [form_id])

        fields = fields_data.rows
        if (fields.length > 0) {
            for (let i = 0; i < fields.length; i++) {
                const f = fields[i]
                if (f.name == 'multiple choice') {
                    const options_data = await pool.query('SELECT * FROM options WHERE form_field=$1', [f.id])
                    const field_options = options_data.rows
                    f.options = field_options
                }
            }
        }
        res.json({ form, "fields": fields })
    } catch (err) {
        console.error(err.message)
    }
})
app.post('/api/forms/:id/forms_field', async (req, res) => {
    try {
        // console.log(req.body)
        const form_id = req.params.id
        const { name, label } = req.body
        const valid_names = ['multiple choice', 'input', 'textbox']
        if (valid_names.includes(name)) {
            const newFormField = await pool.query(`INSERT INTO form_field (name, label, form) VALUES ($1,$2,$3) RETURNING *`,
                [name, label, form_id]
            )

            res.json(newFormField)
            if (name === 'multiple choice') {
                // add the options
                const options = req.body.options
                // let alloptions = []
                options.forEach(async (op) => {
                    const newoption = await pool.query(`INSERT INTO options (name, form_field) VALUES ($1, $2)`,
                        [op, newFormField.rows[0].id]
                    )
                })
            }



        } else {
            res.json('name filed is not valid')
        }
    } catch (err) {
        console.error(err.message)
    }
})

// get form fields with given id 
app.get('/api/forms/:id/forms_field', async (req, res) => {
    try {
        const form_id = req.params.id
        const { name, label } = req.body
        const newFormField = await pool.query(`SELECT * FROM form_field WHERE form=$1`, [form_id])
        res.json(newFormField.rows)
    } catch (err) {
        console.error(err.message)
    }
})
// create a form 
app.post("/api/forms", async (req, res) => {
    try {
        // console.log(req.body)
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
app.get('/api/forms', async (req, res) => {
    try {
        const allForms = await pool.query('SELECT * FROM form ORDER BY created_at DESC')
        res.json(allForms.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// get a form 
app.get('/api/forms/:id', async (req, res) => {
    try {
        const form_id = req.params.id
        const form = await pool.query('SELECT * FROM  form WHERE id=$1', [form_id]);
        res.json(form.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// edit/update a form 
app.put('/api/forms/publish/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { is_published } = req.body
        const updateForm = await pool.query(`UPDATE form SET is_published=$1 WHERE id=$2`,
            [is_published, id]
        )
        res.json({ success: true, message: 'form was updated' })

    } catch (err) {
        console.error(error.message)
    }
})


// delete form 
app.delete('/api/forms/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteForm = await pool.query('DELETE FROM form WHERE id=$1', [id])
        res.json('Form was deleted')
    } catch (err) {
        console.error(err.message)
    }
})

// delete form field
app.delete('/api/form_field/:form_field', async (req, res) => {
    try {
        const { form_field } = req.params
        const deleteFormField = await pool.query('DELETE FROM form_field WHERE id=$1', [form_field])
        res.json({ success: true, message: 'Form was deleted' })
    } catch (err) {
        console.error(err.message)
    }
})

const port = 5000
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})