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
    <section className="space-y-2 border-b pb-4 md:w-fit md:border-r md:border-b-0 md:pr-4">
      <h2 className="">Pedidos Confirmados</h2>
      <ScrollArea>
        <div className="flex items-center gap-4 md:flex-col">
          {orders.map((order) => (
            <CardOrderBasic key={order.id} order={order} slug={slug} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="md:hidden" />
      </ScrollArea>
    </section>
  )
}

export default ListConfirmedOrders
