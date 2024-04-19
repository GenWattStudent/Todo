import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import annyang from 'annyang'

export default function useVoiceCommand() {
  const [isListening, setIsListening] = React.useState(false)
  // console.log('isListening', isListening)
  useEffect(() => {
    if (annyang) {
      console.log('annyang', annyang)
      // Set the language
      ;(annyang as any).setLanguage('pl-PL')

      // Define a command
      const commands = {
        'ok adrian': () => {
          toast.success('Hello Adrian')
        },
      }

      // Add the commands to annyang
      ;(annyang as any).addCommands(commands)
      ;(annyang as any).addCallback('result', function (userSaid: any, commandText: any, phrases: any) {
        console.log(userSaid) // sample output: 'hello'
        console.log(commandText) // sample output: 'hello (there)'
        console.log(phrases) // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
      })
      ;(annyang as any).addCallback('resultMatch', function (userSaid: any, commandText: any, phrases: any) {
        console.log(userSaid) // sample output: 'hello'
        console.log(commandText) // sample output: 'hello (there)'
        console.log(phrases) // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
      })
      ;(annyang as any).addCallback('start', () => setIsListening(true))
      ;(annyang as any).addCallback('end', () => setIsListening(false))

      // ;(annyang as any).addCallback('error', function (err: any) {
      //   console.error('There was an error with the Speech Recognition:', err)
      // })

      // Start annyang
      ;(annyang as any).start({ autoRestart: true })
    }
  }, [])

  return {}
}
