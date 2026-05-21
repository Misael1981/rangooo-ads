"use client"

import { useEffect, useState } from "react"
import CardOrderBasic from "../CardOrderBasic"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { OrderDTO } from "@/dtos/order.dto"
import { Badge } from "../ui/badge"
import { getPusherClient } from "@/lib/pusher-client"
import { getConfirmedOrders } from "@/app/actions/get-confirmed-orders"
import { toast } from "sonner"

type ListConfirmedOrdersProps = {
  initialOrders: OrderDTO[]
  slug: string
  restaurantId: string
}

const ListConfirmedOrders = ({
  initialOrders,
  slug,
  restaurantId,
}: ListConfirmedOrdersProps) => {
  const [orders, setOrders] = useState<OrderDTO[]>(initialOrders || [])

  const playNotification = () => {
    const audio = new Audio("/notification.mp3") // Verifique se o nome do arquivo está certo

    audio.play().catch((error) => {
      console.log(
        "Autoplay bloqueado. O usuário precisa interagir com a página primeiro.",
        error,
      )
    })
  }

  useEffect(() => {
    const pusher = getPusherClient()
    const channel = pusher.subscribe(`restaurant-${restaurantId}`)

    const fetchConfirmedOrders = async () => {
      try {
        const result = await getConfirmedOrders(restaurantId, slug)
        console.log("📦 Resultado da busca:", result)

        if (result?.success && result.newOrders !== undefined) {
          setOrders(result.newOrders)
        }
      } catch (error) {
        console.error("Erro na chamada da Action:", error)
      }
    }

    channel.bind("order:created", (data: unknown) => {
      console.log("🔔 Evento recebido:", data)
      toast.success("Novo pedido confirmado!")
      fetchConfirmedOrders()
      playNotification()
    })

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(`restaurant-${restaurantId}`)
    }
  }, [restaurantId, slug])

  const removeOrderFromList = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId))
  }

  return (
    <section className="space-y-2 border-b pb-4 md:flex md:h-full md:w-fit md:flex-col md:justify-between md:border-r md:border-b-0 md:pr-4">
      <div className="flex items-center justify-between space-y-2 space-x-2 md:flex-col md:text-center">
        <h2 className="text-sm text-gray-500">Pedidos Confirmados</h2>
        <Badge variant="outline">{orders.length}</Badge>
      </div>
      <ScrollArea className="md:h-[50vh]">
        <div className="flex items-center gap-4 md:flex-col">
          {orders.map((order) => (
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
