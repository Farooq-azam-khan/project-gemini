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
        fetch(`/form-preview/${id}/data`)
            .then(resp => resp.json())
            .then(data => { setForm(data.form); setFields(data.fields); console.log(data) })
    }, [id])

    return (
        <div className="w-screen h-screen bg-gray-100 flex flex-col items-center justify-center space-y-10">
            <h1 className="text-bold text-xl">Form Preview Page of Form: <span className="uppercase text-blue-800">{form.name}</span></h1>
            <div className="flex flex-col space-y-2 bg-gray-300 w-full px-5 py-2">
                {fields.map((f) => <DisplayField key={f.id} {...f} />)}
                <button className="bg-green-800 px-3 py-2 text-white rounded-md hover:bg-green-900">Submit Form</button>
            </div>
        </div>
    )
}



export default FormSubmission
