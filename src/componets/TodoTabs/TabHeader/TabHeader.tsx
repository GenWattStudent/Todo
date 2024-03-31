import { Paper, Box, Typography, useTheme } from '@mui/material'
import { ITodoTab } from '../../../types'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'
import TabActions from './TabActions'
import EditTab from './EditTab'
import ItemsCount from './ItemsCount'
import useTabHeader from './useTabHeader'

export interface TabHeaderProps {
  tab: ITodoTab
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}

function TabHeader({ dragHandleProps, tab }: TabHeaderProps) {
  const { addTodo, editTabMode, handleChange, handleDeleteTab, isEditTabMode } = useTabHeader({ tab })
  const theme = useTheme()

  return (
    <Paper style={{ marginBottom: theme.spacing(3), padding: theme.spacing(2) }} {...dragHandleProps} elevation={3}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={1}>
        {isEditTabMode ? (
          <EditTab tab={tab} handleChange={handleChange} />
        ) : (
          <Typography width={120} variant="h5" fontWeight={'bold'}>
            {tab.title}
          </Typography>
        )}
        <TabActions addTodo={addTodo} editTabMode={editTabMode} handleDeleteTab={handleDeleteTab} />
      </Box>

      <ItemsCount items={tab.items} />
    </Paper>
  )
}

export default TabHeader
