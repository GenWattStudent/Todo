import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import TrashIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import useColor from '../../../hooks/useColor'

export interface TabActionsProps {
  addTodo: () => void
  editTabMode: () => void
  handleDeleteTab: () => void
  textColor?: string
  divProps?: React.HTMLAttributes<HTMLDivElement>
}

function TabActions({ addTodo, editTabMode, handleDeleteTab, textColor, ...divProps }: TabActionsProps) {
  const { addAlphaToColor } = useColor()

  const buttonStyles = {
    '&:hover': { backgroundColor: addAlphaToColor(textColor ?? "", 0.5) },
    color: textColor
  }

  return (
    <div {...divProps}>
      <IconButton sx={buttonStyles} size="small" onClick={addTodo}>
        <AddIcon />
      </IconButton>
      <IconButton sx={buttonStyles} size="small" onClick={editTabMode}>
        <EditIcon />
      </IconButton>
      <IconButton sx={buttonStyles} size="small" onClick={handleDeleteTab}>
        <TrashIcon />
      </IconButton>
    </div>
  )
}

export default TabActions
