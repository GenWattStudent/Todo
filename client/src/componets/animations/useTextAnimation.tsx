import { useEffect, useState } from 'react'
import { ITextAnimationProps } from './TextAnimation'

export default function useTextAnimation(props: ITextAnimationProps) {
  const { text, duration } = props
  let interval: any
  const [currentText, setCurrentText] = useState<string>('')
  const [isFinished, setIsFinished] = useState<boolean>(false)

  useEffect(() => {
    if (!text) return
    if (interval) clearInterval(interval)
    setCurrentText('')

    animate()
    return () => {
      clearInterval(interval)
    }
  }, [text])

  const animate = () => {
    let i = 0
    interval = setInterval(() => {
      setCurrentText((prev) => {
        i++
        return prev + text[i - 1]
      })

      if (i === text.length - 1) {
        setIsFinished(true)
        clearInterval(interval)
      }
    }, duration / text.length)
  }

  return { currentText, isFinished }
}
