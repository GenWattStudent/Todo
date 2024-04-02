import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function useTodoDetailsView() {
  const { tabId, todoId } = useParams<{ tabId: string; todoId: string }>()
  const navigate = useNavigate()

  useEffect(() => {}, [tabId])

  const goBack = () => {
    navigate(-1)
  }

  return {
    goBack,
    tabId,
    todoId,
  }
}

export default useTodoDetailsView
