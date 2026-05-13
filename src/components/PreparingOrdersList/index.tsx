import { OrderDTO } from "@/dtos/order.dto"
import CardPreparingOrder from "./components/CardPreparingOrder"
import { Badge } from "../ui/badge"

type PreparingOrdersListProps = {
  orders: OrderDTO[]
  slug: string
}

const PreparingOrdersList = ({ orders, slug }: PreparingOrdersListProps) => {
  return (
    <section className="w-full space-y-4 p-4">
      <div className="flex w-full items-center justify-between">
        <h1>Lista de pedidos sendo preparados</h1>
        <Badge variant="outline">{orders.length}</Badge>
      </div>
      <div className="space-y-4">
        {orders.map((order) => (
          <CardPreparingOrder key={order.id} order={order} slug={slug} />
        ))}
      </div>
    </section>
  )
}

export default PreparingOrdersList
