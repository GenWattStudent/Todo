import { Box, Button } from '@mui/material'
import TodoTabs from '../../componets/TodoTabs/TodoTabs'
import AddTabDialog from '../../componets/dialogs/AddTabDialog'
import AddTodoDialog from '../../componets/dialogs/AddTodoDialog'
import AddIcon from '@mui/icons-material/Add'
import '../../App.css'
import useTodoView from './useTodoView'
import StatusBar from '../../componets/StatusBar/StatusBar'
import TextAnimation from '../../componets/animations/TextAnimation'
import useVoiceCommand from '../../hooks/useVoiceCommand'
import SpeechContainer from '../../componets/speech/SpeechContainer/SpeechContainer'

function TodoView() {
  const { handleClose, open, openForm, tabs, currentText } = useTodoView()
  const { isUserSpeaking } = useVoiceCommand()
  console.log('isUserSpeaking', isUserSpeaking)
  return (
    <>

      <SpeechContainer show={isUserSpeaking} />
      <TextAnimation
        typographyProps={{ color: 'primary', textAlign: 'center' }}
        text={currentText}
        duration={300}
      ></TextAnimation>
      <Box marginBottom={3} display={'flex'} gap={1}>
        <Button onClick={openForm} variant="contained" startIcon={<AddIcon />}>
          Add Tab {isUserSpeaking ? "LOLEK" : "22"}
        </Button>
        <StatusBar />
      </Box>
      <TodoTabs tabs={tabs} />
      <AddTodoDialog />
      <AddTabDialog isOpen={open} close={handleClose} />
    </>
  )
}

export default TodoView
