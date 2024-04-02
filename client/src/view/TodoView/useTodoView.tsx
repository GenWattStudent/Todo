import { useEffect, useState } from 'react'
import { selectTabs } from '../../redux/features/todo/todoSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getTabs } from '../../redux/features/todo/api'

function useTodoView() {
  const tabs = useAppSelector(selectTabs)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    setOpen(false)
  }

  const openForm = () => {
    setOpen(true)
  }

  useEffect(() => {
    dispatch(getTabs())
  }, [])

  return { tabs, open, handleClose, openForm }
}

export default useTodoView
