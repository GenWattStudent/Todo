import React, { useState } from 'react'
import { useAppDispatch } from '../../../redux/hooks'
import { deleteTab, editTab, selectTab } from '../../../redux/features/todo/todoSlice'
import { open } from '../../../redux/features/todoDialog/todoDialogSlice'
import { ITodoTab } from '../../../types'

export interface TabHeaderProps {
  tab: ITodoTab
}

function useTabHeader({ tab }: TabHeaderProps) {
  const dispatch = useAppDispatch()
  const [isEditTabMode, setEditTabMode] = useState(false)

  const addTodo = () => {
    dispatch(open())
    dispatch(selectTab(tab.id))
  }

  const editTabMode = () => {
    setEditTabMode((prev) => !prev)
  }

  const handleDeleteTab = () => {
    dispatch(deleteTab(tab.id))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editTab({ ...tab, [e.target.name]: e.target.value }))
  }

  return {
    addTodo,
    editTabMode,
    handleDeleteTab,
    handleChange,
    isEditTabMode,
  }
}

export default useTabHeader
