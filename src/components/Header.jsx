import React from 'react'

export default function Header() {
    return (
        <header className="flex flex-col rounded-lg sm:flex-row items-center justify-between gap-4 p-4 bg-black/40 backdrop-blur-sm text-white w-full">
            <a href="/" className="text-center sm:text-left">
                <h1 className="font-bold text-2xl sm:text-3xl">
                    ScripQuick
                </h1>
            </a>

            <div className="flex gap-4 mt-2 sm:mt-0">
                <a 
                    href="/" 
                    className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-lg text-white transition duration-200"
                >
                    <p>New</p>
                    <i className="fa-solid fa-plus"></i>
                </a>
            </div>
        </header>
    )
}
