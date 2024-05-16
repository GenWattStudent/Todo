import { FormControl, InputLabel, Input, useTheme } from '@mui/material'
import React from 'react'
import { ITodoTab } from '../../../types'

export interface EditTabProps {
  tab: ITodoTab
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function EditTab({ tab, handleChange }: EditTabProps) {
  const theme = useTheme()
  return (
    <FormControl style={{ width: 120, marginBottom: theme.spacing(1) }}>
      <InputLabel style={{ color: tab.textColor }} htmlFor="tab-title">Tab Title</InputLabel>
      <Input style={{ color: tab.textColor }} type="text" id="tab-title" name="title" value={tab.title} onChange={handleChange} />
    </FormControl>
  )
}

export default EditTab
