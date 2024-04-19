import { Card, CardActions, CardContent, Chip, Typography, useTheme } from '@mui/material'
import { Todo } from '../../../types'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import useTodoItem from './useTodoItem'
import { Link } from 'react-router-dom'
import TextAnimation from '../../animations/TextAnimation'

export interface TodoItemProps {
  todo: Todo
  actions?: React.ReactNode
  tabId: string
  index: number
}

export default function TodoItem({ todo, actions, index, tabId }: TodoItemProps) {
  const theme = useTheme()
  const { handleMouseEnter, handleMouseLeave, isHovered } = useTodoItem()

  return (
    <Draggable draggableId={todo._id} index={index} key="todo">
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
            <Link
              style={{ textDecoration: 'none', color: theme.palette.text.primary }}
              to={`/todo/${tabId}/${todo._id}`}
            >
              <CardContent>
                {todo.isJustAdded ? (
                  <TextAnimation
                    typographyProps={{ gutterBottom: true, variant: 'h5' }}
                    text={todo.title}
                    duration={500}
                  />
                ) : (
                  <Typography gutterBottom variant="h5">
                    {todo.title}
                  </Typography>
                )}

                <Typography gutterBottom variant="body2">
                  {todo.isDaily ? 'Daily' : 'Not Daily'}
                </Typography>
                <Chip color="secondary" label={todo.category}></Chip>

                <Typography marginTop={theme.spacing(2)} variant="body2" color="textSecondary">
                  {new Date(todo.endDate).toLocaleString('pl-PL', {
                    month: 'long',
                    year: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </Typography>
              </CardContent>
            </Link>
            {actions && isHovered && <CardActions>{actions}</CardActions>}
          </Card>
        </div>
      )}
    </Draggable>
  )
}
