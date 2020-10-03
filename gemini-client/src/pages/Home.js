import React, { useState, useEffect } from 'react'


import LoadingScreen from '../components/LoadingScreen'
import ListForms from '../components/ListForms'

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
        return <LoadingScreen />
    }
    return (
        <div className="flex flex-col items-center max-w-4xl bg-gray-200 w-full pt-10 space-y-10 pb-10">
            <h2 className="text-3xl text-center uppercase">Forms List</h2>
            <ListForms forms={forms} />
        </div>
    )
}

export default Home
