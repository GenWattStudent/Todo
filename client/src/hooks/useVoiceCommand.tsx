import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import annyang from 'annyang'

export default function useVoiceCommand() {
  const [isListening, setIsListening] = useState(false)
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  const [command, setCommand] = useState('')
  // console.log('isListening', isListening

  useEffect(() => { console.log("lolek " + isUserSpeaking) }, [isUserSpeaking])


  const hey = () => {
    setIsUserSpeaking(prev => {
      console.log('Updating isUserSpeaking to true')
      return true
    })
  }

  useEffect(() => {
    // speech recognition

    if (annyang) {
      console.log(annyang)
        // Set the language
        ; (annyang as any).setLanguage('pl-PL')
      // Define a command
      const commands = {
        'okej adrian': function () {
          toast.success('Hello Adrian')
          hey()
        },
      }
        // Add the commands to annyang
        ; (annyang as any).addCommands(commands)

        ; (annyang as any).addCallback('result', function (userSaid: any, commandText: any, phrases: any) {
          console.log(phrases) // sample output: 'hello'
          setCommand(userSaid[0])
        })
        ; (annyang as any).addCallback('resultMatch', function (userSaid: any, commandText: any, phrases: any) {
          console.log(userSaid) // sample output: 'hello'
          console.log(commandText) // sample output: 'hello (there)'
          console.log(phrases) // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
        })
        ; (annyang as any).addCallback('start', () => setIsListening(true))
        ; (annyang as any).addCallback('end', () => setIsListening(false))
        // ;(annyang as any).addCallback('error', function (err: any) {
        //   console.error('There was an error with the Speech Recognition:', err)
        // })
        // Start annyang
        ; (annyang as any).start({ autoRestart: true, continuous: true })
    }
  }, [])

  return { command, isListening, isUserSpeaking }
}
