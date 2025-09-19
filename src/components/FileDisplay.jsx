import React, { useRef, useEffect } from 'react'

export default function FileDisplay({ handleAudioReset, file, audioStream, handleFormSubmission }) {
    const audioRef = useRef()

    useEffect(() => {
        if (!file && !audioStream) return

        if (file) {
            audioRef.current.src = URL.createObjectURL(file)
        } else {
            audioRef.current.src = URL.createObjectURL(audioStream)
        }
    }, [file, audioStream])

    return (
        <main className="flex-1 p-6 flex flex-col gap-6 justify-center items-center w-full max-w-lg mx-auto bg-black/40 backdrop-blur-sm text-white min-h-screen">
            <h1 className="font-bold text-5xl sm:text-6xl text-center">
                Welcome to <span className="text-gray-400">ScripQuick</span>
            </h1>

            <div className="flex flex-col text-left w-full mt-6">
                <h3 className="font-semibold text-gray-300">File Name</h3>
                <p className="truncate text-gray-400">{file ? file.name : 'Custom Audio'}</p>
            </div>

            <div className="w-full my-4">
                <audio ref={audioRef} className="w-full" controls style={{ filter: 'invert(1)' }}>
                    Your browser does not support the audio element.
                </audio>
            </div>

            <div className="flex items-center justify-between gap-4 w-full">
                <button 
                    onClick={handleAudioReset} 
                    className="text-gray-400 hover:text-white duration-200"
                >
                    Reset
                </button>
                <button 
                    onClick={handleFormSubmission} 
                    className="bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-white"
                >
                    Transcribe
                    <i className="fa-solid fa-pen-nib"></i>
                </button>
            </div>
        </main>
    )
}
