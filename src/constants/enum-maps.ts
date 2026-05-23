import { OrderStatus, PaymentMethod } from "@misael1981/rangooo-database"

export const METHOD_CONFIG = {
  DELIVERY: {
    label: "Entrega",
    className: "bg-blue-100 text-blue-700 border-blue-300",
  },
  PICKUP: {
    label: "Retirada",
    className: "bg-pink-100 text-pink-700 border-pink-300",
  },
  DINE_IN: {
    label: "Mesa",
    className: "bg-purple-100 text-purple-700 border-purple-300",
  },
} as const

export const PAYMENT_METHOD_CONFIG: Record<PaymentMethod, string> = {
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  PIX: "PIX",
}

export const STATUS_CONFIGS: Record<OrderStatus, { label: string }> = {
  PENDING: {
    label: "Pendente",
  },
  CONFIRMED: {
    label: "Confirmado",
  },
  PREPARING: {
    label: "Em Preparo",
  },
  OUT_FOR_DELIVERY: {
    label: "Saiu para a entrega",
  },
  READY_FOR_PICKUP: {
    label: "Pronto para retirada",
  },
  DELIVERED: {
    label: "Entregue",
  },
  CANCELED: {
    label: "Cancelado",
  },
}
