import { OrderDTO } from "@/dtos/order.dto"
import NumberOrderCard from "../NumberOrderCard"
import { Badge } from "../ui/badge"

type ReadyForPickupListProps = {
  orders: OrderDTO[]
  slug: string
}

const ReadyForPickupList = ({ orders, slug }: ReadyForPickupListProps) => {
  return (
    <div>
      <div className="space-y-2 space-x-2 text-center">
        <h2>Lista de pedidos prontos para retirada</h2>
        <Badge variant="outline">{orders.length}</Badge>
      </div>
      <div className="flex gap-2 p-4 md:flex-col">
        {orders.map((order) => (
          <NumberOrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}

export default ReadyForPickupList
