import { Box, useTheme } from '@mui/material'
import { ITodoTab } from '../../types'
import TodoTab from './TodoTab/TodoTab'
import { useRef } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import useTodoTabs from './useTodoTabs'

export interface TodoTabsProps {
  tabs: ITodoTab[]
}

function TodoTabs({ tabs }: TodoTabsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { handleDragEnd } = useTodoTabs({ tabs })
  const theme = useTheme()

  return (
    <Box ref={containerRef} overflow={'auto'} marginBottom={theme.spacing(1)}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tabs" direction="horizontal" type="tabs">
          {(provided) => (
            <div
              style={{ display: 'flex', padding: `${theme.spacing(1)} 0` }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tabs.map((tab, index) => (
                <TodoTab key={tab._id} tab={tab} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}

export default TodoTabs
