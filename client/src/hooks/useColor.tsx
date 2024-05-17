

function useColor() {
    const addAlphaToColor = (color: string, alpha: number) => {
        return `${color.replace("rgb", "rgba").replace(")", "")}, ${alpha})`
    }

    return { addAlphaToColor }
}

export default useColor