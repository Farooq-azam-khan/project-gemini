import React, { useState, useEffect } from 'react'
import {
    useParams, Redirect
} from "react-router-dom";

const FormPreview = () => {
    const [form, setForm] = useState({})
    const [fields, setFields] = useState([])
    const [filedModal, showFieldModal] = useState(false)
    let { id } = useParams()


    useEffect(() => {
        fetch(`/form-preview/${id}/data`)
            .then(resp => resp.json())
            .then(data => { setForm(data.form); setFields(data.fields); console.log(data) })
    }, [id])

    return (
        <div className="w-screen h-screen bg-gray-100 flex flex-col items-center justify-center space-y-10">
            <h1 className="text-bold text-xl">{form.name}</h1>
            <div className="flex flex-col space-y-2 bg-gray-300 w-full px-5 py-2">
                {fields.map((f) => <DisplayField key={f.id} {...f} />)}
            </div>
            <div>
                <button onClick={() => showFieldModal(true)} className="rounded-md bg-gray-800 text-white px-3 py-2 text-md shadow-md hover:bg-gray-900">Add Form Field</button>
            </div>
            {filedModal ? <><button onClick={() => showFieldModal(false)} className="fixed inset-0 cursor-default bg-black opacity-50 w-full h-full" /><FiledFormModal form_id={form.id} /></> : null}
        </div>
    )
}

function MinusIcon({ className }) {
    return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>)
}

const FiledFormModal = ({ form_id }) => {
    const [selectedField, setField] = useState("multiple choice")
    const [label, setLabel] = useState('')
    const [mOptions, setOptions] = useState([])
    const [firstOption, setFirstOption] = useState('')


    const onsubmit = async (e) => {
        e.preventDefault()
        try {
            const optionsToBeAdded = mOptions.filter(val => val !== '')
            optionsToBeAdded.push(firstOption)
            // submit here
            const data = {
                name: selectedField,
                label: label,
                options: selectedField === 'multiple choice' ? optionsToBeAdded : []
            }

            const response = await fetch(`/forms/${form_id}/forms_field`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            window.location = `/forms-preview/${form_id}`
            // const resp_json = await response.json()


        } catch (e) {
            console.error(e.message)
        }
    }

    const addOption = () => {
        // TODO: on click of plus it should add another option
        setOptions([...mOptions, ''])
    }

    const removeOption = (idx) => {
        console.log('idx: ', idx)
        const filtered = mOptions.filter((v, i) => idx !== i)
        console.log(filtered)
        setOptions(filtered)
    }

    const changeValue = (e, id) => {
        const newM = []
        for (let i = 0; i < mOptions.length; i++) {
            if (id == i) {
                newM.push(e.target.value)
            } else {
                newM.push(mOptions[i])
            }
        }
        setOptions(newM)

    }

    return (<div className="fixed flex flex-col items-center justify-center bg-white rounded-lg z-10 p-5 shadow-xl">
        <h2 className="mb-2 text-bold text-lg">Add Form Field</h2>
        <div className="flex flex-col items-center space-y-2">
            <label className="flex items-center justify-between w-full space-x-2"><span>Field *</span>
                <select onChange={(e) => setField(e.target.value)} value={selectedField} className="bg-gray-200 p-1 rounded-md w-4/6">
                    <option value="multiple choice">Multiple Choice</option>
                    <option value="input">Input</option>
                    <option value="textarea">Textarea</option>
                </select>
            </label>
            <label className="flex items-center justify-between w-full space-x-2">
                <span>Label *</span>
                <input value={label} onChange={(e) => setLabel(e.target.value)} className="bg-gray-200 p-1 rounded-md w-4/6" />
            </label>
            {
                selectedField === 'multiple choice' ?
                    <div className="flex items-start justify-between w-full space-x-2">

                        <label>Options * </label>
                        <span className="flex flex-col space-y-2 items-center justify-between">
                            <div className="flex items-center justify-between space-x-1">
                                <input value={firstOption} onChange={(e) => setFirstOption(e.target.value)} className="bg-gray-200 p-1 rounded-md" />
                                <button onClick={addOption} className="flex items-center justify-between bg-gray-700 hover:bg-gray-800 text-white rounded-full p-1">
                                    <PlusIcon className="w-5 h-5" />
                                </button>
                            </div>
                            {mOptions.map((val, id) => <div key={id} className="flex items-center justify-between space-x-1">
                                <input value={val} onChange={(e) => changeValue(e, id)} className="bg-gray-200 p-1 rounded-md" />
                                <button onClick={addOption} className="flex items-center justify-between bg-gray-700 hover:bg-gray-800 text-white rounded-full p-1">
                                    <PlusIcon className="w-5 h-5" />
                                </button>
                                <button onClick={() => removeOption(id)} className="flex items-center justify-between bg-gray-700 hover:bg-gray-800 text-white rounded-full p-1">
                                    <MinusIcon className="w-5 h-5" />
                                </button>
                            </div>)}
                        </span>
                    </div>
                    : null
            }

            <button type="button" onClick={onsubmit} className="bg-gray-800 text-white px-3 py-2 hover:bg-gray-900 text-md rounded-lg">Add New</button>
        </div>
    </div >)
}

function PlusIcon({ className }) {
    return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>)
}

const DisplayField = (props) => {
    switch (props.name) {
        case 'textarea':
            return (<label className="flex items-center space-x-3">
                {props.label} <textarea rows="10" cols="50"></textarea>
            </label>)
        case 'input':
            return (<label className="flex items-center space-x-3">
                <span>{props.label}</span> <input className="focus:bg-gray-800 px-2 py-1 focus:text-white rounded-lg " />
            </label>)
        case 'multiple choice':
            return (
                <label className="flex items-center space-x-3">
                    <span>{props.label}</span>
                    {props.options.length === 0 ? <div>no options</div> :
                        <select className="rounded-lg px-2 py-1">
                            {props.options.map((o) => <option key={o.id} value={o.name}>{o.name}</option>)}
                        </select>}

                </label>
            )
    }
}

export default FormPreview
