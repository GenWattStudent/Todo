import { Box, useTheme } from '@mui/material'
import TodoItem from '../../todo/TodoItem/TodoItem'
import TodoItemActions from '../../todo/TodoItem/TodoItemActions'
import { ITodoTab } from '../../../types'
import AddTodoDialog from '../../dialogs/AddTodoDialog'
import { useRef } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TabHeader from '../TabHeader/TabHeader'
import useTodoTab from './useTodoTab'

export interface ToDoListProps {
  tab: ITodoTab
  index: number
}

export default function TodoTab({ tab, index }: ToDoListProps) {
  const theme = useTheme()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { containerHeight } = useTodoTab({ containerRef })

  return (
    <Draggable draggableId={tab._id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Box
            ref={containerRef}
            style={{ marginRight: theme.spacing(3), overflowY: 'auto', overflowX: 'hidden' }}
            width={280}
            height={containerHeight}
          >
            <TabHeader tab={tab} dragHandleProps={provided.dragHandleProps} />

            <Droppable droppableId={tab._id} type="todo" direction="vertical">
              {(provided) => (
                <div style={{ minHeight: 200 }} {...provided.droppableProps} ref={provided.innerRef}>
                  {tab.items.map((todo, index) => (
                    <TodoItem
                      todo={todo}
                      key={todo._id}
                      tabId={tab._id}
                      index={index}
                      actions={<TodoItemActions todo={todo} tabId={tab._id} />}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <AddTodoDialog />
          </Box>
        </div>
      )}
    </Draggable>
  )
}
