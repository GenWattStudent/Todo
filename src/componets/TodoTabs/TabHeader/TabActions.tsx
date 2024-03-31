import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import TrashIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export interface TabActionsProps {
  addTodo: () => void
  editTabMode: () => void
  handleDeleteTab: () => void
  divProps?: React.HTMLAttributes<HTMLDivElement>
}

function TabActions({ addTodo, editTabMode, handleDeleteTab, ...divProps }: TabActionsProps) {
  return (
    <div {...divProps}>
      <IconButton color="primary" size="small" onClick={addTodo}>
        <AddIcon />
      </IconButton>
      <IconButton color="warning" size="small" onClick={editTabMode}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" size="small" onClick={handleDeleteTab}>
        <TrashIcon />
      </IconButton>
    </div>
  )
}

export default TabActions
