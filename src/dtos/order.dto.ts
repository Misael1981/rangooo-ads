import {
  AreaType,
  OrderStatus,
  PaymentMethod,
} from "@misael1981/rangooo-database"

export type OrderAddress = {
  street: string
  number: string
  neighborhood?: string
  complement?: string
  reference?: string
  city: string
  areaType?: AreaType
}

export type OrderItemDTO = {
  id?: string
  name: string
  price: number
  quantity: number
  category: string

  extras?: string | null
  removedIngredients?: string | null
  additionalIngredients?: string[]

  isDouble?: boolean
  flavor1Name: string | null
  flavor1Removed: string[]
  flavor1additionalIngredients: { name: string; price: number }[] | null // ← era tupla, agora array
  flavor2Name: string | null
  flavor2Removed: string[] | null
  flavor2additionalIngredients: { name: string; price: number }[] | null // ← era tupla, agora array
}

export type OrderItemPrintDTO = {
  id: string
  name: string
  quantity: number
  price: number
  product: {
    name: string
    category: string
  }
}

export type OrderDTO = {
  id: string
  customerName: string
  customerPhone: string
  paymentMethod: PaymentMethod | null
  orderNumber: number
  totalAmount: number
  status: OrderStatus
  method: "DELIVERY" | "PICKUP" | "DINE_IN"
  createdAt: string
  preparingAt: string | null
  dispatchedAt: string | null
  deliveredAt: string | null
  items: OrderItemDTO[]
  address?:
    | {
        street: string
        number: string
        city: string
        neighborhood?: string
        complement?: string
        reference?: string
        areaType?: AreaType
      }
    | undefined
}
