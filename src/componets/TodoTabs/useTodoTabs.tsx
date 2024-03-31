import React from 'react'
import { DraggableLocation, DropResult } from 'react-beautiful-dnd'
import { changeOrder, setTabs, changeTodoTab } from '../../redux/features/todo/todoSlice'
import { useAppDispatch } from '../../redux/hooks'
import { ITodoTab } from '../../types'

export interface TodoTabsHookProps {
  tabs: ITodoTab[]
}

function useTodoTabs({ tabs }: TodoTabsHookProps) {
  const dispatch = useAppDispatch()

  const changeTodoInSameTab = (tabStart: ITodoTab, source: DraggableLocation, destination: DraggableLocation) => {
    const items = [...tabStart.items]
    const [removed] = items.splice(source.index, 1)

    items.splice(destination.index, 0, removed)
    dispatch(changeOrder({ tabId: tabStart.id, items }))
  }

  const changeTabOrder = (source: DraggableLocation, destination: DraggableLocation) => {
    const items = [...tabs]
    const [removed] = items.splice(source.index, 1)

    items.splice(destination.index, 0, removed)
    dispatch(setTabs(items))
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return

    const tabStart = tabs.find((tab) => tab.id === source.droppableId)
    const tabEnd = tabs.find((tab) => tab.id === destination.droppableId)

    if (type === 'tabs') {
      changeTabOrder(source, destination)
      return
    }

    if (!tabStart || !tabEnd) return

    if (tabStart.id === tabEnd.id) {
      changeTodoInSameTab(tabStart, source, destination)
      return
    }

    dispatch(changeTodoTab({ tabId: destination.droppableId, todoId: draggableId, index: destination.index }))
  }

  return {
    handleDragEnd,
  }
}

export default useTodoTabs
