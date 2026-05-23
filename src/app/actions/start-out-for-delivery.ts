"use server"

import { db } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher-server"
import { notifyClientAboutOrderUpdate } from "@/services/notification.service"
import { revalidatePath } from "next/cache"

export async function startOutForDelivery(
  orderId: string,
  slug: string,
  method: string,
) {
  console.log("Como o método está chegando: ", method)

  try {
    const status =
      method === "DELIVERY" ? "OUT_FOR_DELIVERY" : "READY_FOR_PICKUP"

    await db.order.update({
      where: { id: orderId },
      data: {
        status,
        dispatchedAt: new Date(),
      },
    })

    await pusherServer
      .trigger(slug, "order-updated", {
        id: orderId,
        status,
      })
      .catch((err) => console.error("❌ Erro Pusher KDS:", err))

    revalidatePath(`/${slug}`)

    await notifyClientAboutOrderUpdate(orderId)

    return { success: true }
  } catch (error) {
    console.error("ERRO_START_PREPARATION:", error)

    return {
      success: false,
      error: "Não foi possível iniciar o preparo.",
    }
  }
}
