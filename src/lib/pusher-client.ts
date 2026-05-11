"use client"

import PusherClient from "pusher-js"

declare global {
  var pusherClient: PusherClient | undefined
}

export const pusherClient =
  global.pusherClient ||
  new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  })

if (process.env.NODE_ENV !== "production") global.pusherClient = pusherClient
