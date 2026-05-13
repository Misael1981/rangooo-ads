"use client"

import { OrderDTO } from "@/dtos/order.dto"
import { Button } from "../ui/button"
import DialogSelectedOrder from "../DialogSelectedOrder"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { startFinalizeOrder } from "@/app/actions/start-finalize-order"

type NumberOrderCardProps = {
  order: OrderDTO
  slug: string
}

const NumberOrderCard = ({ order, slug }: NumberOrderCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleClickButton = () => {
    setIsOpen(true)
  }

  const handleFinalizeOrder = () => {
    startTransition(async () => {
      const result = await startFinalizeOrder(order.id, slug)
      if (result.success) {
        toast.success("Produção iniciada!")
        setIsOpen(false)
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <>
      <Button variant="outline" onClick={handleClickButton}>
        {order.orderNumber}
      </Button>

      <DialogSelectedOrder
        open={isOpen}
        onOpenChange={setIsOpen}
        order={order}
        actionButton={
          <Button onClick={handleFinalizeOrder} disabled={isPending}>
            {isPending ? "PROCESSANDO..." : "ENTREGUE"}
          </Button>
        }
      />
    </>
  )
}

export default NumberOrderCard
