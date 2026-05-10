"use client"

import Image from "next/image"
import { Clock3, MoonStar } from "lucide-react"

const ClosedStoreScreen = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-orange-500/10 ring-1 ring-orange-500/20">
        <Image
          src="/logo-rangooo.png"
          alt="Rangooo Logo"
          width={64}
          height={64}
          className="object-contain"
        />
      </div>

      <div className="max-w-xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-300">
          <MoonStar className="h-4 w-4" />
          Loja encerrada no momento
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          O expediente foi finalizado 🍕
        </h1>

        <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
          O <span className="font-semibold text-zinc-200">Rangooo KDS</span>{" "}
          está aguardando a próxima abertura da loja para exibir os pedidos em
          tempo real.
        </p>
      </div>

      <div className="mt-10 flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-5 py-4 shadow-2xl backdrop-blur">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">
          <Clock3 className="h-5 w-5 text-orange-400" />
        </div>

        <div className="text-left">
          <p className="text-sm font-medium text-zinc-200">
            Aguardando novos pedidos
          </p>

          <p className="text-xs text-zinc-500">
            O sistema voltará automaticamente quando a loja abrir.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ClosedStoreScreen
