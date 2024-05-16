import { Box } from '@mui/material'
import useVoiceCommand from '../../hooks/useVoiceCommand'
import TextAnimation from '../animations/TextAnimation'

function CurrentSpeech() {
    const { command, isListening } = useVoiceCommand()
    return (
        <Box style={{ width: 200 }}>
            <TextAnimation text={command} duration={300}></TextAnimation>
        </Box>
    )
}

export default CurrentSpeech