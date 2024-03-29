import { Grid, Paper, Typography } from '@mui/material'
import { selectCompleted } from '../redux/features/todo/todoSlice'
import { useAppSelector } from '../redux/hooks'
import TodoItem from './TodoItem'
import ComplateActions from './ComplateActions'

export interface ComplateListProps {}

export default function ComplateList({}: ComplateListProps) {
  const completed = useAppSelector(selectCompleted)

  return (
    <>
      <Paper style={{ padding: '.5rem', marginBottom: '1.2rem' }} elevation={4}>
        <Typography variant="h3" fontWeight={'bold'}>
          Complated
        </Typography>
        <Typography variant="caption">Not completed: {completed.length} todos</Typography>
      </Paper>

      <Grid container spacing={3}>
        {completed.map((todo, index) => (
          <TodoItem key={index} todo={todo} actions={<ComplateActions todo={todo} />} />
        ))}
      </Grid>
    </>
  )
}
