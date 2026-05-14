"use client"

import DialogSelectedOrder from "@/components/DialogSelectedOrder"
import { Button } from "@/components/ui/button"
import { OrderDTO } from "@/dtos/order.dto"
import { useState } from "react"

type OrderCompletedCardProps = {
  order: OrderDTO
}

const OrderCompletedCard = ({ order }: OrderCompletedCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClickButton = () => {
    setIsOpen(true)
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
      />
    </>
  )
}

export default OrderCompletedCard
