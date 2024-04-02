import { useAppSelector } from '../../redux/hooks'
import { selectTabById } from '../../redux/features/todo/todoSlice'
import { Card, CardContent, CardHeader, Chip, Grid, IconButton, Typography, useTheme } from '@mui/material'
import '../../App.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import useTodoDetailsView from './useTodoDetailsView'

function TodoDetailsView() {
  const { goBack, tabId, todoId, todo } = useTodoDetailsView()
  const theme = useTheme()

  if (!tabId || !todoId) {
    return <div>Invalid ID</div>
  }

  const tab = useAppSelector((state) => selectTabById(state, tabId))

  if (!tab) {
    return <div>Tab not found</div>
  }

  if (!todo) {
    return <div>Todo not found</div>
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <IconButton onClick={goBack} color="primary">
          <ArrowBackIcon />
          <Typography marginLeft={theme.spacing(1)}>Back</Typography>
        </IconButton>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title={`Tab name: ${tab.title}`}></CardHeader>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader color="primary" title={todo.title} />
          <CardContent>
            <Typography gutterBottom>{todo.description}</Typography>
            <Typography gutterBottom>{todo.isDaily ? 'Dailty' : 'Not Daily'}</Typography>
            <Chip label={todo.category} color="secondary" />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TodoDetailsView
