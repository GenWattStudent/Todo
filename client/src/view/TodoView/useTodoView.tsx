import { useEffect, useState } from 'react'
import { selectTabs } from '../../redux/features/todo/todoSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getTabs } from '../../redux/features/todo/api'
const textArray = [
  'All your tasks, all in one place.',
  'Stay organized with our task manager.',
  'Your go-to hub for getting things done.',
  'Simplify your day with our task organizer.',
  'Effortlessly manage your tasks with us.',
  'Your tasks, your way.',
]

function useTodoView() {
  const tabs = useAppSelector(selectTabs)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const [currentText, setCurrentText] = useState<string>('')

  const handleClose = () => {
    setOpen(false)
  }

  const openForm = () => {
    setOpen(true)
  }

  const randomText = () => {
    const randomIndex = Math.floor(Math.random() * textArray.length)
    setCurrentText(textArray[randomIndex])
  }

  useEffect(() => {
    dispatch(getTabs())
    randomText()
  }, [])

  return { tabs, open, handleClose, openForm, currentText }
}

export default useTodoView
