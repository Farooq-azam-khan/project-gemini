import React, { useState, useEffect } from 'react'
import {
    useParams,
} from "react-router-dom";

import LoadingScreen from '../components/LoadingScreen'
import DisplayField from '../components/DisplayField'

const FormSubmission = () => {
    const [form, setForm] = useState({})
    const [fields, setFields] = useState([])
    const [loading, setLoading] = useState(true)
    let { id } = useParams()


    useEffect(() => {
        fetch(`/api/form-preview/${id}/data`)
            .then(resp => resp.json())
            .then(data => {
                setForm(data.form)
                setFields(data.fields)
                //console.log(data) 
                setLoading(false)
            })
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
                    } else {
                        window.location = `/submit-form/${form.id}`
                    }
                })


        } catch (err) {
            console.error(err.message)
        }
    }

    if (loading) {
        return <LoadingScreen />
    } else if (!form.is_published) {
        return (<div className="fixed inset-0 w-screen h-scree">
            <div className="w-full h-full flex items-center justify-center space-x-3">
                <span className="text-3xl">Form is not Published</span>
            </div>
        </div>)
    }
    return (
        <div className="w-full h-full max-w-6xl pt-10 pb-10 flex flex-col items-center space-y-10">
            <h1 className="text-bold text-xl">Form Preview Page of Form: <span className="uppercase text-blue-800">{form.name}</span></h1>
            <form onSubmit={submitResponse} className="bg-white flex flex-col space-y-5 items-center justify-center py-2 px-3 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6">
                    {fields.map((f) => <DisplayField key={f.id} {...f} />)}
                </div>
                <div className="w-full sm:w-2/6">
                    <button type='submit' className="bg-gray-800 px-3 py-2 w-full text-white rounded-md hover:bg-gray-900">Submit Form</button>
                </div>
            </form>
        </div>
    )
}



export default FormSubmission
