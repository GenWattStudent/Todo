import { ButtonGroup, Button } from '@mui/material'
import { deleteTodo, selectTab, setTodoToEdit } from '../../../redux/features/todo/todoSlice'
import { useAppDispatch } from '../../../redux/hooks'
import { Todo } from '../../../types'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { open } from '../../../redux/features/todoDialog/todoDialogSlice'

export interface TodoItemActionsProps {
  todo: Todo
  tabId: string
}

export default function TodoItemActions({ todo, tabId }: TodoItemActionsProps) {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteTodo({ todoId: todo.id, tabId }))
  }

  const handleEdit = () => {
    dispatch(setTodoToEdit(todo))
    dispatch(open())
    dispatch(selectTab(tabId))
  }

  return (
    <ButtonGroup>
      <Button onClick={handleEdit} color="info" variant="outlined">
        <EditIcon />
      </Button>
      <Button onClick={handleDelete} color="error" variant="outlined">
        <DeleteForeverIcon />
      </Button>
    </ButtonGroup>
  )
}
