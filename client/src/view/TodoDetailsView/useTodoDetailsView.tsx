import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getTodoById } from '../../redux/features/todo/api'

function useTodoDetailsView() {
  const { tabId, todoId } = useParams<{ tabId: string; todoId: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const todo = useAppSelector((state) => state.todos.todo)

  useEffect(() => {
    if (!todoId) return
    dispatch(getTodoById(todoId))
  }, [todoId])

  const goBack = () => {
    navigate(-1)
  }

  return {
    goBack,
    tabId,
    todoId,
    todo,
  }
}

export default useTodoDetailsView
