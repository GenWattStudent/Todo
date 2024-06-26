import { useTheme } from '@mui/material'
import React, { useLayoutEffect, useState } from 'react'

export interface TodoTabHookProps {
  containerRef: React.RefObject<HTMLDivElement>
}

const DEFAULT_HEIGHT = 500
function useTodoTab({ containerRef }: TodoTabHookProps) {
  const theme = useTheme()
  const [containerHeight, setContainerHeight] = useState(DEFAULT_HEIGHT)

  const calculateContainerHeight = (): number => {
    if (!containerRef.current) return DEFAULT_HEIGHT

    const paddingY = +theme.spacing(3).replace('px', '') + +theme.spacing(1.5).replace('px', '')

    return window.innerHeight - containerRef.current.getBoundingClientRect().top - paddingY
  }

  const handleResize = () => {
    setContainerHeight(calculateContainerHeight())
  }

  useLayoutEffect(() => {
    setContainerHeight(calculateContainerHeight())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [containerRef.current])

  return {
    containerHeight,
  }
}

export default useTodoTab
