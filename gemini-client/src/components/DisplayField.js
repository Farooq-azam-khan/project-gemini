import React from 'react'

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

export default DisplayField
