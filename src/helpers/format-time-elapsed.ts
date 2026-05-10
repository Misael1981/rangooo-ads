export const formatTimeElapsed = (startDate: string) => {
  const start = new Date(startDate).getTime()
  const now = new Date().getTime()
  const diffInMs = Math.max(0, now - start)

  const minutes = Math.floor(diffInMs / 60000)
  const seconds = Math.floor((diffInMs % 60000) / 1000)

  return {
    formatted: `${minutes}:${seconds.toString().padStart(2, "0")}`,
    minutes,
  }
}
