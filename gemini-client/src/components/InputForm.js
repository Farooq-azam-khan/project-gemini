import React from 'react';

const InputForm = () => {
    return (
        <div>
            <h1>Form</h1>
            <form className="flex">
                <input className="bg-gray-200 px-2 py-2" type="text" />
                <button className="rounded-md bg-green-300 px-2 py-2">Create Form</button>
            </form>
        </div>
    )
}
export default InputForm