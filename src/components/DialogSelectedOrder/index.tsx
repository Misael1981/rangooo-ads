import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { OrderDTO } from "@/dtos/order.dto"
import { Badge } from "../ui/badge"
import { METHOD_CONFIG } from "@/constants/enum-maps"
import { formatCurrency } from "@/helpers/format-currency"
import OrderItems from "../OrderItems"

type DialogSelectedOrderProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: OrderDTO
}

const paymentMethodType = {
  cash: "Dinheiro",
  card: "Cartão",
  PIX: "PIX",
} as const

const DialogSelectedOrder = ({
  open,
  onOpenChange,
  order,
}: DialogSelectedOrderProps) => {
  const methodConfig = METHOD_CONFIG[order.method]

  console.log("ORDER DIALOG", order)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>
            <Badge>{order.orderNumber}</Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full space-y-4">
          <div className="flex justify-end">
            <span
              className={`rounded-md border px-2 py-1 text-xs font-semibold uppercase ${methodConfig.className}`}
            >
              {methodConfig.label}
            </span>
          </div>
          {/* Items do pedido */}
          <OrderItems order={order} />

          {/* Valor e método de pagamento */}
          <div className="flex flex-col items-end justify-end">
            <span className="text-muted-foreground text-center">
              Valor Total
            </span>
            <div className="space-x-2">
              <span className="text-2xl text-green-600">
                {formatCurrency(order.totalAmount)}
              </span>
              <span> - </span>
              {order.paymentMethod && (
                <span className="text-2xl text-amber-600">
                  {
                    paymentMethodType[
                      order.paymentMethod as keyof typeof paymentMethodType
                    ]
                  }
                </span>
              )}
            </div>
          </div>

          {/* Cliente e endereço */}
          <div className="flex w-full justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium">
                {order.customerName || "Cliente"}
                {order.customerPhone && ` - ${order.customerPhone}`}
              </p>
              {order.method === "DELIVERY" && order.address && (
                <p className="text-muted-foreground text-lg">
                  {order.address.street}, {order.address.number},{" "}
                  {order.address.neighborhood}
                </p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button>Em Preparo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogSelectedOrder
