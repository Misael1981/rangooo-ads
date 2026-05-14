"use client"

import { OrderDTO } from "@/dtos/order.dto"
import { Badge } from "../ui/badge"
import OrderCompletedCard from "./components/OrderCompletedCard"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

type OrdersCompletedProps = {
  orders: OrderDTO[]
}

const OrdersCompletedList = ({ orders }: OrdersCompletedProps) => {
  return (
    <footer className="space-y-2 border border-t p-4">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-sm text-gray-500">Pedidos Finalizados</h2>
        <Badge variant="outline">{orders.length}</Badge>
      </div>
      <ScrollArea>
        <div className="flex gap-2">
          {orders.map((order) => (
            <div key={order.id}>
              <OrderCompletedCard order={order} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </footer>
  )
}

export default OrdersCompletedList
