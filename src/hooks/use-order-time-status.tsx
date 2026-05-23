import { useEffect, useState } from "react"

type UseOrderTimeStatusProps = {
  time: Date | string
}

export function useOrderTimeStatus({ time }: UseOrderTimeStatusProps) {
  const [minutesElapsed, setMinutesElapsed] = useState(0)

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(time).getTime()
      const now = Date.now()

      const diffInMs = now - start

      setMinutesElapsed(Math.floor(diffInMs / 60000))
    }

    calculateTime()

    const interval = setInterval(calculateTime, 60000)

    return () => clearInterval(interval)
  }, [time])

  const borderColor =
    minutesElapsed > 20
      ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
      : minutesElapsed >= 10
        ? "border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]"
        : "border-green-500"

  return {
    minutesElapsed,
    borderColor,
  }
}
