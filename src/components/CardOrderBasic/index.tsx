"use client"

import { useState, useTransition } from "react"
import { Card } from "../ui/card"
import { OrderDTO } from "@/dtos/order.dto"
import DialogSelectedOrder from "../DialogSelectedOrder"
import { METHOD_CONFIG } from "@/constants/enum-maps"
import { Button } from "../ui/button"
import { startPreparation } from "@/app/actions/start-preparation"
import { toast } from "sonner"
import { useOrderTimeStatus } from "@/hooks/use-order-time-status"

type CardOrderBasicProps = {
  order: OrderDTO
  slug: string
  onRemoveOrder: (orderId: string) => void
}

const CardOrderBasic = ({
  order,
  slug,
  onRemoveOrder,
}: CardOrderBasicProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const { minutesElapsed, borderColor } = useOrderTimeStatus({
    time: order.createdAt,
  })

  const methodConfig = METHOD_CONFIG[order.method]

  const handleClickCard = () => {
    setIsOpen(true)
  }

  const handleStart = () => {
    startTransition(async () => {
      const result = await startPreparation(order.id, slug)
      if (result.success) {
        toast.success("Produção iniciada!")
        onRemoveOrder(order.id)
        setIsOpen(false)
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <>
      <Card
        className={`gap-0 border-2 p-2 transition-all duration-500 ${borderColor}`}
        onClick={handleClickCard}
      >
        <div className="flex flex-col text-center">
          <div className="space-x-2">
            <span className="text-lg font-bold">{order.orderNumber}</span>
            <span className="md:hidden"> - </span>
            <span
              className={`mt-1 rounded-md border px-2 py-1 text-xs font-semibold uppercase ${methodConfig.className}`}
            >
              {methodConfig.label}
            </span>
          </div>

          <span className="mt-1 font-mono text-xs">
            {minutesElapsed} min atrás
          </span>
        </div>
      </Card>
      <DialogSelectedOrder
        open={isOpen}
        onOpenChange={setIsOpen}
        order={order}
        actionButton={
          <Button onClick={handleStart} disabled={isPending} className="w-full">
            {isPending ? "INICIANDO..." : "INICIAR PREPARO"}
          </Button>
        }
      />
    </>
  )
}

export default CardOrderBasic
