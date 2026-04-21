'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Grid2X2, Palette } from 'lucide-react'

const nav = [
  { href: '/',           label: 'Dashboard',  Icon: LayoutDashboard },
  { href: '/carruseles', label: 'Carruseles', Icon: Grid2X2 },
  { href: '/brand-kit',  label: 'Brand Kit',  Icon: Palette },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside className="w-60 shrink-0 flex flex-col bg-sidebar min-h-screen">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/8">
        <span className="font-brand font-bold text-lg text-white tracking-tight">
          NODO ONE
        </span>
        <p className="text-[10px] text-[#6d7ab5] mt-0.5 tracking-widest uppercase font-mono">
          IG Studio
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6d7ab5] px-3 mb-2">
          Menú
        </p>
        {nav.map(({ href, label, Icon }) => {
          const active = path === href || (href !== '/' && path.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? 'bg-white/10 text-white'
                  : 'text-[#9CA3AF] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon
                size={16}
                className={active ? 'text-lima' : 'text-[#6d7ab5]'}
              />
              {label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-lima" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/8">
        <p className="text-[10px] text-[#6d7ab5] font-mono">v0.1.0</p>
      </div>
    </aside>
  )
}
