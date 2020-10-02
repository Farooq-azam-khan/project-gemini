import React, { useState, useEffect } from 'react'
import {
    useParams

} from "react-router-dom";

const FormPreview = () => {
    const [form, setForm] = useState({})
    const [fields, setFields] = useState([])
    const [filedModal, showFieldModal] = useState(true)
    let { id } = useParams()


    useEffect(() => {
        fetch(`http://localhost:5000/form-preview/${id}/data`)
            .then(resp => resp.json())
            .then(data => { setForm(data.form); setFields(data.fields); console.log(data) })
    }, [])

    return (
        <div className="w-screen h-screen bg-gray-100 flex flex-col items-center justify-center space-y-10">
            <h1 className="text-bold text-xl">{form.name}</h1>
            <div className="flex flex-col space-y-2 bg-gray-300 w-full px-5 py-2">
                {fields.map((f) => <DisplayField key={f.id} {...f} />)}
            </div>
            <div>
                <button onClick={() => showFieldModal(true)} className="rounded-md bg-gray-800 text-white px-3 py-2 text-md shadow-md">Add Form Field</button>
                {filedModal ? <><button onClick={() => showFieldModal(false)} className="fixed inset-0 cursor-default bg-black opacity-50 w-full h-full" /><FiledFormModal close={showFieldModal} /></> : null}
            </div>
        </div>
    )
}

const FiledFormModal = () => {
    const [selectedField, setField] = useState("multiple choice")
    const [label, setLabel] = useState('')
    const [mOptions, setOptions] = useState([])
    const onsubmit = (e) => {
        e.preventDefault()
        try {
            // submit here

        } catch (e) {
            console.error(e.message)
        }
    }
    const addOption = () => {
        // TODO: on click of plus it should add another option
    }
    return (<div className="fixed flex flex-col items-center justify-center bg-white rounded-lg z-10 p-5">
        <h2 className="mb-2 text-bold text-lg">Add Form Field</h2>
        <form onSubmit={onsubmit} className="flex flex-col items-center space-y-2">
            <label className="flex items-center justify-between w-full space-x-2"><span>Field *</span>
                <select onChange={(e) => setField(e.target.value)} value={selectedField} className="bg-gray-200 p-1 rounded-md w-4/6">
                    <option value="multiple choice">Multiple Choice</option>
                    <option value="input">Input</option>
                    <option value="textarea">Textarea</option>
                </select>
            </label>
            <label className="flex items-center justify-between w-full space-x-2">
                <span>Label *</span>
                <input onChange={(e) => setLabel(e.target.value)} className="bg-gray-200 p-1 rounded-md w-4/6" />
            </label>
            {
                selectedField === 'multiple choice' ?
                    <label className="flex items-center justify-between w-full space-x-2">
                        <span>Options *</span>
                        <span className="flex items-center justify-between space-x-1">
                            <input className="bg-gray-200 p-1 rounded-md" />
                            <button onClick={addOption} className="flex items-center justify-between bg-gray-700 hover:bg-gray-800 text-white rounded-full p-1">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            </button>
                        </span>
                    </label>
                    : null
            }

            <button type="submit" className="bg-gray-800 text-white px-3 py-2 hover:bg-gray-900 text-md rounded-lg">Add New</button>
        </form>
    </div>)
}


const DisplayField = (props) => {
    switch (props.name) {
        case 'textarea':
            return (<label className="flex items-center space-x-3">
                {props.name} <textarea></textarea>
            </label>)
        case 'input':
            return (<label className="flex items-center space-x-3">
                <span>{props.name}</span> <input />
            </label>)
        case 'multiple choice':
            return (
                <label className="flex items-center space-x-3">
                    <span>{props.name}</span>
                    {props.options.length === 0 ? <div>no options</div> : <select>
                        {props.options.map((o) => <option key={o.id} value={o.name}>{o.name}</option>)}
                    </select>}

                </label>
            )
    }
}

export default FormPreview
