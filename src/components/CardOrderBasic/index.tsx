"use client"

import { useEffect, useState } from "react"
import { Card } from "../ui/card"
import { OrderDTO } from "@/dtos/order.dto"

const METHOD_CONFIG = {
  DELIVERY: {
    label: "Entrega",
    className: "bg-blue-100 text-blue-700 border-blue-300",
  },
  PICKUP: {
    label: "Retirada",
    className: "bg-pink-100 text-pink-700 border-pink-300",
  },
  DINE_IN: {
    label: "Mesa",
    className: "bg-purple-100 text-purple-700 border-purple-300",
  },
} as const

const CardOrderBasic = ({ order }: { order: OrderDTO }) => {
  const [minutesElapsed, setMinutesElapsed] = useState(0)

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(order.createdAt).getTime()
      const now = new Date().getTime()
      const diffInMs = now - start

      setMinutesElapsed(Math.floor(diffInMs / 60000))
    }

    calculateTime()

    const interval = setInterval(calculateTime, 60000)

    return () => clearInterval(interval)
  }, [order.createdAt])

  const getBorderColor = () => {
    if (minutesElapsed >= 10) {
      return "border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]"
    }

    return "border-green-500"
  }

  const methodConfig = METHOD_CONFIG[order.method]

  return (
    <Card
      className={`w-24 gap-0 border-2 p-2 transition-all duration-500 ${getBorderColor()}`}
    >
      <div className="flex flex-col text-center">
        <span className="text-lg font-bold">#{order.orderNumber}</span>

        <span
          className={`mt-1 rounded-md border px-2 py-1 text-xs font-semibold uppercase ${methodConfig.className}`}
        >
          {methodConfig.label}
        </span>

        <span className="mt-1 font-mono text-xs">
          {minutesElapsed} min atrás
        </span>
      </div>
    </Card>
  )
}

export default CardOrderBasic
