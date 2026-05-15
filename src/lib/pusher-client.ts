import PusherClient from "pusher-js"

let client: PusherClient | null = null

export const getPusherClient = () => {
  if (!client) {
    client = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    })
  }
  return client
}
