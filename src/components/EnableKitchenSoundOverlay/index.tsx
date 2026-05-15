"use client"

import { useState } from "react"
import { Volume2 } from "lucide-react"

export function EnableKitchenSoundOverlay() {
  const [enabled, setEnabled] = useState(false)

  async function handleEnableSound() {
    try {
      // Cria um áudio "fake" só para liberar o autoplay
      const audio = new Audio("/notification.mp3")

      audio.volume = 0

      await audio.play()

      audio.pause()
      audio.currentTime = 0

      setEnabled(true)

      console.log("🔊 Áudio liberado com sucesso")
    } catch (error) {
      console.error("Erro ao liberar áudio:", error)
    }
  }

  if (enabled) return null

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center shadow-2xl">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10">
          <Volume2 className="h-10 w-10 text-orange-500" />
        </div>

        <h1 className="text-3xl font-bold">Ativar Som da Cozinha</h1>

        <p className="mt-3 text-zinc-400">
          Clique abaixo para habilitar os alertas sonoros de novos pedidos.
        </p>

        <button
          onClick={handleEnableSound}
          className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-orange-500 text-lg font-semibold transition hover:bg-orange-600"
        >
          Entrar no Sistema
        </button>
      </div>
    </div>
  )
}
