import { sendPushToClient } from "@/app/actions/send-push-to-client"
import { db } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher-server"

export async function notifyClientAboutOrderUpdate(orderId: string) {
  const order = await db.order.findUnique({
    where: { id: orderId },
    select: { userId: true, orderNumber: true, status: true },
  })

  if (!order) return

  await Promise.all([
    pusherServer
      .trigger(`client-${order.userId}`, "order-updated", {
        orderId,
        status: order.status,
        orderNumber: order.orderNumber,
      })
      .catch((err) => console.error("❌ Erro Pusher cliente:", err)),

    sendPushToClient({ orderId }).catch((err) =>
      console.error("❌ Erro Push cliente:", err),
    ),
  ])
}
