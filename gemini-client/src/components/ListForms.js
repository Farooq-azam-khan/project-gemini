import React, { useState } from 'react'

import InputForm from './InputForm'
import FormCard from './FormCard'

const ListForms = ({ forms }) => {
    const [displayFormModal, setDisplayFormModal] = useState(false)

    return (
        <>
            { displayFormModal ? <><button onClick={() => setDisplayFormModal(false)} className="z-10 fixed inset-0 cursor-default bg-black opacity-50 w-full h-full" /><InputForm /></> : null}
            <div className="px-2 w-full grid sm:grid-cols-2 sm:gap-x-4 gap-y-8 md:grid-cols-3">

                <AddFormCard close={setDisplayFormModal} />
                {forms.length != 0 ? forms.map(form_data => <FormCard key={form_data.id} {...form_data} />) : null}
            </div>
        </>
    )
}
const AddFormCard = ({ close }) => {
    // launches a modal to create a form
    return (<><button onClick={() => close(true)} className=" rounded-lg shadow-lg w-full min-h-full h-32 bg-white border-2 border-gray-500 hover:bg-gray-900 hover:text-white hover:border-none border-dashed flex items-center justify-center">
        <h3 className="text-2xl uppercase">Add Form</h3>
    </button>

    </>)
}


export default ListForms
