import { useState, useRef, useEffect } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay'
import Information from './components/Information'
import Transcribing from './components/Transcribing'
import NeatBackground from './components/Neatbackground'
import { MessageTypes } from './utils/presets'

function App() {
  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const isAudioAvailable = file || audioStream

  function handleAudioReset() {
    setFile(null)
    setAudioStream(null)
  }

  const worker = useRef(null)

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), {
        type: 'module'
      })
    }

    const onMessageReceived = (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          console.log('DOWNLOADING')
          break
        case 'LOADING':
          setLoading(true)
          console.log('LOADING')
          break
        case 'RESULT':
          setOutput(e.data.results)
          console.log(e.data.results)
          break
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log('DONE')
          break
      }
    }

    worker.current.addEventListener('message', onMessageReceived)
    return () => worker.current.removeEventListener('message', onMessageReceived)
  }, [])

  async function readAudioFrom(file) {
    const audioCTX = new AudioContext({ sampleRate: 16000 })
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    return decoded.getChannelData(0)
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) return
    const audio = await readAudioFrom(file || audioStream)
    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name: 'openai/whisper-tiny.en'
    })
  }

  return (
    <div className='flex flex-col min-h-screen bg-black text-white w-full relative'>
      {/* Neat background */}
      <NeatBackground />

      <section className='flex flex-col flex-1 max-w-[1000px] mx-auto w-full px-4 sm:px-6 relative z-10'>
        <Header dark />
        {output ? (
          <Information output={output} finished={finished} dark />
        ) : loading ? (
          <Transcribing dark />
        ) : isAudioAvailable ? (
          <FileDisplay
            handleFormSubmission={handleFormSubmission}
            handleAudioReset={handleAudioReset}
            file={file}
            audioStream={audioStream}
            dark
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} dark />
        )}
      </section>

      <footer className='text-center text-slate-500 py-4 text-sm relative z-10'>
        hehe, thank you!
      </footer>
    </div>
  )
}

export default App
