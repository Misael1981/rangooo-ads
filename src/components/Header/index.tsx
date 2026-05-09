import Image from "next/image"
import ModeToggle from "../ModeToggle"

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 shadow-sm">
          <Image
            src="/logo-rangooo.png"
            alt="Rangooo Logo"
            width={32}
            height={32}
            className="h-auto object-contain"
          />
        </div>

        <div className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight text-[#e6322a]">
            Rangooo KDS
          </span>
        </div>
      </div>

      <ModeToggle />
    </header>
  )
}

export default Header
