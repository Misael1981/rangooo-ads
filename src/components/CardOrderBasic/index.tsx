import { OrderDTO } from "@/dtos/order.dto"

const CardOrderBasic = ({ order }: { order: OrderDTO }) => {
  return (
    <div>
      <h2>{order.customerName}</h2>
      <p>{order.status}</p>
    </div>
  )
}

export default CardOrderBasic
