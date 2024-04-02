import { useState } from 'react'
import { selectTabs } from '../../redux/features/todo/todoSlice'
import { useAppSelector } from '../../redux/hooks'

function useTodoView() {
  const tabs = useAppSelector(selectTabs)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const openForm = () => {
    setOpen(true)
  }

  return { tabs, open, handleClose, openForm }
}

export default useTodoView
