import { Button, ButtonGroup, Tooltip } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ReplyAllIcon from '@mui/icons-material/ReplyAll'
import { Todo } from '../types'
import { useAppDispatch } from '../redux/hooks'
import { complateTodo, deleteTodo } from '../redux/features/todo/todoSlice'

export interface ComplateActionsProps {
  todo: Todo
}

export default function ComplateActions({ todo }: ComplateActionsProps) {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
  }

  const backToTodo = () => {
    dispatch(complateTodo(todo.id))
  }

  return (
    <ButtonGroup>
      <Tooltip title="Back to todo list">
        <Button onClick={backToTodo} variant="outlined">
          <ReplyAllIcon />
        </Button>
      </Tooltip>

      <Tooltip title="Delete">
        <Button onClick={handleDelete} color="error" variant="outlined">
          <DeleteForeverIcon />
        </Button>
      </Tooltip>
    </ButtonGroup>
  )
}
