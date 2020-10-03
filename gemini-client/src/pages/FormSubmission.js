import React, { useState, useEffect } from 'react'
import {
    useParams,
} from "react-router-dom";

import DisplayField from '../components/DisplayField'

const FormSubmission = () => {
    const [form, setForm] = useState({})
    const [fields, setFields] = useState([])
    let { id } = useParams()


    useEffect(() => {
        fetch(`/api/form-preview/${id}/data`)
            .then(resp => resp.json())
            .then(data => { setForm(data.form); setFields(data.fields); console.log(data) })
    }, [id])

    const submitResponse = (e) => {
        e.preventDefault()
        try {
            const data = []
            for (let i = 0; i < fields.length; i++) {
                const f_id = fields[i].id
                const response = e.target[i].value
                data.push({ id: f_id, response: response })
            }
            //console.log(data)
            fetch(`/api/history/${form.id}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'fields': data })
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.success) {
                        window.location = '/'
                    }
                })


        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <div className="max-w-4xl bg-gray-100 flex flex-col items-center justify-center space-y-10">
            <h1 className="text-bold text-xl">Form Preview Page of Form: <span className="uppercase text-blue-800">{form.name}</span></h1>
            <form onSubmit={submitResponse} className="flex flex-col space-y-2 bg-gray-300 w-full px-5 py-2">
                {fields.map((f) => <DisplayField key={f.id} {...f} />)}
                <button type='submit' className="bg-gray-800 px-3 py-2 text-white rounded-md hover:bg-gray-900">Submit Form</button>
            </form>
        </div>
    )
}



export default FormSubmission
