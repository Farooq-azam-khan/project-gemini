import React, { useState, useEffect } from 'react'

import {
    Link
} from "react-router-dom";

const ListForms = () => {
    const [forms, setForms] = useState([])

    const getForms = async () => {
        const response = await fetch("/forms")
        const formsjson = await response.json();
        // console.log(formsjson)
        setForms(formsjson)
    }

    useEffect(() => {
        getForms()
    }, [])

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-center">Forms</h2>
            <div className="flex flex-col space-y-2 items-center justify-between">
                {forms.length != 0 ? forms.map(form_data => <FormCard key={form_data.id} {...form_data} />) : null}
            </div>
            <AddFormCard />
        </div>
    )
}

const LinkIcon = ({ className }) => {
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
}

const AddFormCard = () => {
    return (<a href="#" className="block w-full h-32 bg-gray-200 border-4 border-gray-500 hover:bg-gray-600 hover:text-white hover:border-none hover:text-2xl border-dashed flex items-center justify-center">
        <h3 className="text-xl">Add Form</h3>
    </a>)
}
const FormCard = ({ id, name, organizer, is_published }) => {
    return (<div className="flex flex-col items-center border-2 border-solid">
        <div className="bg-blue-200 w-full h-32 flex items-center justify-center">
            <span>{name}</span>
        </div>
        <div className="w-full inline-flex items-center justify-between space-x-2 p-2">
            <span>status</span>
            <span>{is_published ? 'live' : 'not live'}</span>
            <span><LinkIcon className="w-4 h-4" /></span>
        </div>
        <div className="inline-flex items-center justify-end space-x-2 mt-2 p-2">
            <Link to={`/forms-preview/${id}`} className="text-sm border border-blue-200 px-2 py-1 rounded-full hover:border-none hover:bg-blue-200 hover:text-black">Preview</Link>
            <button className="text-sm border border-blue-200 px-2 py-1 rounded-full hover:border-none hover:bg-blue-200 hover:text-black">{is_published ? 'unpublish' : 'publish'}</button>
            <button className="text-sm border border-blue-200 px-2 py-1 rounded-full hover:border-none hover:bg-blue-200 hover:text-black">Edit</button>
        </div>
    </div>)
}

export default ListForms
