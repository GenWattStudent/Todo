import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import TabForm from '../forms/TabForm'

export interface AddTabDialogProps {
  close: () => void
  isOpen: boolean
}

export default function AddTabDialog({ isOpen, close }: AddTabDialogProps) {
  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Add Tab</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TabForm />
      </DialogContent>
    </Dialog>
  )
}
