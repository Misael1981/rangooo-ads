"use server"

import { db } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher-server"
import { notifyClientAboutOrderUpdate } from "@/services/notification.service"
import { revalidatePath } from "next/cache"

export async function confirmOrders(orderIds: string[], slug: string) {
  try {
    await db.order.updateMany({
      where: {
        id: { in: orderIds },
        status: "PENDING",
      },
      data: { status: "CONFIRMED" },
    })

    // Notifica o KDS/admin
    await pusherServer
      .trigger(slug, "order-updated", { ids: orderIds, status: "CONFIRMED" })
      .catch((err) => console.error("❌ Erro Pusher KDS:", err))

    // Notifica cada cliente individualmente
    await Promise.all(orderIds.map((id) => notifyClientAboutOrderUpdate(id)))

    revalidatePath(`/${slug}/production`)

    return { success: true }
  } catch (error) {
    console.error("ERRO_CONFIRMAR_PEDIDOS:", error)
    return { success: false, error: "Erro ao confirmar pedidos." }
  }
}
