import React from 'react'
import Transcription from './Transcription'

export default function Information({ output, finished }) {
    const textElement = output.map(val => val.text).join(' ')

    function handleCopy() {
        navigator.clipboard.writeText(textElement)
    }

    function handleDownload() {
        const element = document.createElement("a")
        const file = new Blob([textElement], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = `ScripQuick_${new Date().toISOString()}.txt`
        document.body.appendChild(element)
        element.click()
        element.remove()
    }

    return (
        <main className="flex-1 p-6 flex flex-col gap-6 justify-center items-center w-full max-w-lg mx-auto min-h-screen bg-black text-white">
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl text-center">
                Your <span className="text-gray-400">Transcription</span>
            </h1>

            <div className="my-8 w-full">
                {!finished && (
                    <div className="grid place-items-center mb-4">
                        <i className="fa-solid fa-spinner animate-spin text-gray-400 text-2xl"></i>
                    </div>
                )}

                <Transcription textElement={textElement} output={output} finished={finished} />
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={handleCopy} 
                    title="Copy" 
                    className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded transition duration-200"
                >
                    <i className="fa-solid fa-copy"></i>
                </button>
                <button 
                    onClick={handleDownload} 
                    title="Download" 
                    className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded transition duration-200"
                >
                    <i className="fa-solid fa-download"></i>
                </button>
            </div>
        </main>
    )
}
