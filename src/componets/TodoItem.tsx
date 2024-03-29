import { Badge, Card, CardActions, CardContent, Chip, Grid, Typography } from '@mui/material'
import { Todo } from '../types'
import React from 'react'

export interface TodoItemProps {
  todo: Todo
  actions?: React.ReactNode
}

export default function TodoItem({ todo, actions }: TodoItemProps) {
  return (
    <Grid item style={{ width: '100%' }}>
      <Card style={{ width: '100%' }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {todo.title}
          </Typography>
          <Typography gutterBottom variant="body2">
            {todo.isDaily ? 'Daily' : 'Not Daily'}
          </Typography>
          <Chip color="secondary" label={todo.category}></Chip>
        </CardContent>
        {actions && <CardActions>{actions}</CardActions>}
      </Card>
    </Grid>
  )
}
