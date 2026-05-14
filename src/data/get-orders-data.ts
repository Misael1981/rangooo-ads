import { parseAddress } from "@/helpers/parse-address"
import { db } from "@/lib/prisma"
import {
  ConsumptionMethod,
  PaymentMethod,
  OrderStatus,
} from "@misael1981/rangooo-database"

type FlavorAdditionalIngredient = string | { name: string; price: number }

export async function getOrdersData(slug: string, method?: ConsumptionMethod) {
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      isOpen: true,
      consumptionMethods: true,
      paymentMethods: true,
      deliveryFee: true,
    },
  })

  if (!restaurant) return null

  const now = new Date()
  const cutoffHour = 6
  const startOfShift = new Date(now)
  if (now.getHours() < cutoffHour)
    startOfShift.setDate(startOfShift.getDate() - 1)
  startOfShift.setHours(cutoffHour, 0, 0, 0)
  const endOfShift = new Date(startOfShift)
  endOfShift.setDate(endOfShift.getDate() + 1)

  const orders = await db.order.findMany({
    where: {
      restaurantId: restaurant.id,
      consumptionMethod: method,
      status: { not: "CANCELED" },
      createdAt: { gte: startOfShift, lt: endOfShift },
    },
    include: {
      user: { select: { name: true, phone: true } },
      items: {
        include: {
          product: {
            select: {
              name: true,
              menuCategory: { select: { name: true } },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  })

  // NORMALIZAÇÃO DIRETO NO SERVER
  const normalizedOrders = orders.map((order) => ({
    id: order.id,
    customerName: order.user?.name ?? "Cliente Final",
    customerPhone: order.user?.phone ?? "",
    totalAmount: Number(order.totalAmount),
    orderNumber: Number(order.orderNumber),
    status: order.status as OrderStatus,
    method: order.consumptionMethod as "DELIVERY" | "PICKUP" | "DINE_IN",
    paymentMethod: order.paymentMethod as PaymentMethod | null,
    createdAt: order.createdAt.toISOString(),
    preparingAt: order.preparingAt?.toISOString() || null, // Garanta que trate o nulo
    dispatchedAt: order.dispatchedAt?.toISOString() || null,
    deliveredAt: order.deliveredAt?.toISOString() || null,
    address: parseAddress(order.deliveryAddress),
    items: order.items.map((i) => ({
      id: i.id,
      quantity: i.quantity,
      price: Number(i.priceAtOrder),
      name: i.customName || i.product.name,
      extras: i.extras,
      removedIngredients: i.removedIngredients,
      additionalIngredients: (i.additionalIngredients as string[]) || undefined,
      category: i.product.menuCategory?.name ?? "Geral",
      // 2 SABORES
      isDouble: i.isDouble,

      flavor1Name: i.flavor1Name || null,
      flavor1Removed: i.flavor1Removed
        ? JSON.parse(i.flavor1Removed as string)
        : null,
      flavor1additionalIngredients: Array.isArray(
        i.flavor1additionalIngredients,
      )
        ? (i.flavor1additionalIngredients as FlavorAdditionalIngredient[]).map(
            (extra) => ({
              name: typeof extra === "string" ? extra : extra.name,
              price: typeof extra === "string" ? 0 : extra.price,
            }),
          )
        : null,

      flavor2additionalIngredients: Array.isArray(
        i.flavor2additionalIngredients,
      )
        ? (i.flavor2additionalIngredients as FlavorAdditionalIngredient[]).map(
            (extra) => ({
              name: typeof extra === "string" ? extra : extra.name,
              price: typeof extra === "string" ? 0 : extra.price,
            }),
          )
        : null,

      flavor2Name: i.flavor2Name || null,
      flavor2Removed: i.flavor2Removed
        ? JSON.parse(i.flavor2Removed as string)
        : null,
    })),
  }))

  return {
    restaurant: {
      ...restaurant,
      deliveryFee: Number(restaurant.deliveryFee),
    },
    orders: normalizedOrders,
  }
}
