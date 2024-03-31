import { FormControl, InputLabel, Input, useTheme } from '@mui/material'
import React from 'react'

export interface EditTabProps {
  tab: { title: string }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function EditTab({ tab, handleChange }: EditTabProps) {
  const theme = useTheme()
  return (
    <FormControl style={{ width: 120, marginBottom: theme.spacing(1) }}>
      <InputLabel htmlFor="tab-title">Tab Title</InputLabel>
      <Input type="text" id="tab-title" value={tab.title} onChange={handleChange} />
    </FormControl>
  )
}

export default EditTab
