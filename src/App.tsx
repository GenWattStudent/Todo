import './App.css'
import ToDoList from './componets/ToDoList'
import ComplateList from './componets/ComplateList'
import { Box, Button, Grid, Snackbar } from '@mui/material'
import AddToDoContainer from './componets/AddToDoContainer'
import AddIcon from '@mui/icons-material/Add'
import AddTodoDialog from './componets/AddTodoDialog'
import { useDispatch } from 'react-redux'
import { open } from './redux/features/todoDialog/todoDialogSlice'

function App() {
  const dispatch = useDispatch()

  const openForm = () => {
    dispatch(open())
  }

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }} marginBottom={3}>
        <Button onClick={openForm} variant="contained" startIcon={<AddIcon />}>
          Add to do
        </Button>
      </Box>
      <Grid container spacing={3} flexGrow={1}>
        <Grid md={4} item sx={{ display: { xs: 'none', md: 'block' } }}>
          <AddToDoContainer />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ToDoList />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ComplateList />
        </Grid>
      </Grid>

      <AddTodoDialog />
    </>
  )
}

export default App
