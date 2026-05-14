import ClosedStoreScreen from "@/components/ClosedStoreScreen"
import Header from "@/components/Header"
import ListConfirmedOrders from "@/components/ListConfirmedOrders"
import OrdersCompletedList from "@/components/OrdersCompletedList"
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

  const outForDeliveryOrders = orders.filter(
    (order) => order.status === "OUT_FOR_DELIVERY",
  )

  const readyForPickupOrders = orders.filter(
    (order) => order.status === "READY_FOR_PICKUP",
  )

  const ordersCompleted = orders.filter((order) => order.status === "DELIVERED")

  return (
    <div className="flex h-screen flex-col justify-between">
      <Header />
      <main className="flex-1 p-4 md:flex">
        <ListConfirmedOrders initialOrders={confirmedOrders} slug={slug} />
        <PreparingOrdersList orders={preparingOrders} slug={slug} />
        <section className="space-y-2 border-t pl-4 md:w-fit md:border-t-0 md:border-l">
          <OutForDeliveryList orders={outForDeliveryOrders} slug={slug} />
          {readyForPickupOrders.length > 0 && (
            <ReadyForPickupList orders={readyForPickupOrders} slug={slug} />
          )}
        </section>
      </main>
      <OrdersCompletedList orders={ordersCompleted} />
    </div>
  )
}
