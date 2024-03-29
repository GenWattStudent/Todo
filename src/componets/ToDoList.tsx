import { Grid, Paper, Typography } from '@mui/material'
import { selectNotCompleted } from '../redux/features/todo/todoSlice'
import { useAppSelector } from '../redux/hooks'
import TodoItem from './TodoItem'
import TodoItemActions from './TodoItemActions'

export default function ToDoList() {
  const notCompleted = useAppSelector(selectNotCompleted)

  return (
    <>
      <Paper elevation={3} style={{ marginBottom: '1.2rem', padding: '.5rem' }}>
        <Typography variant="h3" fontWeight={'bold'}>
          Todo List
        </Typography>
        <Typography variant="caption">Not completed: {notCompleted.length} todos</Typography>
      </Paper>

      <Grid container spacing={3}>
        {notCompleted.map((todo, index) => (
          <TodoItem todo={todo} key={index} actions={<TodoItemActions todo={todo} />} />
        ))}
      </Grid>
    </>
  )
}
