"use server"

import { db } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher-server"
import { notifyClientAboutOrderUpdate } from "@/services/notification.service"
import { revalidatePath } from "next/cache"

export async function startOutForDelivery(orderId: string, slug: string) {
  try {
    // 1. Atualiza o status e grava o momento exato do preparo
    await db.order.update({
      where: { id: orderId },
      data: {
        status: "OUT_FOR_DELIVERY",
        dispatchedAt: new Date(),
      },
    })

    await pusherServer
      .trigger(slug, "order-updated", {
        id: orderId,
        status: "OUT_FOR_DELIVERY",
      })
      .catch((err) => console.error("❌ Erro Pusher KDS:", err))

    revalidatePath(`/${slug}/production`)

    // Notifica cada cliente individualmente
    await notifyClientAboutOrderUpdate(orderId)

    return { success: true }
  } catch (error) {
    console.error("ERRO_START_PREPARATION:", error)
    return { success: false, error: "Não foi possível iniciar o preparo." }
  }
}
