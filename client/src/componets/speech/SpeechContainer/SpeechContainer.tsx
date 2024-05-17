import { Drawer } from '@mui/material'
import useVoiceCommand from '../../../hooks/useVoiceCommand'
import CurrentSpeech from '../CurrentSpeech'

export interface ISpeechContainerProps {
    show: boolean
}

function SpeechContainer({ show }: ISpeechContainerProps) {
    const { isListening } = useVoiceCommand()
    console.log('isListening', show)
    return (
        <Drawer open={show}>
            <CurrentSpeech />
        </Drawer>
    )
}

export default SpeechContainer