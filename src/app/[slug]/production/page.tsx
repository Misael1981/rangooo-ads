import ClosedStoreScreen from "@/components/ClosedStoreScreen"
import ListConfirmedOrders from "@/components/ListConfirmedOrders"
import PreparingOrdersList from "@/components/PreparingOrdersList"
import { getOrdersData } from "@/data/get-orders-data"
import { notFound } from "next/navigation"

export default async function ProductionPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params
  const data = await getOrdersData(slug)

  if (!data?.restaurant) return notFound()

  if (!data.restaurant.isOpen) {
    return <ClosedStoreScreen />
  }

  const orders = data.orders

  const confirmedOrders = orders.filter(
    (order) => order.status === "CONFIRMED" || order.status === "PENDING",
  )

  const preparingOrders = orders.filter((order) => order.status === "PREPARING")

  return (
    <div className="md:flex">
      <ListConfirmedOrders initialOrders={confirmedOrders} slug={slug} />
      <PreparingOrdersList orders={preparingOrders} slug={slug} />
    </div>
  )
}
