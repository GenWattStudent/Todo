import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { ITabForm } from '../../types'
import useHelpers from '../../hooks/useHelpers'
import { createTab } from '../../redux/features/todo/api'

const initialState: ITabForm = {
  title: '',
  color: '',
  textColor: '',
}

function useTabForm() {
  const [tab, setTab] = useState<ITabForm>(initialState)
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const { generateRandomColor } = useHelpers()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTab((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleColorChange = (color: string) => {
    setTab((prev) => ({ ...prev, color }))
  }

  const handleTextColorChange = (textColor: string) => {
    setTab((prev) => ({ ...prev, textColor }))
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (tab.title.length < 2) {
      setError('Tab should have more than 2 letters')
    } else {
      setError('')
    }

    dispatch(createTab(tab))
    setTab({ ...initialState, color: generateRandomColor(), textColor: generateRandomColor() })
  }

  useEffect(() => {
    setTab((prev) => ({ ...prev, color: generateRandomColor(), textColor: generateRandomColor() }))

    return () => {
      setTab(initialState)
    }
  }, [])

  return { tab, error, handleChange, submit, handleColorChange, handleTextColorChange }
}

export default useTabForm
