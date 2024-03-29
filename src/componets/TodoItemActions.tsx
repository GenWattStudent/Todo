import { ButtonGroup, Button, useMediaQuery, useTheme } from '@mui/material'
import { deleteTodo, setTodoToEdit, complateTodo } from '../redux/features/todo/todoSlice'
import { useAppDispatch } from '../redux/hooks'
import { Todo } from '../types'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import { open } from '../redux/features/todoDialog/todoDialogSlice'

export interface TodoItemActionsProps {
  todo: Todo
}

export default function TodoItemActions({ todo }: TodoItemActionsProps) {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const lowerThanMd = useMediaQuery(theme.breakpoints.down('md'))

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
  }

  const handleEdit = () => {
    dispatch(setTodoToEdit(todo))

    if (lowerThanMd) {
      dispatch(open())
    }
  }

  const handleDone = () => {
    dispatch(complateTodo(todo.id))
  }

  return (
    <ButtonGroup>
      <Button onClick={handleDone} color="success" variant="outlined">
        <DoneIcon />
      </Button>
      <Button onClick={handleEdit} color="info" variant="outlined">
        <EditIcon />
      </Button>
      <Button onClick={handleDelete} color="error" variant="outlined">
        <DeleteForeverIcon />
      </Button>
    </ButtonGroup>
  )
}
