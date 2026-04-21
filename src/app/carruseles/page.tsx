import Link from 'next/link'

export default function Carruseles() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-2">Contenido</p>
          <h1 className="text-3xl font-bold tracking-tight text-crema">Carruseles</h1>
        </div>
        <Link
          href="/carruseles/nuevo"
          className="bg-purpura hover:bg-purpura/80 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
        >
          + Nuevo carrusel
        </Link>
      </div>

      {/* Empty state */}
      <div className="bg-[#12111f] border border-white/8 rounded-2xl p-16 text-center">
        <p className="text-4xl mb-4">▦</p>
        <p className="text-white/50 text-sm">Aún no hay carruseles. Crea el primero.</p>
        <Link
          href="/carruseles/nuevo"
          className="inline-block mt-4 text-purpura text-sm hover:underline"
        >
          Crear carrusel →
        </Link>
      </div>
    </div>
  )
}
