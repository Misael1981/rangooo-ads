"use server"

import { STATUS_CONFIGS } from "@/constants/enum-maps"
import { db } from "@/lib/prisma"
import webpush from "web-push"

webpush.setVapidDetails(
  process.env.VAPID_MAILTO!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
)

export async function sendPushToClient({ orderId }: { orderId: string }) {
  // 1. Busca o pedido para pegar o userId
  const order = await db.order.findUnique({
    where: { id: orderId },
    select: { userId: true, orderNumber: true, status: true },
  })

  if (!order) return

  const currentStatus =
    STATUS_CONFIGS[order.status as keyof typeof STATUS_CONFIGS]

  // 2. Busca as subscriptions do usuário que fez o pedido
  const subscriptions = await db.clientPushSubscription.findMany({
    where: { userId: order.userId },
  })

  if (!subscriptions.length) return

  // 3. Envia push só para esse usuário
  const notifications = subscriptions.map((sub) =>
    webpush
      .sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { auth: sub.auth, p256dh: sub.p256dh },
        },
        JSON.stringify({
          title: `Pedido #${order.orderNumber} atualizado!`,
          body: `Seu pedido está: ${currentStatus.label}. Toque para acompanhar.`,
          url: `https://rangooo.vercel.app/meus-pedidos`,
        }),
      )
      .catch((err) => console.error("Erro ao enviar push:", err)),
  )

  await Promise.all(notifications)
}
