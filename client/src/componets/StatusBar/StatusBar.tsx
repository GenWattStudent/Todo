import { Chip } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'
import { Status, selectStatus } from '../../redux/features/todo/todoSlice'
import TextAnimation from '../animations/TextAnimation'

function StatusBar() {
  const status = useAppSelector(selectStatus)

  function getColor(status: Status): 'success' | 'warning' | 'error' {
    let color: 'success' | 'warning' | 'error' = 'success'

    switch (status) {
      case Status.Loading:
        color = 'warning'
        break
      case Status.Error:
        color = 'error'
        break
      case Status.NetworkError:
        color = 'error'
        break
      default:
        color = 'success'
        break
    }

    return color
  }

  const color = getColor(status)

  return <Chip color={color} label={<TextAnimation text={status} duration={200} />}></Chip>
}

export default StatusBar
