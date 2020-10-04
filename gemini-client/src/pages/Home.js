import React, { useState, useEffect } from 'react'


import LoadingScreen from '../components/LoadingScreen'
import ListForms from '../components/ListForms'
import InputForm from '../components/InputForm'

const Home = () => {
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(true)


    const getForms = async () => {
        const response = await fetch("/api/forms")
        const formsjson = await response.json();
        setForms(formsjson)
        setLoading(false)
        console.log(formsjson)
    }

    useEffect(() => {
        getForms()
    }, [])
    if (loading) {
        return <LoadingScreen />
    } else if (forms.length === 0) {
        return (<div className="fixed inset-0 w-full h-full bg-gray-800 flex items-center justify-center">
            <InputForm />

        </div>)
    }
    return (
        <div className="flex flex-col items-center justify-center sm:max-w-4xl bg-gray-200 w-full sm:pt-10 sm:space-y-10 sm:pb-10">
            <h2 className="text-3xl text-center uppercase">Forms List</h2>
            <ListForms forms={forms} />
        </div>
    )
}

export default Home
