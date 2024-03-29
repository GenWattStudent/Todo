import { Paper, Typography } from '@mui/material'
import TodoForm from './TodoForm'
import { useAppSelector } from '../redux/hooks'
import { selectIsEdit } from '../redux/features/todo/todoSlice'

export default function AddToDoContainer() {
  const isEdit = useAppSelector(selectIsEdit)

  return (
    <Paper style={{ padding: '.5rem' }} elevation={4}>
      <Typography fontWeight={'bold'} variant="h3">
        {isEdit ? 'Edit Todo' : 'Add Todo'}
      </Typography>
      <TodoForm />
    </Paper>
  )
}
