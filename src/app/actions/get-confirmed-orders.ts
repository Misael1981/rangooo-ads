"use server"

import { db } from "@/lib/prisma"
import { normalizedOrders } from "@/services/normalized.service"
import { revalidatePath } from "next/cache"

export async function getConfirmedOrders(restaurantId: string, slug: string) {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const orders = await db.order.findMany({
      where: {
        restaurantId,
        status: "CONFIRMED",
        createdAt: {
          gte: today,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    revalidatePath(`/${slug}`)

    const rawOrders = normalizedOrders(orders)
    const serializableOrders = JSON.parse(JSON.stringify(rawOrders))

    return { success: true, newOrders: serializableOrders }
  } catch (error) {
    console.error("ERRO_GET_CONFIRMED_ORDER:", error)
    return { success: false, error: "Erro ao buscar pedidos confirmados." }
  }
}
