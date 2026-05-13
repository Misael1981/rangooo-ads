import ClosedStoreScreen from "@/components/ClosedStoreScreen"
import ListConfirmedOrders from "@/components/ListConfirmedOrders"
import OutForDeliveryList from "@/components/OutForDeliveryList"
import PreparingOrdersList from "@/components/PreparingOrdersList"
import ReadyForPickupList from "@/components/ReadyForPickupList"
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

  const OutForDeliveryOrders = orders.filter(
    (order) => order.status === "OUT_FOR_DELIVERY",
  )

  const ReadyForPickupOrders = orders.filter(
    (order) => order.status === "READY_FOR_PICKUP",
  )

  return (
    <div className="md:flex">
      <ListConfirmedOrders initialOrders={confirmedOrders} slug={slug} />
      <PreparingOrdersList orders={preparingOrders} slug={slug} />
      <section className="space-y-2 border-t py-4 md:w-fit md:border-t-0 md:border-l md:pr-4">
        <OutForDeliveryList orders={OutForDeliveryOrders} slug={slug} />
        <ReadyForPickupList orders={ReadyForPickupOrders} slug={slug} />
      </section>
    </div>
  )
}
