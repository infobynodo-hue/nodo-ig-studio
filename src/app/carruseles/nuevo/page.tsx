export default function NuevoCarrusel() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-10">
        <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-2">Nuevo carrusel</p>
        <h1 className="text-3xl font-bold tracking-tight text-crema">¿De qué va el post?</h1>
        <p className="text-white/50 mt-1 text-sm">Dale una idea al agente. Él elige el arquetipo y genera el copy.</p>
      </div>

      {/* Brief form - placeholder, lógica de agente va aquí */}
      <div className="bg-[#12111f] border border-white/8 rounded-2xl p-6 space-y-5">
        <div>
          <label className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">
            Tu idea
          </label>
          <textarea
            rows={4}
            placeholder="Ej: quiero hablar sobre por qué los dueños de negocio creen que la IA es cara..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-crema placeholder-white/20 focus:outline-none focus:border-purpura/50 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">
            Tono
          </label>
          <div className="flex gap-2">
            {['Directo', 'Educativo', 'Polémico'].map((t) => (
              <button
                key={t}
                className="px-4 py-2 rounded-lg border border-white/10 text-sm text-white/50 hover:border-purpura/50 hover:text-crema transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full bg-purpura hover:bg-purpura/80 text-white font-medium py-3 rounded-xl transition-colors text-sm">
          Generar con IA →
        </button>
      </div>
    </div>
  )
}
