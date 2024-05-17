import { Box, Card, CardActions, CardContent, Chip, Typography, useTheme } from '@mui/material'
import { Todo } from '../../../types'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import useTodoItem from './useTodoItem'
import { Link } from 'react-router-dom'
import TextAnimation from '../../animations/TextAnimation'
import useFormatter from '../../../hooks/useFormatter'

export interface TodoItemProps {
  todo: Todo
  actions?: React.ReactNode
  tabId: string
  index: number
}

export default function TodoItem({ todo, actions, index, tabId }: TodoItemProps) {
  const theme = useTheme()
  const { handleMouseEnter, handleMouseLeave, isHovered } = useTodoItem()
  const { formatDate } = useFormatter()

  const getCardStyles = (isDragging: boolean) => ({
    width: '100%',
    backgroundColor: isDragging ? theme.palette.primary.light : '',
    marginBottom: theme.spacing(3),
  })

  return (
    <Draggable draggableId={todo._id} index={index} key="todo">
      {(provided, snapshot) => (
        <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
          <Card
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={getCardStyles(snapshot.isDragging)}
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

                <Box sx={{ backgroundColor: theme.palette.secondary.light, padding: theme.spacing(1), borderRadius: theme.spacing(.4), color: theme.palette.secondary.contrastText }}>
                  {todo.isJustAdded ? (
                    <TextAnimation
                      typographyProps={{ gutterBottom: true, variant: 'body1' }}
                      text={todo.description}
                      duration={200}
                    />
                  ) : (
                    <Typography gutterBottom variant="body1">
                      {todo.description}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ marginTop: theme.spacing(1) }}>
                  <Typography gutterBottom variant="body2">
                    {todo.isDaily ? 'Daily' : 'Not Daily'}
                  </Typography>
                  <Chip color="secondary" label={todo.category}></Chip>
                </Box>

                <Typography marginTop={theme.spacing(2)} variant="body2" color="textSecondary">
                  {formatDate(todo.endDate)}
                </Typography>
              </CardContent>
            </Link>

            {actions && (
              <CardActions
                className="animate-height"
                style={{ maxHeight: isHovered ? '1000px' : '0', padding: isHovered ? theme.spacing(1) : 0 }}
              >
                {actions}
              </CardActions>
            )}
          </Card>
        </div>
      )}
    </Draggable>
  )
}
