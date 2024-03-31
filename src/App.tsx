import './App.css'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddTodoDialog from './componets/dialogs/AddTodoDialog'
import { useAppSelector } from './redux/hooks'
import { selectTabs } from './redux/features/todo/todoSlice'
import TodoTabs from './componets/TodoTabs/TodoTabs'
import AddTabDialog from './componets/dialogs/AddTabDialog'
import { useState } from 'react'

function App() {
  const tabs = useAppSelector(selectTabs)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const openForm = () => {
    setOpen(true)
  }

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

export default App
