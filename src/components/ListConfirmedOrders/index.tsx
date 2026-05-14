"use client"

import { useEffect, useState } from "react"
import CardOrderBasic from "../CardOrderBasic"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { OrderDTO } from "@/dtos/order.dto"
import { confirmOrders } from "@/app/actions/confirm-orders"
import { Badge } from "../ui/badge"

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

    if (pendingIds.length === 0) return

    const autoConfirm = async () => {
      const result = await confirmOrders(pendingIds, slug)

      if (result?.success) {
        setOrders((prev) =>
          prev.map((order) =>
            pendingIds.includes(order.id)
              ? { ...order, status: "CONFIRMED" }
              : order,
          ),
        )
      }
    }

    autoConfirm()
  }, [orders, slug])

  const confirmedOrders = orders.filter((order) => order.status === "CONFIRMED")

  const removeOrderFromList = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId))
  }

  return (
    <section className="space-y-2 border-b pb-4 md:flex md:h-full md:w-fit md:flex-col md:justify-between md:border-r md:border-b-0 md:pr-4">
      <div className="flex items-center justify-between space-y-2 space-x-2 md:flex-col md:text-center">
        <h2 className="text-sm text-gray-500">Pedidos Confirmados</h2>
        <Badge variant="outline">{confirmedOrders.length}</Badge>
      </div>
      <ScrollArea className="md:h-[50vh]">
        <div className="flex items-center gap-4 md:flex-col">
          {confirmedOrders.map((order) => (
            <CardOrderBasic
              key={order.id}
              order={order}
              slug={slug}
              onRemoveOrder={removeOrderFromList}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="md:hidden" />
      </ScrollArea>
    </section>
  )
}

export default ListConfirmedOrders
