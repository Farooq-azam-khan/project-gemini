import React from 'react'

function MinusIcon({ className }) {
    return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>)
}
const LoadingScreen = () => {
    return (<div className="fixed inset-0 w-screen h-scree">
        <div className="w-full h-full flex items-center justify-center space-x-3">
            <MinusIcon className="animate-spin w-10 h-10" />
            <span className="text-3xl">Loading</span>
        </div>
    </div>
    )
}

export default LoadingScreen
