import { Box, Button } from '@mui/material'
import TodoTabs from '../../componets/TodoTabs/TodoTabs'
import AddTabDialog from '../../componets/dialogs/AddTabDialog'
import AddTodoDialog from '../../componets/dialogs/AddTodoDialog'
import AddIcon from '@mui/icons-material/Add'
import '../../App.css'
import useTodoView from './useTodoView'

function TodoView() {
  const { handleClose, open, openForm, tabs } = useTodoView()

  return (
    <>
      <Box marginBottom={3}>
        <Button onClick={openForm} variant="contained" startIcon={<AddIcon />}>
          Add Tab
        </Button>
      </Box>

      <TodoTabs tabs={tabs} />

      <AddTodoDialog />
      <AddTabDialog isOpen={open} close={handleClose} />
    </>
  )
}

export default TodoView
