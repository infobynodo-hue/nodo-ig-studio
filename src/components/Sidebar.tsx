'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/',              label: 'Dashboard',   icon: '◈' },
  { href: '/carruseles',    label: 'Carruseles',  icon: '▦' },
  { href: '/brand-kit',     label: 'Brand Kit',   icon: '◉' },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside className="w-56 shrink-0 flex flex-col border-r border-white/8 bg-[#12111f] min-h-screen">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/8">
        <span className="font-bold text-xl tracking-tight text-crema">
          nodo<sup className="text-xs font-medium text-white/40 ml-0.5">one</sup>
        </span>
        <p className="text-[10px] font-mono text-white/30 mt-0.5 tracking-widest uppercase">IG Studio</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {nav.map(({ href, label, icon }) => {
          const active = path === href || (href !== '/' && path.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-purpura/20 text-crema'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/8">
        <p className="text-[10px] text-white/25 font-mono">v0.1.0</p>
      </div>
    </aside>
  )
}
