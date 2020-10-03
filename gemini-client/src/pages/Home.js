import React, { useState, useEffect } from 'react'


// import InputForm from '../components/InputForm'
import ListForms from '../components/ListForms'

function MinusIcon({ className }) {
    return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>)
}
const Home = () => {
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(true)


    const getForms = async () => {
        const response = await fetch("/forms")
        const formsjson = await response.json();
        setForms(formsjson)
        setLoading(false)
    }

    useEffect(() => {
        getForms()
    }, [])
    if (loading) {
        return <div className="fixed inset-0 w-screen h-scree">
            <div className="w-full h-full flex items-center justify-center space-x-3">
                <MinusIcon className="animate-spin w-10 h-10" />
                <span className="text-3xl">Loading</span>
            </div>
        </div>
    } else {

        return (
            <div className="flex flex-col items-center max-w-4xl bg-gray-200 w-full pt-10 space-y-10 pb-10">
                <h2 className="text-3xl text-center uppercase">Forms List</h2>
                <ListForms forms={forms} />
            </div>
        )
    }
}

export default Home
