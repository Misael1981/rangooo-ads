"use server"

import { db } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher-server"
import { notifyClientAboutOrderUpdate } from "@/services/notification.service"
import { revalidatePath } from "next/cache"

export async function startPreparation(orderId: string, slug: string) {
  console.log("🚀 startPreparation chamada:", { orderId, slug })

  try {
    console.log("📝 Atualizando status...")
    await db.order.update({
      where: { id: orderId },
      data: {
        status: "PREPARING",
        preparingAt: new Date(),
      },
    })
    console.log("✅ Status atualizado")

    await pusherServer
      .trigger(slug, "order-updated", { id: orderId, status: "PREPARING" })
      .catch((err) => console.error("❌ Erro Pusher KDS:", err))

    await notifyClientAboutOrderUpdate(orderId)

    revalidatePath(`/${slug}`)

    return { success: true }
  } catch (error) {
    console.error("ERRO_START_PREPARATION:", error)
    return { success: false, error: "Não foi possível iniciar o preparo." }
  }
}
