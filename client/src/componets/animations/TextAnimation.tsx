import useTextAnimation from './useTextAnimation'
import { Typography, TypographyProps } from '@mui/material'

export interface ITextAnimationProps {
  text: string
  duration: number
  typographyProps?: TypographyProps
}

export default function TextAnimation({ text, duration = 300, typographyProps }: ITextAnimationProps) {
  const { currentText, isFinished } = useTextAnimation({ text, duration })

  return (
    <Typography {...typographyProps}>
      {currentText}
      {!isFinished && <span className="cursor"></span>}
    </Typography>
  )
}
