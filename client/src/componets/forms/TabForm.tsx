import { FormControl, InputLabel, Input, Button, Typography, useTheme } from '@mui/material'
import useTabForm from './useTabForm'
import { MuiColorInput } from 'mui-color-input'

function TabForm() {
  const { error, handleChange, submit, tab, handleColorChange, handleTextColorChange } = useTabForm()
  const theme = useTheme()

  return (
    <form onSubmit={submit}>
      <FormControl sx={{ marginTop: theme.spacing(1) }} fullWidth>
        <InputLabel htmlFor="tab">Tab</InputLabel>
        <Input
          id="tab_title"
          name="title"
          value={tab.title}
          aria-describedby="title"
          onChange={handleChange}
          error={Boolean(error)}
        />
        {error && <Typography color="error">{error}</Typography>}
      </FormControl>

      <InputLabel sx={{ marginTop: theme.spacing(1) }} htmlFor="color">Tab background Color</InputLabel>
      <FormControl fullWidth>
        <MuiColorInput id="color" name="color" value={tab.color} onChange={handleColorChange} />
      </FormControl>

      <InputLabel sx={{ marginTop: theme.spacing(1) }} htmlFor="color">Tab text Color</InputLabel>
      <FormControl fullWidth>
        <MuiColorInput id="textColor" name="textColor" value={tab.textColor} onChange={handleTextColorChange} />
      </FormControl>

      <Button sx={{ marginTop: theme.spacing(1) }} variant="contained" type="submit">
        Add Tab
      </Button>
    </form>
  )
}

export default TabForm
