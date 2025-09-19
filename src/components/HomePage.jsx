import React, { useState, useEffect, useRef } from 'react'

export default function HomePage({ setAudioStream, setFile }) {
    const [recordingStatus, setRecordingStatus] = useState('inactive')
    const [audioChunks, setAudioChunks] = useState([])
    const [duration, setDuration] = useState(0)

    const mediaRecorder = useRef(null)
    const mimeType = 'audio/webm'

    async function startRecording() {
        let tempStream
        try {
            const streamData = await navigator.mediaDevices.getUserMedia({ audio: true })
            tempStream = streamData
        } catch (err) {
            console.error(err.message)
            return
        }

        setRecordingStatus('recording')
        const media = new MediaRecorder(tempStream, { type: mimeType })
        mediaRecorder.current = media
        mediaRecorder.current.start()

        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) localAudioChunks.push(event.data)
        }
        setAudioChunks(localAudioChunks)
    }

    async function stopRecording() {
        setRecordingStatus('inactive')
        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType })
            setAudioStream(audioBlob)
            setAudioChunks([])
            setDuration(0)
        }
    }

    useEffect(() => {
        if (recordingStatus === 'inactive') return
        const interval = setInterval(() => setDuration(curr => curr + 1), 1000)
        return () => clearInterval(interval)
    }, [recordingStatus])

    return (
        <main className="flex-1 p-6 flex flex-col gap-6 justify-center items-center w-full min-h-screen text-white">
            <h1 className="font-bold text-5xl sm:text-6xl text-center stroke-text">
                ScripQuick <span className="text-gray-400">App</span>
            </h1>

            <h3 className="font-medium md:text-lg text-gray-300">
                Record <span className="text-gray-400">&rarr;</span> Transcribe
            </h3>

            <button
                onClick={recordingStatus === 'recording' ? stopRecording : startRecording}
                className="flex items-center justify-between gap-4 px-6 py-3 w-72 max-w-full rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition duration-200"
            >
                <p className="text-white">{recordingStatus === 'inactive' ? 'Record' : `Stop Recording`}</p>
                <div className="flex items-center gap-2">
                    {duration !== 0 && <p className="text-sm text-gray-400">{duration}s</p>}
                    <i className={`fa-solid fa-microphone duration-200 ${recordingStatus === 'recording' ? 'text-rose-400' : 'text-gray-400'}`}></i>
                </div>
            </button>

            <p className="text-gray-400 mt-2">
                Or{' '}
                <label className="text-white underline cursor-pointer hover:text-gray-300 duration-200">
                    upload{' '}
                    <input
                        type="file"
                        accept=".mp3,.wav,.webm"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </label>{' '}
                a file
            </p>

            <p className="italic text-gray-500 mt-6">by viro!</p>
        </main>
    )
}
