import React from 'react'

export default function Transcription({ textElement }) {
    return (
        <div className="w-full max-w-prose mx-auto p-4 bg-gray-900 text-white rounded-lg whitespace-pre-wrap break-words">
            {textElement || <p className="text-gray-500">No transcription available yet.</p>}
        </div>
    )
}
