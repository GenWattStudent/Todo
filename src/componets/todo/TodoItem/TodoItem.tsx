import { Card, CardActions, CardContent, Chip, Typography, useTheme } from '@mui/material'
import { Todo } from '../../../types'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import useTodoItem from './useTodoItem'

export interface TodoItemProps {
  todo: Todo
  actions?: React.ReactNode
  tabId: string
  index: number
}

export default function TodoItem({ todo, actions, index }: TodoItemProps) {
  const theme = useTheme()
  const { handleMouseEnter, handleMouseLeave, isHovered } = useTodoItem()

  return (
    <Draggable draggableId={todo.id} index={index} key="todo">
      {(provided, snapshot) => (
        <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
          <Card
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              width: '100%',
              backgroundColor: snapshot.isDragging ? theme.palette.primary.light : '',
              marginBottom: theme.spacing(3),
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                {todo.title}
              </Typography>
              <Typography gutterBottom variant="body2">
                {todo.isDaily ? 'Daily' : 'Not Daily'}
              </Typography>
              <Chip color="secondary" label={todo.category}></Chip>
            </CardContent>
            {actions && isHovered && <CardActions>{actions}</CardActions>}
          </Card>
        </div>
      )}
    </Draggable>
  )
}
