import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import TrashIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export interface TabActionsProps {
  addTodo: () => void
  editTabMode: () => void
  handleDeleteTab: () => void
  textColor?: string
  divProps?: React.HTMLAttributes<HTMLDivElement>
}

function TabActions({ addTodo, editTabMode, handleDeleteTab, textColor, ...divProps }: TabActionsProps) {
  return (
    <div {...divProps}>
      <IconButton style={{ color: textColor }} size="small" onClick={addTodo}>
        <AddIcon />
      </IconButton>
      <IconButton style={{ color: textColor }} size="small" onClick={editTabMode}>
        <EditIcon />
      </IconButton>
      <IconButton style={{ color: textColor }} size="small" onClick={handleDeleteTab}>
        <TrashIcon />
      </IconButton>
    </div>
  )
}

export default TabActions
