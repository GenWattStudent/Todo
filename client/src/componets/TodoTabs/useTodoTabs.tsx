import React from 'react'
import { DraggableLocation, DropResult } from 'react-beautiful-dnd'
import { changeOrder, setTabs, changeTodoTab } from '../../redux/features/todo/todoSlice'
import { useAppDispatch } from '../../redux/hooks'
import { ITodoTab } from '../../types'
import { changeTabOrderApi, changeTodoOrderInSameTab, changeTodoTabApi } from '../../redux/features/todo/api'

export interface TodoTabsHookProps {
  tabs: ITodoTab[]
}

function useTodoTabs({ tabs }: TodoTabsHookProps) {
  const dispatch = useAppDispatch()

  const changeTodoInSameTab = (tabStart: ITodoTab, source: DraggableLocation, destination: DraggableLocation) => {
    const items = [...tabStart.items]
    const [removed] = items.splice(source.index, 1)

    items.splice(destination.index, 0, removed)
    dispatch(changeTodoOrderInSameTab({ tabId: tabStart._id, todos: items }))
    dispatch(changeOrder({ tabId: tabStart._id, items }))
  }

  const changeTabOrder = (source: DraggableLocation, destination: DraggableLocation) => {
    const items = [...tabs]
    const [removed] = items.splice(source.index, 1)

    items.splice(destination.index, 0, removed)
    dispatch(changeTabOrderApi(items))
    dispatch(setTabs(items))
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return

    const tabStart = tabs.find((tab) => tab._id === source.droppableId)
    const tabEnd = tabs.find((tab) => tab._id === destination.droppableId)

    if (type === 'tabs') {
      changeTabOrder(source, destination)
      return
    }

    if (!tabStart || !tabEnd) return

    if (tabStart._id === tabEnd._id) {
      changeTodoInSameTab(tabStart, source, destination)
      return
    }

    dispatch(changeTodoTabApi({ tabId: destination.droppableId, todoId: draggableId, order: destination.index + 1 }))
    dispatch(changeTodoTab({ tabId: destination.droppableId, todoId: draggableId, index: destination.index }))
  }

  return {
    handleDragEnd,
  }
}

export default useTodoTabs
