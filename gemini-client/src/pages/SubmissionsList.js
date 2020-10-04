import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'

const SubmissionsList = () => {
    const [submissions, setSubmissions] = useState([])
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        fetch(`/api/form/${id}/submissions`)
            .then(resp => resp.json())
            .then(data => {
                setSubmissions(data)
                setLoading(false)
                // console.log(data)
            })
    }, [id])

    if (loading) {
        return <LoadingScreen />
    } else if (submissions.length === 0) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-200">
                <div className="flex items-center justify-center bg-white  px-5 py-2 rounded-lg shadow-xl">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl capitalize">There are no Submission for this Form</h1>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-start justify-center space-y-5 w-full h-full px-3 py-1 max-w-4xl">
            <h1 className="text-xl sm:text-2xl md:text-3xl">Submissions</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-10 gap-y-8">
                {submissions.map((s, i) => <DisplaySubmission key={i} {...s} />)}
            </div>
        </div>
    )
}

const DisplaySubmission = (props) => {
    console.log(props)
    return (<div className="w-full h-full bg-white rounded-md shadow-lg flex flex-col items-center justify-center space-y-3 p-5">
        <h2 className="capitalize text-md underline font-semibold">Submission {props['0'].submission ? `#props['0'].submission` : null}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-3">
            {Object.keys(props).map(f => <DisplayFormField key={props[f].id} {...props[f]} />)}
        </div>
    </div>)
}

const DisplayFormField = (props) => {
    console.log(props)
    switch (props.name) {
        case 'textbox':
            return (<div className="col-span-3 flex flex-col items-start justify-start w-full">
                <span className="text-md sm:text-sm text-gray-800">{props.label}</span><span className="w-full truncate">{props.response}</span>
            </div>)
        case 'input':
            return (<div className="col-span-1 flex flex-col items-start justify-start w-full">
                <span className="text-md sm:text-sm text-gray-800">{props.label}</span><span className="w-full truncate">{props.response}</span>
            </div>)
        case 'multiple choice':
            return (<div className="col-span-1 flex flex-col items-start justify-start w-full">
                <span className="text-md sm:text-sm text-gray-800">{props.label}</span><span className="w-full truncate">{props.response}</span>
            </div>)
        default:
            return (<div className="flex flex-col items-start justify-start w-full">
                You should not see this, it is an error.
            </div>)
    }
}



export default SubmissionsList
