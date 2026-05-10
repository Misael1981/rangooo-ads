import ClosedStoreScreen from "@/components/ClosedStoreScreen"
import ListConfirmedOrders from "@/components/ListConfirmedOrders"
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

  return (
    <div>
      <ListConfirmedOrders initialOrders={orders} slug={slug} />
    </div>
  )
}
