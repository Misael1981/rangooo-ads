import { OrderDTO } from "@/dtos/order.dto"
import CardPreparingOrder from "./components/CardPreparingOrder"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"

type PreparingOrdersListProps = {
  orders: OrderDTO[]
  slug: string
}

const PreparingOrdersList = ({ orders, slug }: PreparingOrdersListProps) => {
  return (
    <section className="w-full space-y-4 p-4">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-sm text-gray-500">
          Lista de pedidos sendo preparados
        </h2>
        <Badge variant="outline">{orders.length}</Badge>
      </div>
      <ScrollArea className="h-[30vh] md:h-[60vh]">
        <div className="space-y-4">
          {orders.map((order) => (
            <CardPreparingOrder key={order.id} order={order} slug={slug} />
          ))}
        </div>
      </ScrollArea>
    </section>
  )
}

export default PreparingOrdersList
