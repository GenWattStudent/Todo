import { Box, Typography, Chip, BoxProps } from '@mui/material'

export interface ItemsCountProps {
  items: any[]
  textColor?: string
  boxProps?: BoxProps
}

function ItemsCount({ items, textColor, ...boxProps }: ItemsCountProps) {
  return (
    <Box display={'flex'} alignItems={'center'} gap={1} {...boxProps}>
      <Typography>Items: </Typography>
      <Chip style={{ color: textColor }} label={items.length} />
    </Box>
  )
}

export default ItemsCount
