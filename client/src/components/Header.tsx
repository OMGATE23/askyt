import { MixIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="p-4 flex justify-between items-center">
      <Link 
        to='/' 
        aria-label="Logo: Click to go to home"
        className="flex items-center gap-2 text-xl font-semibold text-slate-900"
      >
        <MixIcon className="size-5"/> AskYT
      </Link>

      <div className="flex items-center gap-4">
        <Link 
          to='/' 
          aria-label="Logo: Click to go to home"
          className="border-b border-transparent hover:border-neutral-900"
        >
          home
        </Link>
        <Link 
          to='/search' 
          aria-label="Logo: Click to go to home"
          className="border-b border-transparent hover:border-neutral-900"
        >
          search
        </Link>
      </div>

      <div className="w-8"/>
    </header>
  )
}
