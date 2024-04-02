import React, { useState } from 'react'

function useTodoItem() {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false)
  }

  return {
    handleMouseEnter,
    handleMouseLeave,
    isHovered,
  }
}

export default useTodoItem
