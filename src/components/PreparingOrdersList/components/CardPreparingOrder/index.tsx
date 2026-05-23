"use client"

import { startOutForDelivery } from "@/app/actions/start-out-for-delivery"
import DialogSelectedOrder from "@/components/DialogSelectedOrder"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { METHOD_CONFIG } from "@/constants/enum-maps"
import { OrderDTO } from "@/dtos/order.dto"
import { useOrderTimeStatus } from "@/hooks/use-order-time-status"
import { useState, useTransition } from "react"
import { toast } from "sonner"

type CardPreparingOrderProps = {
  order: OrderDTO
  slug: string
}

const CardPreparingOrder = ({ order, slug }: CardPreparingOrderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const { minutesElapsed, borderColor } = useOrderTimeStatus({
    time: order.preparingAt ?? order.createdAt,
  })

  const handleClickCard = () => {
    setIsOpen(true)
  }

  const handleOutForDelivery = () => {
    startTransition(async () => {
      const result = await startOutForDelivery(order.id, slug, order.method)
      if (result.success) {
        toast.success("Produção finalizada!")
      } else {
        toast.error(result.error)
      }
    })
  }

  const methodConfig = METHOD_CONFIG[order.method]

  const isPickup = order.method === "PICKUP" || order.method === "DINE_IN"

  return (
    <>
      <Card
        onClick={handleClickCard}
        className={`border-2 p-2 transition-all duration-500 ${borderColor}`}
      >
        <CardHeader>
          <Badge>{order.orderNumber}</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            <span
              className={`mt-1 rounded-md border px-2 py-1 text-xs font-semibold uppercase ${methodConfig.className}`}
            >
              {methodConfig.label}
            </span>
          </div>
          <div>
            {order.items.map((item, index) => (
              <div className="flex flex-col gap-4" key={index}>
                <div>
                  <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                    {item.category || "Geral"}
                  </span>
                  {item.isDouble ? (
                    <>
                      <div>
                        <span className="text-xl font-semibold">
                          1/2 {item.flavor1Name}
                        </span>
                        {item.flavor1additionalIngredients &&
                          item.flavor1additionalIngredients.length > 0 && (
                            <div className="mt-1 ml-5">
                              <span className="text-muted-foreground text-base">
                                +{" "}
                                {item.flavor1additionalIngredients
                                  .map((ingredient) => ingredient.name)
                                  .join(", ")}
                              </span>
                            </div>
                          )}
                        {item.flavor1Removed &&
                          item.flavor1Removed.length > 0 && (
                            <div className="mt-1 ml-5">
                              <span className="text-muted-foreground text-base">
                                - {item.flavor1Removed.join(", ")}
                              </span>
                            </div>
                          )}
                      </div>
                      <div>
                        <span className="text-xl font-semibold">
                          1/2 {item.flavor2Name}
                        </span>
                        {item.flavor2additionalIngredients &&
                          item.flavor2additionalIngredients.length > 0 && (
                            <div className="mt-1 ml-5">
                              <span className="text-muted-foreground text-base">
                                +{" "}
                                {item.flavor2additionalIngredients
                                  .map((ingredient) => ingredient.name)
                                  .join(", ")}
                              </span>
                            </div>
                          )}
                        {item.flavor2Removed &&
                          item.flavor2Removed.length > 0 && (
                            <div className="mt-1 ml-5">
                              <span className="text-muted-foreground text-base">
                                - {item.flavor2Removed.join(", ")}
                              </span>
                            </div>
                          )}
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">
                          {item.quantity}x
                        </span>
                        <span className="text-xl font-medium">{item.name}</span>
                      </div>
                      {item.additionalIngredients &&
                        item.additionalIngredients.length > 0 && (
                          <div className="mt-1 ml-5">
                            <span className="text-muted-foreground text-base">
                              + {item.additionalIngredients.join(", ")}
                            </span>
                          </div>
                        )}
                      {/* {item.removedIngredients &&
                                item.removedIngredients.length > 0 && (
                                  <div className="mt-1 ml-5">
                                    <span className="text-muted-foreground text-base">
                                      - {item.removedIngredients}
                                    </span>
                                  </div>
                                )} */}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
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
        </CardFooter>
      </Card>

      <DialogSelectedOrder
        open={isOpen}
        onOpenChange={setIsOpen}
        order={order}
        actionButton={
          <Button
            onClick={handleOutForDelivery}
            disabled={isPending}
            className="w-full"
          >
            {isPending
              ? "PROCESSANDO..."
              : isPickup
                ? "Pronto para Retirada"
                : "Saiu para entrega"}
          </Button>
        }
      />
    </>
  )
}

export default CardPreparingOrder
