import React, { useState } from 'react'
import { useAppDispatch } from '../../../redux/hooks'
import { selectTab, updateTab } from '../../../redux/features/todo/todoSlice'
import { open } from '../../../redux/features/todoDialog/todoDialogSlice'
import { ITodoTab } from '../../../types'
import { deleteTab, editTab } from '../../../redux/features/todo/api'
import useDebounce from '../../../hooks/useDebounce'

export interface TabHeaderProps {
  tab: ITodoTab
}

function useTabHeader({ tab }: TabHeaderProps) {
  const dispatch = useAppDispatch()
  const [isEditTabMode, setEditTabMode] = useState(false)
  const { debounce } = useDebounce()

  const addTodo = () => {
    dispatch(open())
    dispatch(selectTab(tab._id))
  }

  const editTabMode = () => {
    setEditTabMode((prev) => !prev)
  }

  const handleDeleteTab = () => {
    dispatch(deleteTab(tab._id))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...tab, [e.target.name]: e.target.value }

    dispatch(updateTab(newData))
    debounce(() => dispatch(editTab(newData)), 1000)
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
