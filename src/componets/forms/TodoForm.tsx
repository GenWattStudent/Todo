import React, { useEffect, useState } from 'react'
import { ITodoForm } from '../../types'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  createTodo,
  editTodo,
  selectEditedTodo,
  selectIsEdit,
  selectSelectedTabId,
  setTodoToEdit,
} from '../../redux/features/todo/todoSlice'
import {
  FormControl,
  InputLabel,
  Input,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  OutlinedInput,
  Button,
  Box,
  Typography,
} from '@mui/material'
import { selectCategories } from '../../redux/features/todoCategory/todoCategorySlice'
import { close } from '../../redux/features/todoDialog/todoDialogSlice'

export interface TodoFormProps {}

const initialState: ITodoForm = {
  title: '',
  isDaily: false,
  category: 'work',
  tabId: '',
}

export default function TodoForm({}: TodoFormProps) {
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
      dispatch(editTodo({ todo: form, tabId: selectedTabId, todoId: editedTodo.id }))
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
      })
    }
  }, [isEdit, editedTodo, selectedTabId])

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth style={{ marginTop: '.5rem' }}>
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input type="text" name="title" id="title" error={error} value={form.title} onChange={handleChange} />
      </FormControl>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox onChange={handleChange} name="isDaily" id="isDaily" checked={form.isDaily} />}
          label={form.isDaily ? 'Daily' : 'Not Daily'}
        />
        {error && <Typography color="error">{message}</Typography>}
      </FormGroup>

      <FormControl fullWidth sx={{ mt: 1 }}>
        <InputLabel id="todo-category-label">Category</InputLabel>
        <Select
          labelId="todo-category-label"
          name="category"
          id="category"
          onChange={handleChangeSelect}
          input={<OutlinedInput label="Category" />}
          defaultValue={'work'}
          value={form.category}
        >
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.value}
            </MenuItem>
          ))}
        </Select>
        <Box display={'flex'} gap={1} marginTop={1}>
          <Button variant="contained" type="submit">
            {isEdit ? 'Edit Todo' : 'Add Todo'}
          </Button>

          {isEdit && (
            <Button variant="contained" color="error" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </Box>
      </FormControl>
    </form>
  )
}
