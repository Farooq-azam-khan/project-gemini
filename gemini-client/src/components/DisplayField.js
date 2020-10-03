import React from 'react'

function XIcon({ className }) {
    return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>)
}

const XButton = (props) => {
    const deleteFormField = () => {
        console.log(props.id)
        fetch(`/api/form_field/${props.id}`, {
            method: 'DELETE'
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.success) {
                    window.location = `/edit-form/${props.form}`
                }
            })
    }
    console.log(props)
    return (<button onClick={deleteFormField} className="hover:text-white rounded-full hover:bg-gray-900 p-1"><XIcon className="w-4 h-4" /></button>)
}
const DisplayField = (props) => {
    const { name, editPage, id } = props
    switch (name) {
        case 'textbox':
            return (<div className="flex flex-col items-start space-y-1">
                <span className="inline-flex items-center space-x-2"><label htmlFor={`text-${id}`} className=" capitalize"> {props.label} </label>{editPage ? <XButton {...props} /> : null}</span>
                <textarea id={`text-${id}`} className="rounded-md shadow-sm w-full h-full " rows="5" cols="10"></textarea>

            </div>)
        case 'input':
            return (<div className="flex flex-col items-start space-y-2 bg-white rounded-md">
                <span className="inline-flex items-center space-x-2"><label htmlFor={`input-${id}`} className=" capitalize w-full">{props.label}</label>
                    {editPage ? <XButton {...props} /> : null}</span>
                <input id={`input-${id}`} className="border-2 focus:bg-gray-800 px-2 py-1 w-full focus:text-white rounded-lg " />

            </div>)
        case 'multiple choice':
            return (<div className="flex flex-col items-start space-y-2 pt-1 pr-1">
                <span className="inline-flex items-center space-x-2"><label className="capitalize w-full" htmlFor={`multiple-choice-${id}`}>{props.label}</label>{editPage ? <XButton {...props} /> : null}</span>
                {props.options.length === 0 ? <div>no options</div> :
                    <select id={`multiple-choice-${id}`} className="rounded-lg px-2 py-1">
                        {props.options.map((o) => <option key={o.id} value={o.name}>{o.name}</option>)}
                    </select>}

            </div>
            )
        default:
            return (
                <div>you should not see this, if you do there has been an error</div>
            )
    }
}

export default DisplayField
