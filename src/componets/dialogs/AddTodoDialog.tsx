import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import TodoForm from '../forms/TodoForm'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectIsEdit, setTodoToEdit } from '../../redux/features/todo/todoSlice'
import { close, selectOpen } from '../../redux/features/todoDialog/todoDialogSlice'

export default function AddTodoDialog() {
  const isEdit = useAppSelector(selectIsEdit)
  const isOpen = useAppSelector(selectOpen)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(close())
    dispatch(setTodoToEdit(null))
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{isEdit ? 'Edit todo' : 'Add todo'}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TodoForm />
      </DialogContent>
    </Dialog>
  )
}
