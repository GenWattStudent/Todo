import React, { useEffect, useState } from 'react'
import { ITodoForm } from '../../types'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectEditedTodo, selectIsEdit, selectSelectedTabId, setTodoToEdit } from '../../redux/features/todo/todoSlice'
import { SelectChangeEvent } from '@mui/material'
import { selectCategories } from '../../redux/features/todoCategory/todoCategorySlice'
import { close } from '../../redux/features/todoDialog/todoDialogSlice'
import { editTodo, createTodo } from '../../redux/features/todo/api'

const initialState: ITodoForm = {
  title: '',
  isDaily: false,
  category: 'work',
  tabId: '',
  description: '',
  endDate: '',
}

function useTodoForm() {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const dispatch = useAppDispatch()

  const categories = useAppSelector(selectCategories)
  const isEdit = useAppSelector(selectIsEdit)
  const editedTodo = useAppSelector(selectEditedTodo)
  const selectedTabId = useAppSelector(selectSelectedTabId)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? e.target.checked : value
    setForm({ ...form, [name]: newValue })
  }

  const handleChangeSelect = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value as string })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.title.length < 3) {
      setError(true)
      setMessage('Title should have more than 3 letters')
      return
    }

    if (isEdit && editedTodo && selectedTabId) {
      dispatch(editTodo({ todo: form, tabId: selectedTabId, todoId: editedTodo._id }))
      dispatch(setTodoToEdit(null))
    } else {
      dispatch(createTodo({ ...form, tabId: selectedTabId!! }))
    }

    setForm(initialState)
    setError(false)
    dispatch(close())
  }

  const cancelEdit = () => {
    dispatch(setTodoToEdit(null))
    setForm(initialState)
  }

  useEffect(() => {
    if (isEdit && editedTodo && selectedTabId) {
      setForm({
        title: editedTodo.title,
        isDaily: editedTodo.isDaily,
        category: editedTodo.category,
        tabId: selectedTabId,
        description: editedTodo.description,
        endDate: editedTodo.endDate,
      })
    }
  }, [isEdit, editedTodo, selectedTabId])

  return {
    form,
    error,
    message,
    categories,
    isEdit,
    handleChange,
    handleChangeSelect,
    handleSubmit,
    cancelEdit,
  }
}

export default useTodoForm
