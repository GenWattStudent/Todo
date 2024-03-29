import React, { useEffect, useState } from 'react'
import { ITodoForm } from '../types'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addTodo, selectEditedTodo, selectIsEdit, setTodoToEdit } from '../redux/features/todo/todoSlice'
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
  Snackbar,
} from '@mui/material'
import { selectCategories } from '../redux/features/todoCategory/todoCategorySlice'

export interface TodoFormProps {}

const initialState: ITodoForm = {
  title: '',
  isDaily: false,
  category: 'work',
}

export default function TodoForm({}: TodoFormProps) {
  const [form, setForm] = useState(initialState)
  const categories = useAppSelector(selectCategories)
  const dispatch = useAppDispatch()
  const isEdit = useAppSelector(selectIsEdit)
  const editedTodo = useAppSelector(selectEditedTodo)
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const close = () => setOpen(false)

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
      setOpen(true)
      setError(true)
      setMessage('Title should have more than 3 letters')
      return
    }

    dispatch(addTodo(form))
    setForm(initialState)
    setError(false)
  }

  const cancelEdit = () => {
    dispatch(setTodoToEdit(null))
    setForm(initialState)
  }

  useEffect(() => {
    if (isEdit && editedTodo) {
      setForm({ title: editedTodo.title, isDaily: editedTodo.isDaily, category: editedTodo.category })
    }
  }, [isEdit, editedTodo])

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
      <Snackbar onClose={close} open={open} message={message} />
    </form>
  )
}
