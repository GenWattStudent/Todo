import { Chip } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'
import { selectStatus } from '../../redux/features/todo/todoSlice'

function StatusBar() {
  const status = useAppSelector(selectStatus)

  const color = status === 'Ready' ? 'success' : 'warning'

  return <Chip color={color} label={status}></Chip>
}

export default StatusBar
