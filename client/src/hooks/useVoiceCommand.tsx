import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function useVoiceCommand() {
  const [voiceCommand, setVoiceCommand] = React.useState<string>('')

  useEffect(() => {
    const recognition = new (window as any).webkitSpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.start()

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('')
      setVoiceCommand(transcript)

      if (event.results[0].isFinal) {
        recognition.stop()
      }

      recognition.onend = recognition.start
    }

    recognition.onerror = (event: any) => {
      console.log('Error', event.error + 'asdasd')
      if (event.error === 'no-speech') {
        toast.error('Please try again')
      } else if (event.error === 'not-allowed') {
        toast.error('Please allow microphone access for voice commands')
      } else if (event.error === 'audio-capture') {
        toast.error(
          'Unable to capture audio. Please check your microphone and allow microphone access for voice commands.'
        )
      }
    }
  }, [])

  return { voiceCommand }
}
