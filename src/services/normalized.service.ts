import { PaymentMethod, Prisma } from "@misael1981/rangooo-database"
import { OrderDTO } from "@/dtos/order.dto"

type OrderWithItemsAndProduct = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: true
      }
    }
  }
}>

export function normalizedOrders(
  orders: OrderWithItemsAndProduct[],
): OrderDTO[] {
  const normalizeOrders = orders.map((order) => ({
    id: order.id,
    orderNumber: Number(order.orderNumber),
    customerName: order.customName || "Cliente",
    customerPhone: "Não informado",
    paymentMethod: order.paymentMethod as PaymentMethod | null,
    method: order.consumptionMethod,
    status: order.status,
    totalAmount: Number(order.totalAmount),
    createdAt: order.createdAt.toISOString(),
    preparingAt: order.preparingAt?.toISOString() || null,
    dispatchedAt: order.dispatchedAt?.toISOString() || null,
    deliveredAt: order.deliveredAt?.toISOString() || null,
    items:
      order.items?.map((item) => ({
        id: item.id,
        name: item.product.name,
        quantity: item.quantity,
        price: Number(item.product.price),
        category: "Geral",
        extras: item.extras,
        removedIngredients: item.removedIngredients,
        additionalIngredients:
          (item.additionalIngredients as string[]) || undefined,
        isDouble: item.isDouble,
        flavor1Name: item.flavor1Name || null,
        flavor1Removed: item.flavor1Removed
          ? JSON.parse(item.flavor1Removed as string)
          : [],
        flavor1additionalIngredients: Array.isArray(
          item.flavor1additionalIngredients,
        )
          ? (item.flavor1additionalIngredients as {
              name: string
              price: number
            }[])
          : null,
        flavor2Name: item.flavor2Name || null,
        flavor2Removed: item.flavor2Removed
          ? JSON.parse(item.flavor2Removed as string)
          : null,
        flavor2additionalIngredients: Array.isArray(
          item.flavor2additionalIngredients,
        )
          ? (item.flavor2additionalIngredients as {
              name: string
              price: number
            }[])
          : null,
      })) || [],
  }))

  return normalizeOrders
}
