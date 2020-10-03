import React, { useState } from 'react';

const InputForm = () => {
    const [name, setName] = useState("")
    const [organizer, setOrganizer] = useState("")
    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const data = { name, organizer }
            const response = await fetch('/forms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            //const jsondata = await response.json();
            //console.log(jsondata)
            window.location = '/'
        } catch (err) {
            console.error(err.message)
        }

    }
    return (
        <div className="fixed flex flex-col items-center justify-center bg-white rounded-lg z-10 p-5 shadow-xl">
            <h2 className="font-bold text-xl text-center mb-2">Create a Form</h2>
            <form className="flex flex-col space-y-2" onSubmit={onSubmitForm}>
                <label className="flex space-x-1 items-center">
                    <span className="w-2/6">Form Name</span>
                    <input onChange={e => setName(e.target.value)} value={name} className="bg-gray-200 px-2 py-2 w-4/6 rounded-md" type="text" />
                </label>
                <label className="flex space-x-1 items-center">
                    <span className="w-2/6">Organizer</span>
                    <input onChange={e => setOrganizer(e.target.value)} value={organizer} className="bg-gray-200 px-2 py-2 w-4/6 rounded-md" type="text" />
                </label>
                <button className="rounded-md bg-gray-800 text-white hover:bg-gray-900 px-2 py-2" type="submit">Create Form</button>
            </form>
        </div>
    )
}
export default InputForm