import React from 'react'

export default function Transcribing({ downloading }) {
    return (
        <div className="flex items-center flex-1 flex-col justify-center gap-10 md:gap-14 text-center pb-24 p-4 min-h-screen bg-black text-white">
            <div className="flex flex-col gap-2 sm:gap-4">
                <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl">
                    <span className="text-gray-400">Transcribing</span>
                </h1>
                <p className="text-gray-400">{!downloading ? 'Engaging...' : 'Engaged'}</p>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 max-w-[400px] mx-auto w-full">
                {[0, 1, 2].map((val) => (
                    <div
                        key={val}
                        className={`rounded-full h-2 sm:h-3 bg-gray-700 animate-pulse`}
                    ></div>
                ))}
            </div>
        </div>
    )
}
