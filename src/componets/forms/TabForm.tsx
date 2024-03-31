import { FormControl, InputLabel, Input, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { addTab } from '../../redux/features/todo/todoSlice'

function TabForm() {
  const [tab, setTab] = useState('')
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTab(e.target.value)
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (tab.length < 2) {
      setError('Tab should have more than 2 letters')
    } else {
      setError('')
    }

    dispatch(addTab(tab))
    setTab('')
  }

  return (
    <form onSubmit={submit}>
      <FormControl fullWidth>
        <InputLabel htmlFor="tab">Tab</InputLabel>
        <Input id="tab" name="tab" value={tab} aria-describedby="tab" onChange={handleChange} error={Boolean(error)} />
        {error && <Typography color="error">{error}</Typography>}
      </FormControl>

      <Button sx={{ marginTop: 1 }} variant="contained" type="submit">
        Add Tab
      </Button>
    </form>
  )
}

export default TabForm
