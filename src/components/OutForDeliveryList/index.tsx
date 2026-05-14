"use client"

import { OrderDTO } from "@/dtos/order.dto"
import NumberOrderCard from "../NumberOrderCard"
import { Badge } from "../ui/badge"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

type OutForDeliveryListProps = {
  orders: OrderDTO[]
  slug: string
}

const OutForDeliveryList = ({ orders, slug }: OutForDeliveryListProps) => {
  return (
    <div className="space-y-2">
      <div className="flex w-full items-center justify-between gap-2 md:flex-col md:text-center">
        <h2 className="text-sm text-gray-500">Lista de pedidos em entrega</h2>
        <Badge variant="outline">{orders.length}</Badge>
      </div>
      <ScrollArea className="md:h-[50vh]">
        <div className="flex items-center gap-2 md:flex-col">
          {orders.map((order) => (
            <NumberOrderCard key={order.id} order={order} slug={slug} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="md:hidden" />
      </ScrollArea>
    </div>
  )
}

export default OutForDeliveryList
