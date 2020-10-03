import React, { useState, useEffect } from 'react'

import {
    Link
} from "react-router-dom";
import InputForm from './InputForm';

const ListForms = ({ forms }) => {
    const [displayFormModal, setDisplayFormModal] = useState(false)

    return (
        <>
            { displayFormModal ? <><button onClick={() => setDisplayFormModal(false)} className="z-10 fixed inset-0 cursor-default bg-black opacity-50 w-full h-full" /><InputForm /></> : null}
            <div className="px-2 w-full grid sm:grid-cols-2 sm:gap-x-4 gap-y-8 md:grid-cols-3">

                <AddFormCard close={setDisplayFormModal} />
                {forms.length != 0 ? forms.map(form_data => <FormCard key={form_data.id} {...form_data} />) : null}
            </div>
        </>
    )
}

const LinkIcon = ({ className }) => {
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
}

const AddFormCard = ({ close }) => {
    // launches a modal to create a form
    return (<><button onClick={() => close(true)} className="rounded-lg shadow-lg w-full h-full bg-white border-2 border-gray-500 hover:bg-gray-900 hover:text-white hover:border-none border-dashed flex items-center justify-center">
        <h3 className="text-2xl uppercase">Add Form</h3>
    </button>

    </>)
}
const FormCard = ({ id, name, organizer, is_published }) => {
    return (<div className="flex flex-col items-center bg-white rounded-md shadow-lg">
        <div className="rounded-t-md bg-gray-800 hover:bg-gray-900 w-full h-32 flex items-center justify-center">
            <span className="text-white text-lg text-bold uppercase">{name}</span>
        </div>
        <div className="w-full inline-flex items-center justify-between space-x-2 p-2">
            <span>status</span>
            <span>{is_published ? 'live' : 'not live'}</span>
            <Link to={`/submit-form/${id}`} className="rounded-full hover:text-white hover:bg-gray-900 p-1"><LinkIcon className="w-4 h-4" /></Link>
        </div>
        <div className="inline-flex items-center justify-end space-x-2 mt-2 p-2">
            <Link to={`/forms-preview/${id}`} className="text-sm lowercase font-light border border-gray-900 px-2 py-1 rounded-full hover:bg-gray-900 hover:text-white">Preview</Link>
            <button className="text-sm lowercase font-light border border-gray-900 px-2 py-1 rounded-full hover:bg-gray-900 hover:text-white">{is_published ? 'unpublish' : 'publish'}</button>
            <Link to={`/edit-form/${id}`} className="text-sm lowercase font-light border border-gray-900 px-2 py-1 rounded-full hover:bg-gray-900 hover:text-white">Edit</Link>
        </div>
    </div>)
}

export default ListForms
