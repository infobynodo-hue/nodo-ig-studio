'use client'

import { useState, useRef } from 'react'
import { Mic, MicOff } from 'lucide-react'

export default function VoiceButton({
  onTranscript,
  className = '',
}: {
  onTranscript: (text: string) => void
  className?: string
}) {
  const [listening, setListening] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recogRef = useRef<any>(null)

  function toggle() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = typeof window !== 'undefined' ? (window as any) : null
    const SR = w?.SpeechRecognition ?? w?.webkitSpeechRecognition ?? null

    if (!SR) {
      alert('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.')
      return
    }

    if (listening) {
      recogRef.current?.stop()
      setListening(false)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition: any = new SR()
    recognition.lang = 'es-ES'
    recognition.continuous = true
    recognition.interimResults = false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      const transcript = Array.from(e.results as ArrayLike<SpeechRecognitionResult>)
        .map((r: SpeechRecognitionResult) => r[0].transcript)
        .join(' ')
      onTranscript(transcript)
    }

    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)

    recogRef.current = recognition
    recognition.start()
    setListening(true)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={listening ? 'Detener grabación' : 'Dictar con voz'}
      className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all ${
        listening
          ? 'border-red-400 bg-red-50 text-red-500 animate-pulse'
          : 'border-border text-muted hover:text-text hover:border-[#C8F135]/50 bg-white'
      } ${className}`}
    >
      {listening ? <MicOff size={14} /> : <Mic size={14} />}
    </button>
  )
}
