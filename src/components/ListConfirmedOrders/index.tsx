"use client"

import { useEffect, useState } from "react"
import CardOrderBasic from "../CardOrderBasic"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { OrderDTO } from "@/dtos/order.dto"
import { confirmOrders } from "@/app/actions/confirm-orders"

type ListConfirmedOrdersProps = {
  initialOrders: OrderDTO[]
  slug: string
}

const ListConfirmedOrders = ({
  initialOrders,
  slug,
}: ListConfirmedOrdersProps) => {
  const [orders, setOrders] = useState<OrderDTO[]>(initialOrders)

  useEffect(() => {
    const pendingIds = orders
      .filter((o) => o.status === "PENDING")
      .map((o) => o.id)

    if (pendingIds.length > 0) {
      console.log("🤖 Auto-confirmando lote de pedidos:", pendingIds)

      confirmOrders(pendingIds, slug).then((result) => {
        if (result?.success) {
          setOrders((prev) =>
            prev.map((order) =>
              pendingIds.includes(order.id)
                ? { ...order, status: "CONFIRMED" }
                : order,
            ),
          )
        }
      })
    }
  }, [orders, slug])

  return (
    <ScrollArea>
      <section className="flex items-center gap-2">
        {orders.map((order) => (
          <CardOrderBasic key={order.id} order={order} />
        ))}
      </section>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default ListConfirmedOrders
