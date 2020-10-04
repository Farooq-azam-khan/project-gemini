import React from 'react'
import { Link } from 'react-router-dom'


const LinkIcon = ({ className }) => {
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
}

const FormCard = ({ id, name, organizer, is_published }) => {
    const publishOrUnpublish = () => {
        console.log('inverting...', is_published)
        const data = { 'is_published': !is_published }
        // invert publishing 
        fetch(`/api/forms/publish/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(data => {
                if (data.success) {
                    window.location = '/'
                }
            })
    }
    return (<div className="flex flex-col items-center bg-white rounded-md shadow-lg">
        <div className="rounded-t-md bg-gray-800 hover:bg-gray-900 w-full h-32 flex flex-col items-center justify-center">
            <span className="text-white text-lg text-bold capitalize">{name}</span>
            <span className="text-white text-md text-bold capitalize">({organizer})</span>
        </div>
        <div className="w-full inline-flex items-center justify-between space-x-2 p-2">
            <span>status</span>
            <span>{is_published ? <StatusOnline className="w-6 h-6" /> : <StatusOffnline className="w-6 h-6" />}</span>
            <Link target="_blank" to={`/submit-form/${id}`} className="rounded-full hover:text-white hover:bg-gray-900 p-1"><LinkIcon className="w-4 h-4" /></Link>
        </div>
        <div className="flex items-center justify-between w-full  space-x-1 mt-2 py-2 px-3">
            <Link to={`/forms-preview/${id}`} className="text-sm lowercase font-light border border-gray-900 px-2 py-1 rounded-full hover:bg-gray-900 hover:text-white">Preview</Link>
            <button onClick={publishOrUnpublish} className="text-sm lowercase font-light p-1 rounded-full border border-gray-900 hover:bg-gray-900 hover:text-white px-1 py-1">{is_published ? 'unpublish' : 'publish'}</button>
            <Link to={`/form-submission-list/${id}`} className="text-sm lowercase font-light border border-gray-900 px-2 py-1 rounded-full hover:bg-gray-900 hover:text-white">Submissions</Link>
            <Link to={`/edit-form/${id}`} className="text-sm  rounded-full hover:text-gray-900 text-gray-700"><EditIcon className="w-5 h-5" /></Link>
        </div>
    </div>)
}

function StatusOnline({ className }) {
    return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>)
}

function StatusOffnline({ className }) {
    return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"></path></svg>)
}

function EyeIcon({ className }) {
    return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>)
}
function EyeOffIcon({ className }) {
    return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>)
}
function EditIcon({ className }) {
    return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>)
}
export default FormCard
