"use client"

import { useEffect, useState } from "react"
import { Card } from "../ui/card"
import { OrderDTO } from "@/dtos/order.dto"
import DialogSelectedOrder from "../DialogSelectedOrder"
import { METHOD_CONFIG } from "@/constants/enum-maps"

type CardOrderBasicProps = {
  order: OrderDTO
  slug: string
}

const CardOrderBasic = ({ order, slug }: CardOrderBasicProps) => {
  const [minutesElapsed, setMinutesElapsed] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

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

  const handleClickCard = () => {
    setIsOpen(true)
  }

  return (
    <>
      <Card
        className={`w-24 gap-0 border-2 p-2 transition-all duration-500 ${getBorderColor()}`}
        onClick={handleClickCard}
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
      <DialogSelectedOrder
        open={isOpen}
        onOpenChange={setIsOpen}
        order={order}
        slug={slug}
      />
    </>
  )
}

export default CardOrderBasic
