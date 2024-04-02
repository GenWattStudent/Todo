import {
  FormControl,
  InputLabel,
  Input,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
  Box,
  Typography,
} from '@mui/material'
import useTodoForm from './useTodoForm'

export interface TodoFormProps {}

export default function TodoForm({}: TodoFormProps) {
  const { cancelEdit, categories, error, form, handleChange, handleChangeSelect, handleSubmit, message, isEdit } =
    useTodoForm()

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth style={{ marginTop: '.5rem' }}>
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input type="text" name="title" id="title" error={error} value={form.title} onChange={handleChange} />
      </FormControl>

      <FormControl fullWidth style={{ marginTop: '.5rem' }}>
        <InputLabel htmlFor="description">Description</InputLabel>
        <Input
          type="text"
          name="description"
          id="description"
          error={error}
          value={form.description}
          onChange={handleChange}
        />
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
