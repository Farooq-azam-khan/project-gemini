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
            <span>{is_published ? 'live' : 'not live'}</span>
            <Link target="_blank" to={`/submit-form/${id}`} className="rounded-full hover:text-white hover:bg-gray-900 p-1"><LinkIcon className="w-4 h-4" /></Link>
        </div>
        <div className="inline-flex items-center justify-end space-x-2 mt-2 p-2">
            <Link to={`/forms-preview/${id}`} className="text-sm lowercase font-light border border-gray-900 px-2 py-1 rounded-full hover:bg-gray-900 hover:text-white">Preview</Link>
            <button onClick={publishOrUnpublish} className="text-sm lowercase font-light border border-gray-900 px-2 py-1 rounded-full hover:bg-gray-900 hover:text-white">{is_published ? 'unpublish' : 'publish'}</button>
            <Link to={`/edit-form/${id}`} className="text-sm lowercase font-light border border-gray-900 px-2 py-1 rounded-full hover:bg-gray-900 hover:text-white">Edit</Link>
        </div>
    </div>)
}

export default FormCard
