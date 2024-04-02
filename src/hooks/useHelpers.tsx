function useHelpers() {
  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  return { generateRandomColor }
}

export default useHelpers
