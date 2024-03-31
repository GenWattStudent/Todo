import { Box, Typography, Chip, BoxProps } from '@mui/material'

export interface ItemsCountProps {
  items: any[]
  boxProps?: BoxProps
}

function ItemsCount({ items, ...boxProps }: ItemsCountProps) {
  return (
    <Box display={'flex'} alignItems={'center'} gap={1} {...boxProps}>
      <Typography>Items: </Typography>
      <Chip label={items.length} />
    </Box>
  )
}

export default ItemsCount
