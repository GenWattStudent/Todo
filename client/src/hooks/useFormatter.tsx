
function useFormatter() {
    const formatDate = (date: string): string => {
        return new Date(date).toLocaleString('pl-PL', {
            month: 'long',
            year: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        })
    }

    return { formatDate }
}

export default useFormatter